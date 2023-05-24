import { CandleTimePeriod } from "../../../enums/priceHistory/candleTimePeriod";
import { PriceHistory } from "../../priceHistory";

export interface GetPriceHistoryRequest {
  instrumentId: number,
  start: Date,
  end: Date,
  candleTimePeriod: CandleTimePeriod
}
export interface GetPriceHistoryResponse {
  priceHistory: PriceHistory
}