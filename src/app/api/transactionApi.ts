import { DepositRequest, DepositResponse } from "../models/reqres/transaction/depositResRes";
import { WithdrawalRequest, WithdrawalResponse } from "../models/reqres/transaction/withdrawalResRes";
import { alacrityApi } from "./api";

const transactionApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    deposit: build.mutation<DepositResponse, DepositRequest>({
      query: (request) => ({
        url: '/transaction/deposit',
        method: 'POST',
        body: request
      }),
    }),
    withdrawal: build.mutation<WithdrawalResponse, WithdrawalRequest>({
      query: (request) => ({
        url: '/transaction/withdrawal',
        method: 'POST',
        body: request
      })
    })
  })
});

export const { useDepositMutation, useWithdrawalMutation } = transactionApi;