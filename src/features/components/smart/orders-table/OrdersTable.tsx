import { useState } from "react";
import { useInstrumentsQuery } from "../../../../app/api/instrumentsApi";
import { useCancelOrderMutation } from "../../../../app/api/ordersApi";
import { TradeDirection } from "../../../../app/enums/tradeDirection";
import { useInstrumentPrice, useOrders } from "../../../../app/hooks";
import { Order } from "../../../../app/models/order";
import Button from "../../../../controls/button/Button";
import Table from "../../../../controls/table/Table";
import { focusHandler } from "../../../../utils/accessibilityUtil";
import { Confirm } from "../../../modals/confirm/Confirm";

interface OrdersRowProps {
  order: Order
  onSelect?: (instrumentId: number, ticker: string) => void
};
const ordersHeader = [
  'Ticker', 'Quantity', 'Filled', 'Limit', 'Last', ''
];
const OrderRow = (props: OrdersRowProps) => {
  const order = props.order;
  const [showCancelOrder, setShowCancelOrder] = useState(false);

  const { isLoading: isLoadingInstruments, data: instruments } = useInstrumentsQuery({});
  const instrumentPrice = useInstrumentPrice(order.instrumentId);
  const [attemptToCancel] = useCancelOrderMutation();
  if (instruments == null)
    return <tr></tr>;

  const instrument = instruments?.find(i => i.instrumentId === order.instrumentId);
  const quantityColor = order.orderDirection === TradeDirection.Sell ? 'lose' : 'win';
  return <>
    <tr
      className="pointer"
      onKeyUp={focusHandler}
      onClick={() => props.onSelect && props.onSelect(order.instrumentId, instrument?.ticker ?? "")}
      tabIndex={props.onSelect ? 0 : -1}
      role="link"
    >
      <td>{instrument?.ticker}</td>
      <td className={quantityColor}>{order.orderDirection === TradeDirection.Sell ? "Sell" : "Buy"} {order.quantity}</td>
      <td>{order.filled}</td>
      <td>{order.limitPrice}</td>
      <td>{instrumentPrice?.mid?.toFixed(2)}</td>
      <td><Button
        text="Cancel" kind="sub" size="small"
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();

          setShowCancelOrder(true);
        }}
      /></td>
    </tr>
    {showCancelOrder
      && <Confirm
        header={"Are you sure?"}
        cancelText="No, Don't Cancel Order"
        confirmText="Yes, Cancel Order"
        onCancel={() => setShowCancelOrder(false)}
        onConfirm={() => {
          attemptToCancel({ orderId: order.orderId });
          setShowCancelOrder(false);
        }}
      >
        <span>This will cancel the following order:
          <br />
          <h3 className="text-center">
            <span className={quantityColor}>{order.orderDirection === TradeDirection.Sell ? "Sell" : "Buy"} {order.quantity}</span>
            <span>&nbsp;{instrument?.ticker}&nbsp;</span>
            <span>@ {order.limitPrice == null ? "Market Price" : order.limitPrice}</span>
          </h3>
        </span>
      </Confirm>
    }
  </>
}

export interface OrdersTableProps {
  onSelect: (instrumentId: number, ticker: string) => void
}

export const OrdersTable = (props: OrdersTableProps) => {
  const orders = useOrders();
  const orderRows = Object.values(orders ?? {}).map((o, idx) =>
    <OrderRow key={idx} order={o} onSelect={props.onSelect} />
  );
  return <Table
    header={ordersHeader}
    rows={orderRows}
    emptyMessage="You have no open orders"
  />;
}