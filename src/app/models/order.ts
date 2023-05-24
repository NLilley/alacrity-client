import { OrderKind } from "../enums/order/orderKind";
import { OrderStatus } from "../enums/order/orderStatus";
import { TradeDirection } from "../enums/tradeDirection";

export interface Order {
  orderId: number,
  instrumentId: number,
  orderKind: OrderKind,
  orderStatus: OrderStatus,
  orderDirection: TradeDirection,
  limitPrice?: number,
  quantity: number,
  filled: number
}