export interface Instrument {
  instrumentId: number,
  ticker: string,
  name: string,
  displayName: string,
  sector: string,
  iconPath: string,
  synopsis: string,
  previousClose: number
}