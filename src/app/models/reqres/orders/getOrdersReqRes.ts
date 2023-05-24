import { Order } from "../../order";

export interface GetOrdersRequest { }
export interface GetOrdersResponse {
  orders: Order[]
}
