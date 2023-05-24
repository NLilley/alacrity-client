import { InstrumentIndicator } from "../app/models/instrumentIndicator";
import { Quote } from "../app/models/quote";

interface InstrumentCache {
  subscriptionCount: number,
  quote: Quote | undefined,
  indicators: { [name: string]: InstrumentIndicator },
  priceSubscriptions: ((quote: Quote) => void)[],
  indicatorSubscriptions: ((indicators: { [name: string]: InstrumentIndicator }) => void)[]
}

class StreamingInstrumentService {
  private _instrumentCaches: { [instrumentId: number]: InstrumentCache } = {};

  private _isConnected: (() => boolean) | undefined = undefined;
  private _subscribeData: ((instrumentIds: number[]) => void) | undefined = undefined;
  private _unsubscribeData: ((instrumentIds: number[]) => void) | undefined = undefined;

  public registerSubscriptionCallbacks(
    isConnected: () => boolean,
    subscribeData: (instrumentIds: number[]) => void,
    unsubscribeData: (instrumentIds: number[]) => void
  ) {
    this._isConnected = isConnected;
    this._subscribeData = subscribeData;
    this._unsubscribeData = unsubscribeData
  }
  // SignalR does NOT reestablish group memebership after a disconnect, so we must reestablish these subscriptions manually.
  public reRegisterSubscriptions() {
    if (this._subscribeData == null)
      return;

    const instrumentIds = Object.keys(this._instrumentCaches).map(str => parseInt(str, 10));
    if (instrumentIds.length > 0)
      this._subscribeData(instrumentIds);
  }

  // Price
  public getCachedPrice(instrumentId: number): Quote | undefined {
    const instrumentCache = this._instrumentCaches[instrumentId];
    return instrumentCache?.quote;
  }

  public subscribePrice(instrumentId: number, subscription: (quote: Quote) => void): Quote | undefined {
    const instrumentCache = this.setupSubscription(instrumentId);
    instrumentCache.priceSubscriptions.push(subscription);

    return instrumentCache.quote;
  }

  public unsubscribePrice(instrumentId: number, subscription: (quote: Quote) => void) {
    let instrumentCache: InstrumentCache | undefined = this._instrumentCaches[instrumentId];
    if (instrumentCache == null) {
      console.log("Calling unsubscribeIndicators for instrument with no subscriptions", instrumentId);
      return;
    }

    const index = instrumentCache.priceSubscriptions.findIndex(a => a === subscription);
    if (index > -1)
      instrumentCache.priceSubscriptions.splice(index, 1);

    this.tearDownSubscription(instrumentId);
  }

  public receivePriceUpdate(quote: Quote) {
    const instrumentCache = this._instrumentCaches[quote?.instrumentId];
    if (instrumentCache == null) {
      console.log("Received Quote for unsubscribed instrument", quote);
      return;
    }

    quote.mid = (quote.bid == null && quote.ask != null) ? quote.ask:
      (quote.ask == null && quote.bid != null) ? quote.bid :
      (quote.bid! + quote.ask!) / 2;

    instrumentCache.quote = quote;
    instrumentCache.priceSubscriptions.forEach(s => s(quote));
  }

  // Indicators
  public getCachedIndicators(instrumentId: number): { [name: string]: InstrumentIndicator } | undefined {
    const instrumentCache = this._instrumentCaches[instrumentId];
    return instrumentCache?.indicators;
  }

  public subscribeIdicators(instrumentId: number, subscription: (indicators: { [name: string]: InstrumentIndicator }) => void) {
    const instrumentCache = this.setupSubscription(instrumentId);
    instrumentCache.indicatorSubscriptions.push(subscription);
  }

  public unsubscribeIndicators(instrumentId: number, subscription: (indicators: { [name: string]: InstrumentIndicator }) => void) {
    let instrumentCache: InstrumentCache | undefined = this._instrumentCaches[instrumentId];
    if (instrumentCache == null) {
      console.error("Calling unsubscribeIndicators for instrument with no subscriptions", instrumentId);
      return;
    }

    const index = instrumentCache.indicatorSubscriptions.findIndex(a => a === subscription);
    if (index > -1)
      instrumentCache.indicatorSubscriptions.splice(index, 1);

    this.tearDownSubscription(instrumentId);
  }

  public receiveIndicatorUpdate(indicator: InstrumentIndicator) {
    const instrumentCache = this._instrumentCaches[indicator?.instrumentId]
    if (instrumentCache == null) {
      console.log("Received indicator for unsubscribed instrument", indicator);
      return;
    }

    instrumentCache.indicators[indicator.name] = indicator;
    instrumentCache.indicatorSubscriptions.forEach(s => s(instrumentCache.indicators));
  }

  private setupSubscription(instrumentId: number): InstrumentCache {
    let instrumentCache: InstrumentCache = this._instrumentCaches[instrumentId];
    if (instrumentCache == null) {
      instrumentCache = {
        subscriptionCount: 0,
        quote: undefined,
        indicators: {},
        priceSubscriptions: [],
        indicatorSubscriptions: []
      };
      this._instrumentCaches[instrumentId] = instrumentCache;
    }

    if (instrumentCache.subscriptionCount == 0 && this._subscribeData != null && (this._isConnected != null && this._isConnected()))
      this._subscribeData([instrumentId]);

    instrumentCache.subscriptionCount = (instrumentCache.subscriptionCount ?? 0) + 1;

    return instrumentCache;
  }

  private tearDownSubscription(instrumentId: number): void {
    let instrumentCache: InstrumentCache | undefined = this._instrumentCaches[instrumentId];
    if (instrumentCache == null) {
      console.error("Calling unsubscribeInstrument for instrument with no subscriptions", instrumentId);
      return;
    }

    instrumentCache.subscriptionCount -= 1;
    if (instrumentCache.subscriptionCount === 0 && this._unsubscribeData != null && (this._isConnected != null && this._isConnected())) {
      this._unsubscribeData([instrumentId]);
      delete this._instrumentCaches[instrumentId];
    }
  }
}

export default StreamingInstrumentService;