export interface SetMessageReadRequest {
  rootMessageId: number,
  isRead: boolean
}
export interface SetMessageReadResponse {
  succeeded: boolean
}