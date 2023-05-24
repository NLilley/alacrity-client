import { InstrumentBrief } from "../models/instrumentBrief";
import { SearchInstrumentsRequest, SearchInstrumentsResponse } from "../models/reqres/search/searchInstrumentReqRes";
import { alacrityApi } from "./api";

const searchApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    searchInstruments: build.query<InstrumentBrief[], Partial<SearchInstrumentsRequest>>({
      query: (request) => ({
        url: `search?searchTerm=${request.searchTerm}`
      }),
      transformResponse: (res: SearchInstrumentsResponse) => res.instruments
    })
  })
});

export const { useSearchInstrumentsQuery } = searchApi;