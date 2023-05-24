import { Statement } from "../../statement";

export interface GetStatementRequest { }
export interface GetStatementResponse {
  statements: Statement[]
}