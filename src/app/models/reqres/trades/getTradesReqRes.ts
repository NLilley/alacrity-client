import { Trade } from "../../trade";

export interface GetTradesRequest { }
export interface GetTradesResponse {
  trades: Trade[]
}