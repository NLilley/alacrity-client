import { useInstrumentsQuery } from "../../../../app/api/instrumentsApi";
import { SpecialInstruments } from "../../../../app/enums/specialInstruments";
import { useInstrumentPrice, usePositions } from "../../../../app/hooks";
import { Position } from "../../../../app/models/position";
import Table from "../../../../controls/table/Table";
import { focusHandler } from "../../../../utils/accessibilityUtil";
import { formatMoney } from "../../../../utils/moneyUtils";

interface PositionRowProps {
  position: Position,
  onSelect?: (instrumentId: number, ticker: string) => void
};
const openPositionsHeader = [
  'Ticker', 'Quantity', 'Last', 'Avg. Price', 'Value', 'Profit'
];
const PositionRow = (props: PositionRowProps) => {
  const position = props.position;
  const instrumentPrice = useInstrumentPrice(position.instrumentId);
  const { isLoading: isLoadingInstruments, data: instruments } = useInstrumentsQuery({});
  if (instruments == null)
    return <tr></tr>;

  const instrument = instruments?.find(i => i.instrumentId === position.instrumentId);
  const closingPrice = position.quantity > 0 ? instrumentPrice?.bid : instrumentPrice?.ask;
  const averagePrice = position.instrumentId === SpecialInstruments.Cash ? null : position.averagePrice.toFixed(2)
  const profit = (position.instrumentId === SpecialInstruments.Cash || closingPrice == null) ? null :
    position.quantity > 0 ? (closingPrice - position.averagePrice) * position.quantity :
      (position.averagePrice - closingPrice) * position.quantity;

  const profitColor = (profit == null || profit === 0) ? '' : profit! < 0 ? 'lose' : 'win';
  const name = position.instrumentId === SpecialInstruments.Cash ? 'Cash' : instrument?.ticker;

  const quantity = position.instrumentId === SpecialInstruments.Cash ? formatMoney(position.quantity) : position.quantity.toFixed(2);
  const last = instrumentPrice?.mid ?? closingPrice;

  const onClick = () => props.onSelect && props.position.instrumentId != SpecialInstruments.Cash && props.onSelect(position.instrumentId, instrument?.ticker ?? "");
  return <tr 
    className="pointer"
    onClick={onClick}
    onKeyUp={focusHandler}
    tabIndex={0}
  >
    <td>{name}</td>
    <td>{quantity}</td>
    <td>{last?.toFixed(2)}</td>
    <td>{averagePrice}</td>
    <td>{last == null ? '' : formatMoney((position.quantity * last))}</td>
    <td className={profitColor}>{profit == null ? '' : formatMoney(profit)}</td>
  </tr>
}

export interface PositionsTableProps {
  maxRows?: number,
  onSelect: (instrumentId: number, ticker: string) => void
}

// Note: Percentages don't add up, but the browser will normalize to proportionate values
const colGroup = <colgroup>
  <col span={1} style={{ width: '10%' }} />
  <col span={1} style={{ width: '15%' }} />
  <col span={1} style={{ width: '10%' }} />
  <col span={1} style={{ width: '15%' }} />
  <col span={1} style={{ width: '13%' }} />
  <col span={1} style={{ width: '15%' }} />
</colgroup>;

export const PositionsTable = (props: PositionsTableProps) => {
  const positions = usePositions();
  const positionRows = Object.values(positions ?? {})
    .slice(0, props.maxRows ?? 999999)
    .sort((a, b) => a.instrumentId < b.instrumentId ? -1 : a.instrumentId == b.instrumentId ? 0 : 1)
    .map((p, idx) =>
      <PositionRow key={idx} position={p} onSelect={props.onSelect} />
    );
  return <Table
    colGroup={colGroup}
    header={openPositionsHeader}
    rows={positionRows}
    emptyMessage="You have no open position"
    style={{ tableLayout: 'fixed', minWidth: 520 }}
  />;
}