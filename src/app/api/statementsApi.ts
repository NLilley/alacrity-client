import { GetStatementRequest, GetStatementResponse } from "../models/reqres/statements/getStatementsReqRes";
import { Statement } from "../models/statement";
import { alacrityApi } from "./api";

const statementsApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    statements: build.query<Statement[], Partial<GetStatementRequest>>({
      query: (request) => ({
        url: 'statements'
      }),
      transformResponse: (res: GetStatementResponse) => res.statements
    })
  })
});

export const { useStatementsQuery } = statementsApi;