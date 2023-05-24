import { Candle } from "./candle";

export interface PriceHistory {
  instrumentId: number,
  start: Date,
  end: Date,
  data: Candle[]
}