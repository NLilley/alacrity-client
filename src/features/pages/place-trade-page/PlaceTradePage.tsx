import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useParams } from 'react-router';
import { useInstrumentQuery, useInstrumentsQuery } from '../../../app/api/instrumentsApi';
import { useSubmitOrderMutation } from '../../../app/api/ordersApi';
import { OrderKind } from '../../../app/enums/order/orderKind';
import { SpecialInstruments } from '../../../app/enums/specialInstruments';
import { TradeDirection } from '../../../app/enums/tradeDirection';
import { useInstrumentPrice, usePositions } from '../../../app/hooks';
import NumberInput from '../../../controls/number-input/NumberInput';
import Select, { SelectProps } from '../../../controls/select/Select';
import { mobileBreakPoint } from '../../../shared/constants';
import SmartInstrumentSummary from '../../components/smart/smart-instrument-summary/SmartInstrumentSummary';
import TradeConfirmation from '../../modals/trade-confirmation/TradeConfirmation';
import classes from './PlaceTradePage.module.scss';
import Button from '../../../controls/button/Button';
import LoadingBox from '../../../controls/loading-box/LoadingBox';
import TradeReceipt from '../../modals/trade-recipt/TradeRecipt';

interface PlaceTradePageProps { }

const PlaceTradePage = (props: PlaceTradePageProps) => {
  // Setup Input Controls  
  const { ticker } = useParams();
  const navigate = useNavigate();

  const [orderKind, setOrderKind] = useState(undefined as OrderKind | undefined);
  const [direction, setDirection] = useState(undefined as TradeDirection | undefined);
  const [uiQuantity, setQuantity] = useState('');
  const [uiPrice, setPrice] = useState('');
  const [showTradeConfirmation, setShowTradeConfirmation] = useState(false);
  const [showTradeRecipt, setShowTradeReceipt] = useState(false);
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakPoint}px)` });

  const { isLoading: isInstrumentsLoading, data: instruments } = useInstrumentsQuery({});
  const instrumentId = instruments?.find(i => i.ticker == ticker)?.instrumentId;
  const { isLoading: isInstrumentLoading, data: instrument } = useInstrumentQuery({ instrumentId }, { skip: instrumentId == null });
  const instrumentPrice = useInstrumentPrice(instrumentId);
  const positions = usePositions();
  const [attemptPlaceTrade, placeTradeStatus] = useSubmitOrderMutation();

  if (instrumentId == null || instrument == null || positions == null) {
    return <section className="page">
      <LoadingBox height={300} />
    </section>;
  }

  const companyIcon = instrument.iconPath;

  const positionOnInstrument = positions[instrumentId];
  const positionCash = positions[SpecialInstruments.Cash];

  const orderTypeProps: SelectProps = {
    label: 'Order Kind',
    values: [
      { label: 'Limit', value: OrderKind.LimitOrder },
      { label: 'Market', value: OrderKind.MarketOrder }
    ],
    placeholder: "Select an Order Type",
    onSelect: setOrderKind
  };

  if (!!orderKind)
    orderTypeProps.value = orderKind;

  const directionProps: SelectProps = {
    label: 'Direction',
    values: [
      { label: 'Buy', value: TradeDirection.Buy },
      { label: 'Sell', value: TradeDirection.Sell }
    ],
    placeholder: "Buy or Sell",
    onSelect: setDirection
  }

  if (!!direction)
    directionProps.value = direction;

  // Handle Validation
  const price = parseFloat(uiPrice);
  const quantity = parseFloat(uiQuantity);

  const tradePrice = orderKind === OrderKind.LimitOrder
    ? price
    : direction === TradeDirection.Buy ? instrumentPrice?.ask : instrumentPrice?.bid;

  const validationMessages = [];
  if (orderKind == OrderKind.LimitOrder && uiPrice != null && (!Number.isFinite(price)))
    validationMessages.push('Please choose a valid price');
  if (uiQuantity.length > 0 && !Number.isFinite(quantity) || (quantity ?? 0) <= 0)
    validationMessages.push('Please choose a positive quantity');
  if (direction === TradeDirection.Buy && tradePrice != null && tradePrice * (quantity ?? 0) > positionCash?.quantity)
    validationMessages.push('Insufficient funds to place this trade');
  if (direction === TradeDirection.Sell && quantity > 0 && quantity > positionOnInstrument?.quantity)
    validationMessages.push('Cannot sell more than your current position');

  if (!!direction)
    directionProps.value = direction;

  const isTradeTickerValid = validationMessages.length === 0 &&
    (orderKind === OrderKind.MarketOrder || (orderKind === OrderKind.LimitOrder && Number.isFinite(price)))
    && (Number.isFinite(quantity) && (quantity ?? 0) > 0);

  return <section className={`${classes.trade} page rotate-root`}>
    {/* Trade Ticket */}
    <div className={`${classes.tradeInput} card left`}>
      <h2 className={classes.header}>Place Trade</h2>

      {
        companyIcon && <img className={classes.companyIcon} src={companyIcon} />
      }

      <div className={classes.leftRight}>
        <div className={`${classes.left}`}>Ticker</div>
        <div className={`${classes.right}`}>{ticker}</div>

        <div className={`${classes.left}`}>Bid/Ask</div>
        <div className={`${classes.right}`}><span className="lose">
          {instrumentPrice?.bid}
        </span> - <span className="win">{instrumentPrice?.ask}</span>
        </div>

        <div className={`${classes.left}`}>Position</div>
        <div className={`${classes.right}`}>{positionOnInstrument?.quantity?.toLocaleString() ?? 0}</div>

        <div className={classes.left}>Cash</div>
        <div className={classes.right}>{(positionCash?.quantity ?? 0).toLocaleString("en-US", { maximumFractionDigits: 2 })}</div>
      </div>

      <div className="text-right">
        <Button text='Deposit' kind='sub' onClick={() => navigate('/deposit-funds')} />
      </div>

      <div className={classes.control}>
        <Select {...orderTypeProps} />
      </div>

      <div className={classes.control}>
        <Select {...directionProps} />
      </div>

      <div className={classes.control}>
        <NumberInput
          value={uiQuantity?.toString() ?? ""}
          placeholder='Quantity to Trade'
          label='Quantity'
          min={0}
          autoFocus
          onChange={e => setQuantity(e)}
        />
      </div>

      {
        orderKind === OrderKind.LimitOrder &&
        <>
          <div className={classes.control}>
            <NumberInput
              value={uiPrice}
              placeholder='Enter Limit Price'
              label='Price'
              min={0}
              onChange={e => setPrice(e)}
            />

            <div className={classes.microActions}>
              <Button
                text='MKT'
                kind='sub'
                onClick={() => setPrice(direction === TradeDirection.Sell
                  ? (instrumentPrice?.bid?.toString() ?? '')
                  : (instrumentPrice?.ask?.toString() ?? ''))
                }
              />
              <Button
                text='MID'
                kind='sub'
                onClick={() => setPrice((instrumentPrice?.mid)?.toFixed(2) ?? '')}
              />
            </div>
          </div>
        </>
      }

      {validationMessages.length > 0 && <div className={classes.validationMessage}>
        {validationMessages.map((m, idx) => <div key={idx}>{m}</div>)}
      </div>}

      <div className={`text-center ${classes.submitOrder}`}>
        <Button
          text='Submit Order'
          size='medium'
          onClick={isTradeTickerValid ? () => setShowTradeConfirmation(true) : undefined}
          disabled={!isTradeTickerValid}
        />
      </div>
    </div>


    {/* Information */}
    {
      !isMobile &&
      <div className={`${classes.information} card right`}>
        <SmartInstrumentSummary
          instrumentId={instrumentId}
          displayChart
          onView={(instrumentId, ticker) => { navigate(`/instrument/${ticker}`) }}
        />
      </div>
    }

    {
      showTradeConfirmation &&
      <TradeConfirmation
        ticker={ticker!}
        orderKind={orderKind!}
        direction={direction!}
        quantity={uiQuantity}
        price={uiPrice}
        onAccept={() => {
          attemptPlaceTrade({
            instrumentId: instrumentId,
            limitPrice: price,
            orderDirection: direction,
            orderKind: orderKind,
            quantity: quantity
          });
          setPrice('');
          setQuantity('');
          setDirection(undefined);
          setOrderKind(undefined);

          setShowTradeConfirmation(false);
          setShowTradeReceipt(true);
        }}
        onClose={() => setShowTradeConfirmation(false)}
      />
    }

    {
      showTradeRecipt &&
      <TradeReceipt
        onViewTradeNexus={() => navigate('/trade-nexus')}
        onViewTradeInput={() => setShowTradeReceipt(false)}
        onClose={() => setShowTradeReceipt(false)}
      />
    }
  </section>;
};
export default PlaceTradePage;
