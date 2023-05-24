import { Instrument } from "../app/models/instrument";
import { Quote } from "../app/models/quote";

export class InstrumentUtil {
  public static getInstrumentSummaryProps(instrument: Instrument, quote: Quote | undefined) {
    return {
      instrumentId: instrument.instrumentId,
      name: instrument.name,
      ticker: instrument.ticker,
      industry: instrument.sector,
      companyIcon: instrument.iconPath,
      price: quote?.mid,
      prevClose: instrument.previousClose,
      description: instrument.synopsis,
    }
  }
};