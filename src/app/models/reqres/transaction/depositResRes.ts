import { CardInfo } from "../../cardInfo";

export interface DepositRequest {
  depositAmount: Number,
  cardInfo: CardInfo
}

export interface DepositResponse {
  succeeded: boolean,
  errorMessage: string
}