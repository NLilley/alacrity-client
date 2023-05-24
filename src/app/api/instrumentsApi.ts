import { Instrument } from "../models/instrument";
import { InstrumentBrief } from "../models/instrumentBrief";
import { GetInstrumentRequest, GetInstrumentResponse } from "../models/reqres/instruments/getInstrumentReqRes";
import { GetInstrumentsRequest, GetInstrumentsResponse } from "../models/reqres/instruments/getInstrumentsReqRes";
import { alacrityApi } from "./api";

const instrumentsApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    instruments: build.query<InstrumentBrief[], Partial<GetInstrumentsRequest>>({
      query: (request) => ({
        url: 'instruments',
      }),
      transformResponse: (res: GetInstrumentsResponse) => res.instruments,
    }),
    instrument: build.query<Instrument, Partial<GetInstrumentRequest>>({
      query: (request) => ({
        url: `instruments/${request.instrumentId}`,
      }),
      transformResponse: (res: GetInstrumentResponse) => res.instrument,
    })
  })
});

export const { useInstrumentsQuery, useInstrumentQuery } = instrumentsApi;