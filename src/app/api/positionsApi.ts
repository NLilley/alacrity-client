import { Position } from "../models/position";
import { GetPositionsRequest, GetPositionsResponse } from "../models/reqres/positions/getPositionsReqRes";
import { alacrityApi } from "./api";

const positionsApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    positions: build.query<Position[], Partial<GetPositionsRequest>>({
      query: (request) => ({
        url: 'positions'
      }),
      transformResponse: (res: GetPositionsResponse) => res.positions
    })
  })
})

export const { usePositionsQuery } = positionsApi;
