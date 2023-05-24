import { OrderKind } from "../../../enums/order/orderKind";
import { TradeDirection } from "../../../enums/tradeDirection";

export interface SubmitOrderRequest {
  instrumentId: number,
  quantity: number,
  orderKind: OrderKind,
  orderDirection: TradeDirection,
  limitPrice?: number
}

export interface SubmitOrderResponse {
  succeeded: boolean,
  orderId?: number,
  failureReason: string 
}