import { Instrument } from "../../instrument"

export interface GetInstrumentRequest {
  instrumentId: number
}
export interface GetInstrumentResponse {
  instrument: Instrument
}