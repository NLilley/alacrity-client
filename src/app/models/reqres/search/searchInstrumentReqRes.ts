import { InstrumentBrief } from '../../instrumentBrief';

export interface SearchInstrumentsRequest { 
  searchTerm: string
}
export interface SearchInstrumentsResponse {
  instruments: InstrumentBrief[]
}