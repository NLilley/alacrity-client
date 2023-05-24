import { StatementKind } from "../enums/statementKind";

export interface Statement {
  statementId: number,
  statementKind: StatementKind,
  // statement: byte[]
}