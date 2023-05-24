import { TagTypes } from "../enums/api/tagTypes";
import { Order } from "../models/order";
import { CancelOrderRequest, CancelOrderResponse } from "../models/reqres/orders/candleOrderReqRes";
import { GetOrdersRequest, GetOrdersResponse } from "../models/reqres/orders/getOrdersReqRes";
import { SubmitOrderRequest, SubmitOrderResponse } from "../models/reqres/orders/submitOrderResRes";
import { alacrityApi } from "./api";

const ordersApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    orders: build.query<Order[], Partial<GetOrdersRequest>>({
      query: (request) => ({
        url: 'orders'
      }),
      transformResponse: (res: GetOrdersResponse) => res.orders
    }),
    submitOrder: build.mutation<SubmitOrderResponse, Partial<SubmitOrderRequest>>({
      query: (request) => ({
        url: 'orders',
        method: 'POST',
        body: request
      }),
      invalidatesTags: [TagTypes.Orders]
    }),
    cancelOrder: build.mutation<CancelOrderResponse, Partial<CancelOrderRequest>>({
      query: (request) => ({
        url: 'orders',
        method: 'DELETE',
        body: request
      }),
      invalidatesTags: [TagTypes.Orders]
    })
  })
});

export const { useOrdersQuery, useSubmitOrderMutation, useCancelOrderMutation } = ordersApi;