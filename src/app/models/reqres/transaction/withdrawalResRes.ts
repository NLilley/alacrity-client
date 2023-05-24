import { CardInfo } from "../../cardInfo";

export interface WithdrawalRequest {
  withdrawalAmount: Number,
  cardInfo: CardInfo
}

export interface WithdrawalResponse {
  succeeded: boolean,
  errorMessage: string
}