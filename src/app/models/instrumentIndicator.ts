import { IndicatorKind } from "../enums/indicatorKind";

export interface InstrumentIndicator {
  instrumentId: number,
  indicatorKind: IndicatorKind,
  name: string,
  value: number
}