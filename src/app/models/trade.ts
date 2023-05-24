import { TradeDirection } from "../enums/tradeDirection";

export interface Trade {
  tradeId: number,
  instrumentId: number,
  orderId: number,
  tradeDate: string,
  tradeDirection: TradeDirection,
  quantity: number,
  price: number,
  profit?: number
}