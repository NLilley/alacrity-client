import { useInstrumentsQuery } from "../../../../app/api/instrumentsApi";
import { useTradesQuery } from "../../../../app/api/tradesApi";
import { TradeDirection } from "../../../../app/enums/tradeDirection";
import { Trade } from "../../../../app/models/trade";
import LoadingBox from "../../../../controls/loading-box/LoadingBox";
import Table from "../../../../controls/table/Table";
import { focusHandler } from "../../../../utils/accessibilityUtil";
import { formatMoney } from "../../../../utils/moneyUtils";

interface TradeRowProps {
  trade: Trade
  onSelect?: (instrumentId: number, ticker: string) => void
};
const tradesHeader = [
  'Date', 'Ticker', 'Quantity', 'Price', 'Profit'
];
const TradeRow = (props: TradeRowProps) => {
  const trade = props.trade;
  const { isLoading: isLoadingInstruments, data: instruments } = useInstrumentsQuery({});
  if (trade == null || instruments == null)
    return <tr></tr>;

  const instrument = instruments?.find(i => i.instrumentId === trade.instrumentId);
  const quantityColor = trade.tradeDirection === TradeDirection.Sell ? 'lose' : 'win';
  const profitColor = trade.profit === 0 ? '' : trade.profit! < 0 ? 'lose' : 'win';

  return <tr
    className="pointer"
    onKeyUp={focusHandler}
    onClick={() => props.onSelect && props.onSelect(trade.instrumentId, instrument?.ticker ?? "")}
    tabIndex={0}
  >
    <td>{trade?.tradeDate == null ? null : new Date(trade?.tradeDate).toLocaleDateString()}</td>
    <td>{instrument?.ticker}</td>
    <td className={quantityColor}>{trade.tradeDirection === TradeDirection.Sell ? 'Sell' : 'Buy'} {trade.quantity}</td>
    <td>{trade.price.toFixed(2)}</td>
    <td className={profitColor}>{formatMoney(trade.profit)}</td>
  </tr>
}

export interface TradesTableProps {
  onSelect: (instrumentId: number, ticker: string) => void
}

export const TradesTable = (props: TradesTableProps) => {
  const { isLoading: isTradesLoading, data: trades } = useTradesQuery({});
  if (isTradesLoading)
    return <LoadingBox height={200} />;

  const tradeRows = Object.values(trades ?? {}).map((p, idx) =>
    <TradeRow key={idx} trade={p} onSelect={props.onSelect} />
  );
  return <Table header={tradesHeader} rows={tradeRows} />;
}