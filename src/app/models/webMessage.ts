import { WebMessageKind } from "../enums/webMessageKind"

export interface WebMessage {
  createdDate: string,
  webMessageId: number,
  rootMessageId: number,
  messageKind: WebMessageKind,
  incomming: boolean,
  to: string,
  from: string,
  title: string,
  message: string,
  read: boolean,
  finalized: boolean
}

export interface WebMessageThread {
  webMessages: WebMessage[]
}