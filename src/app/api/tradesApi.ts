import { TagTypes } from "../enums/api/tagTypes";
import { GetTradesRequest, GetTradesResponse } from "../models/reqres/trades/getTradesReqRes";
import { Trade } from "../models/trade";
import { alacrityApi } from "./api";

const tradesApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    trades: build.query<Trade[], Partial<GetTradesRequest>>({
      query: (request) => ({
        url: 'trades'
      }),
      transformResponse: (res: GetTradesResponse) => res.trades,
      providesTags: [TagTypes.Positions]
    })
  })
});

export const { useTradesQuery } = tradesApi;