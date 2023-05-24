import { alacrityApi } from "../app/api/api";
import { TagTypes } from "../app/enums/api/tagTypes";
import { AccountSummary } from "../app/models/accountSummary";

interface AccountSummaryCache {
  subscriptionCount: number,
  accountSummary?: AccountSummary,
  accountSummarySubscriptions: ((accountSummary: AccountSummary) => void)[],
}

class StreamingAccountSummaryService {
  public constructor(private dispatch: any) { }

  private _accountSummaryCache: AccountSummaryCache = {
    subscriptionCount: 0,
    accountSummarySubscriptions: []
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

    if (this._accountSummaryCache.accountSummarySubscriptions.length > 0)
      this._subscribeData();
  }

  public getCachedAccountSummary(): AccountSummary | undefined {
    return this._accountSummaryCache.accountSummary;
  }

  public subscribeAccountSummary(subscription: (accountSummary: AccountSummary) => void): AccountSummary | undefined {
    this._accountSummaryCache.accountSummarySubscriptions.push(subscription);
    this._accountSummaryCache.subscriptionCount++;
    if (this._accountSummaryCache.subscriptionCount > 0 && this._isConnected!())
      this._subscribeData!();

    return this._accountSummaryCache.accountSummary;
  }

  public unsubscribeAccountSummary(subscription: (accountSummary: AccountSummary) => void) {
    const index = this._accountSummaryCache.accountSummarySubscriptions.findIndex(a => a === subscription);
    if (index > -1)
      this._accountSummaryCache.accountSummarySubscriptions.splice(index, 1);

    this._accountSummaryCache.subscriptionCount -= 1;
    if (this._accountSummaryCache.subscriptionCount === 0 && this._isConnected!())
      this._unsubscribeData!();
  }

  public receiveAccountSummaryUpdate(accountSummary: AccountSummary) {
    if (this._accountSummaryCache.accountSummary != null
      && this._accountSummaryCache.accountSummary.unreadMessages < accountSummary.unreadMessages
    ) {
      // We know that a new web message has been received, and so we need to refetch upon next visit.
      const dispatch = this.dispatch;
      setTimeout(
        () => dispatch(alacrityApi.util.invalidateTags([TagTypes.WebMessageThreads])),
        0
      );
    }

    this._accountSummaryCache.accountSummary = accountSummary;
    this._accountSummaryCache.accountSummarySubscriptions.forEach(s => s(accountSummary));
  }
}

export default StreamingAccountSummaryService;