import { alacrityApi } from "../app/api/api";
import { TagTypes } from "../app/enums/api/tagTypes";
import { OrderStatus } from "../app/enums/order/orderStatus";
import { Order } from "../app/models/order";

export type GroupedOrders = { [instrumentId: number]: Order };

interface OrdersCache {
  subscriptionCount: number,
  orders: GroupedOrders
  ordersSubscriptions: ((groupedOrders: GroupedOrders) => void)[],
}

class StreamingOrdersService {
  public constructor(private dispatch: any) {}

  private _ordersCache: OrdersCache = {
    subscriptionCount: 0,
    orders: {},
    ordersSubscriptions: []
  };

  private _isConnected: (() => boolean) | undefined = undefined;
  private _subscribeData: (() => void) | undefined = undefined;
  private _unsubscribeData: (() => void) | undefined = undefined;

  public registerSubscriptionCallbacks(
    isConnected: () => boolean,
    subscribeData: () => void,
    unsubscribeData: () => void
  ) {
    this._isConnected = isConnected;
    this._subscribeData = subscribeData;
    this._unsubscribeData = unsubscribeData
  }

  // SignalR does NOT reestablish group memebership after a disconnect, so we must reestablish these subscriptions manually.
  public reRegisterSubscriptions() {
    if (this._subscribeData == null)
      return;

    if (this._ordersCache.ordersSubscriptions.length > 0)
      this._subscribeData();
  }

  public getCachedOrders(): GroupedOrders | undefined {
    return this._ordersCache.orders;
  }

  public subscribeOrders(subscription: (groupedOrders: GroupedOrders) => void): GroupedOrders | undefined {
    this._ordersCache.ordersSubscriptions.push(subscription);
    this._ordersCache.subscriptionCount++;
    if (this._ordersCache.subscriptionCount > 0 && this._isConnected!())
      this._subscribeData!();

    return this._ordersCache.orders;
  }

  public unsubscribeOrders(subscription: (groupedOrders: GroupedOrders) => void) {
    const index = this._ordersCache.ordersSubscriptions.findIndex(a => a === subscription);
    if (index > -1)
      this._ordersCache.ordersSubscriptions.splice(index, 1);

    this._ordersCache.subscriptionCount -= 1;
    if (this._ordersCache.subscriptionCount === 0 && this._isConnected!())
      this._unsubscribeData!();
  }

  public receiveOrderUpdate(order: Order) {
    const oldOrder = this._ordersCache.orders[order.orderId];
    if(oldOrder != null && oldOrder.filled != order.filled){
      const dispatch = this.dispatch;
      setTimeout(() => dispatch(alacrityApi.util.invalidateTags([TagTypes.Positions])));
    }
    this._ordersCache.orders = { ...this._ordersCache.orders, [order.orderId]: order };
    if(order.orderStatus !== OrderStatus.Active)
      delete this._ordersCache.orders[order.orderId];
    this._ordersCache.ordersSubscriptions.forEach(s => s(this._ordersCache.orders));
  }
}

export default StreamingOrdersService;