import { WebMessageThread } from "../../webMessage";

export interface GetWebMessageThreadsRequest { }
export interface GetWebMessageThreadsResponse {
  webMessageThreads: WebMessageThread[]
}