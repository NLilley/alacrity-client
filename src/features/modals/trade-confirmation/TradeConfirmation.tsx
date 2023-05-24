import { OrderKind } from '../../../app/enums/order/orderKind';
import { TradeDirection } from '../../../app/enums/tradeDirection';
import Button from '../../../controls/button/Button';
import Modal from '../../../controls/modal/Modal';
import classes from './TradeConfirmation.module.scss';

export interface TradeConfirmationProps {
  ticker: string,
  direction: TradeDirection,
  quantity: string,
  orderKind: OrderKind,
  price: string,

  onClose: () => void,
  onAccept: () => void
}

const TradeConfirmation = (props: TradeConfirmationProps) => {
  return <Modal
    header={'Trade Confirmation'}
    onClose={props.onClose}
  >
    <div className={classes.wrapper}>
      <div>
        You are about to place the following trade:
      </div>

      <div className={classes.tradeDescription}>
        {props.direction === TradeDirection.Sell ? <span className="lose">SELL&nbsp;</span> : <span className="win">BUY&nbsp;</span>
        } {props.quantity}&nbsp; {props.ticker} @ {props.orderKind === OrderKind.MarketOrder ? 'Market Price' : props.price}
      </div>

      <div className={classes.finalWarning}>
        Are you sure you wish to place this Trade?
      </div>

      <div className={classes.actions}>
        <Button text='Cancel' kind='sub' size='medium' onClick={props.onClose} />
        <Button text='Place Order' size='medium' onClick={props.onAccept} />
      </div>
    </div>
  </Modal>
}

export default TradeConfirmation;