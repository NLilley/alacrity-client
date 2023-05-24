export interface SubmitMessageRequest {
  rootMessageId? : number,
  title?: string,
  message: string
}

export interface SubmitMessageResponse {
  succeeded: boolean,
  errorMessage: string
}