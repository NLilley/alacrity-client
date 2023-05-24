import { CandleTimePeriod } from "../enums/priceHistory/candleTimePeriod";
import { Candle } from "../models/candle";
import { GetPriceHistoryRequest, GetPriceHistoryResponse } from "../models/reqres/priceHistory/getPriceHistoryReqRes";
import { alacrityApi } from "./api";

const priceHistoryApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    priceHistory: build.query<Candle[], Partial<GetPriceHistoryRequest>>({
      query: (request) => ({
        url: `priceHistory?instrumentId=${request.instrumentId}&start=${request.start?.toISOString()}&end=${request.end?.toISOString()}&period=${request.candleTimePeriod}`,
      }),
      transformResponse: (res: GetPriceHistoryResponse, meta, arg) => res.priceHistory.data
    }),
    priceHistoryPastPeriod: build.query<Candle[], { instrumentId: number | undefined, seconds: number, candleTimePeriod: CandleTimePeriod }>({
      query: (request) => {
        const end = new Date();
        const start = new Date(end);
        start.setSeconds(start.getSeconds() - request.seconds);
        return {
          url: `priceHistory?instrumentId=${request.instrumentId}&start=${start?.toISOString()}&end=${end.toISOString()}&period=${request.candleTimePeriod}`
        }
      },
      transformResponse: (res: GetPriceHistoryResponse, meta, arg) => res.priceHistory.data
    })
  })
});

export const { usePriceHistoryQuery, usePriceHistoryPastPeriodQuery } = priceHistoryApi;