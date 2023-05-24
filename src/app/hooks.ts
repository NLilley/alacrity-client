import { useSyncExternalStore } from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import StreamingAccountSummaryService from '../services/StreamingAccountSummaryService';
import StreamingInstrumentService from '../services/StreamingInstrumentService';
import StreamingOrdersService, { GroupedOrders } from '../services/StreamingOrdersService';
import StreamingPositionsService, { GroupedPositions } from '../services/StreamingPositionsService';
import { InstrumentIndicator } from './models/instrumentIndicator';
import { Quote } from './models/quote';
import type { AppDispatch, RootState } from './store';
import { AccountSummary } from './models/accountSummary';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Handle Price and Indicator Subscriptions
let _streamingInstrumentService: StreamingInstrumentService | undefined;
let _streamingPositionsService: StreamingPositionsService | undefined;
let _streamingOrdersService: StreamingOrdersService | undefined;
let _streamingAccountSummaryService: StreamingAccountSummaryService | undefined;
export const registerStreamingInstrumentService =
  (service: StreamingInstrumentService) => _streamingInstrumentService = service;
export const registerStreamingPositionsService =
  (service: StreamingPositionsService) => _streamingPositionsService = service;
export const registerStreamingOrdersService =
  (service: StreamingOrdersService) => _streamingOrdersService = service;
export const registerStreamingAccountSummaryService =
  (service: StreamingAccountSummaryService) => _streamingAccountSummaryService = service;

export const useStreamingInstrumentService = () => _streamingInstrumentService;

const subscribePriceMethods: { [instrumentId: number]: ((onStoreChange: () => void) => () => void) } = {}
export const useInstrumentPrice = (instrumentId: number | undefined): Quote | undefined => {
  if (instrumentId == null) {
    // InstrumentId still unknown - need to return a dummy hook to preserve react renderingj
    return useSyncExternalStore(() => () => { }, () => undefined);
  }

  let service = _streamingInstrumentService;

  let subscribe = subscribePriceMethods[instrumentId];
  if (subscribe == null) {
    subscribe = (callback: () => void) => {
      service?.subscribePrice(instrumentId, callback);
      return () => service?.unsubscribePrice(instrumentId, callback);
    };
    subscribePriceMethods[instrumentId] = subscribe;
  }

  return useSyncExternalStore<Quote | undefined>(subscribe, () => service?.getCachedPrice(instrumentId));
}

const subscribeIndicatorsMethods: { [instrumentId: number]: ((onStoreChange: () => void) => () => void) } = {}
export const useInstrumentIndicators = (instrumentId: number | undefined): ({ [name: string]: InstrumentIndicator } | undefined) => {
  if (instrumentId == null) {
    // InstrumentId still unknown - need to return a dummy hook to preserve react renderingj
    return useSyncExternalStore(() => () => { }, () => undefined);
  }

  let service = _streamingInstrumentService;

  let subscribe = subscribeIndicatorsMethods[instrumentId];
  if (subscribe == null) {
    subscribe = (callback: () => void) => {
      service?.subscribeIdicators(instrumentId, callback);
      return () => service?.unsubscribeIndicators(instrumentId, callback);
    }
  }
  subscribeIndicatorsMethods[instrumentId] = subscribe;

  return useSyncExternalStore<{ [name: string]: InstrumentIndicator } | undefined>(subscribe, () => service?.getCachedIndicators(instrumentId));
}
let subscribePositions = (callback: () => void) => {
  _streamingPositionsService?.subscribePositions(callback);
  return () => _streamingPositionsService?.unsubscribePositions(callback);
}
export const usePositions = (): GroupedPositions | undefined => {
  return useSyncExternalStore<GroupedPositions | undefined>(subscribePositions, () => _streamingPositionsService?.getCachedPositions());
}

let subscribeOrders = (callback: () => void) => {
  _streamingOrdersService?.subscribeOrders(callback);
  return () => _streamingOrdersService?.unsubscribeOrders(callback);
}
export const useOrders = (): GroupedOrders | undefined => {
  return useSyncExternalStore<GroupedOrders | undefined>(subscribeOrders, () => _streamingOrdersService?.getCachedOrders());
}

let subscribeAccountSummary = (callback: () => void) => {
  _streamingAccountSummaryService?.subscribeAccountSummary(callback);
  return () => _streamingAccountSummaryService?.unsubscribeAccountSummary(callback);
}
export const useAccountSummary = (): AccountSummary | undefined => {
  return useSyncExternalStore<AccountSummary | undefined>(subscribeAccountSummary, () => _streamingAccountSummaryService?.getCachedAccountSummary());
}