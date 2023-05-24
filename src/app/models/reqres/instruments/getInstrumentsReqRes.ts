import { InstrumentBrief } from "../../instrumentBrief";

export interface GetInstrumentsRequest { }
export interface GetInstrumentsResponse {
  instruments: InstrumentBrief[]
}