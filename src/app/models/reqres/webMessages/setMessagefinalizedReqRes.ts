export interface SetMessageFinalizedRequest {
  rootMessageId: number,
  isFinalized: boolean
}
export interface SetMessageFinalizedResponse {
  succeeded: boolean
}