import { HubConnection, HubConnectionBuilder, IRetryPolicy, RetryContext } from '@microsoft/signalr';
import { streamingDataUrl } from '../shared/constants';
import { Quote } from '../app/models/quote';
import { InstrumentIndicator } from '../app/models/instrumentIndicator';
import StreamingInstrumentService from './StreamingInstrumentService';
import StreamingPositionsService from './StreamingPositionsService';
import { Position } from '../app/models/position';
import StreamingOrdersService from './StreamingOrdersService';
import { Order } from '../app/models/order';
import StreamingAccountSummaryService from './StreamingAccountSummaryService';
import { AccountSummary } from '../app/models/accountSummary';

enum SignalRConnectionState {
  Unknown = 0,
  Stopped = 1,
  Connecting = 2,
  Connected = 3,
  Reconnecting = 4
}

class StreamingDataService {
  private _connection: HubConnection | undefined;
  private _connectionState: SignalRConnectionState = SignalRConnectionState.Unknown;

  constructor(
    private _streamingInstrumentService: StreamingInstrumentService,
    private _streamingPositionsService: StreamingPositionsService,
    private _streamingOrdersService: StreamingOrdersService,
    private _streamingAccountSummaryService: StreamingAccountSummaryService,
    private _onUnauthorized: () => void
  ) { }

  public setup() {
    const retryPolicy: IRetryPolicy = {
      nextRetryDelayInMilliseconds: (retryContext: RetryContext) => {
        const retryTime = Math.min(30000, 500 * Math.pow(1.5, retryContext.previousRetryCount));
        console.log(`Attempting SignalR reconnect after a delay of ${retryTime}ms`);
        return retryTime;
      }
    };

    this._connection = new HubConnectionBuilder()
      .withUrl(streamingDataUrl)
      .withAutomaticReconnect(retryPolicy)
      .build();
    this._connectionState = SignalRConnectionState.Stopped;

    this.setupStreamingSubServices();

    this._connection.onclose(err => {
      console.log(`SignalR Closed - ${err}`);
      this._connectionState = SignalRConnectionState.Stopped;
    })
    this._connection.onreconnecting(err => {
      console.log(`SignalR Reconnecting - ${err}`);
      this._connectionState = SignalRConnectionState.Reconnecting;
    });
    this._connection.onreconnected(err => {
      console.log(`SignalR Reconnected - ${err}`);
      this._connectionState = SignalRConnectionState.Connected;
      this.reRegisterDependentServices();
    });
  }

  public start() {
    if (this._connection == null) {
      console.error("Calling start before setup!");
      return;
    }

    this._connectionState = SignalRConnectionState.Connecting;
    this._connection.start()
      .then(() => {
        console.log("SignalR Started");
        this._connectionState = SignalRConnectionState.Connected;
        this.reRegisterDependentServices();
      })
      .catch(error => {
        console.error(error);
        if (this._onUnauthorized !== null && error?.message?.indexOf("401") > -1) {
          this._onUnauthorized();
        }
      });
  }

  public stop() {
    if (this._connection == null) {
      console.error("Calling stop before setup");
      return;
    }

    this._connection.stop();
  }

  private setupStreamingSubServices() {
    if (this._connection == null)
      throw new Error("Streaming setup called before service was initialized");

    this._streamingInstrumentService.registerSubscriptionCallbacks(
      () => this._connectionState == SignalRConnectionState.Connected,
      (instrumentIds: number[]) => this._connection?.invoke("SubscribeInstrumentUpdates", { InstrumentIds: instrumentIds }),
      (instrumentIds: number[]) => this._connection?.invoke("UnsubscribeInstrumentUpdates", { InstrumentIds: instrumentIds }),
    );

    this._streamingPositionsService.registerSubscriptionCallbacks(
      () => this._connectionState == SignalRConnectionState.Connected,
      () => this._connection?.invoke("SubscribePositionUpdates", {}),
      () => this._connection?.invoke("UnsubscribePositionUpdates", {})
    );

    this._streamingOrdersService.registerSubscriptionCallbacks(
      () => this._connectionState == SignalRConnectionState.Connected,
      () => this._connection?.invoke("SubscribeOrderUpdates", {}),
      () => this._connection?.invoke("UnsubscribeOrderUpdates", {})
    );

    this._streamingAccountSummaryService.registerSubscriptionCallbacks(
      () => this._connectionState == SignalRConnectionState.Connected,
      () => this._connection?.invoke("SubscribeAccountSummaryUpdates", {}),
      () => this._connection?.invoke("UnsubscribeAccountSummaryUpdates", {})
    );

    this._connection.on('ReceivePriceUpdate', (quote: Quote) => {
      this._streamingInstrumentService.receivePriceUpdate(quote);
    });

    this._connection.on('ReceiveIndicatorUpdate', (indicator: InstrumentIndicator) => {
      this._streamingInstrumentService.receiveIndicatorUpdate(indicator);
    });

    this._connection.on('ReceivePositionUpdate', (position: Position) => {
      this._streamingPositionsService.receivePositionUpdate(position);
    });

    this._connection.on('ReceiveOrderUpdate', (order: Order) => {
      this._streamingOrdersService.receiveOrderUpdate(order);
    });

    this._connection.on('ReceiveAccountSummaryUpdate', (accountSummary: AccountSummary) => {
      this._streamingAccountSummaryService.receiveAccountSummaryUpdate(accountSummary);
    });
  }

  private reRegisterDependentServices() {
    this._streamingInstrumentService.reRegisterSubscriptions();
    this._streamingPositionsService.reRegisterSubscriptions();
    this._streamingOrdersService.reRegisterSubscriptions();
    this._streamingAccountSummaryService.reRegisterSubscriptions();
  }
}

export default StreamingDataService;