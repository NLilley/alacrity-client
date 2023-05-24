import { Position } from "../app/models/position";

export type GroupedPositions = { [instrumentId: number]: Position };

interface PositionsCache {
  subscriptionCount: number,
  positions: GroupedPositions
  positionsSubscriptions: ((groupedPositions: GroupedPositions) => void)[],
}

class StreamingPositionsService {
  private _positionCache: PositionsCache = {
    subscriptionCount: 0,
    positions: {},
    positionsSubscriptions: []
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

    if (this._positionCache.positionsSubscriptions.length > 0)
      this._subscribeData();
  }

  public getCachedPositions(): GroupedPositions | undefined {
    return this._positionCache.positions;
  }

  public subscribePositions(subscription: (groupedPositions: GroupedPositions) => void): GroupedPositions | undefined {
    this._positionCache.positionsSubscriptions.push(subscription);
    this._positionCache.subscriptionCount++;
    if (this._positionCache.subscriptionCount > 0 && this._isConnected!())
      this._subscribeData!();

    return this._positionCache.positions;
  }

  public unsubscribePositions(subscription: (groupedPositions: GroupedPositions) => void) {
    const index = this._positionCache.positionsSubscriptions.findIndex(a => a === subscription);
    if (index > -1)
      this._positionCache.positionsSubscriptions.splice(index, 1);

    this._positionCache.subscriptionCount -= 1;
    if (this._positionCache.subscriptionCount === 0 && this._isConnected!())
      this._unsubscribeData!();
  }

  public receivePositionUpdate(position: Position) {
    this._positionCache.positions = { ...this._positionCache.positions, [position.instrumentId]: position };
    if(position.quantity === 0)
      delete this._positionCache.positions[position.instrumentId];
    this._positionCache.positionsSubscriptions.forEach(s => s(this._positionCache.positions));
  }
}

export default StreamingPositionsService;