import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { registerStreamingAccountSummaryService, registerStreamingInstrumentService, registerStreamingOrdersService, registerStreamingPositionsService } from './app/hooks';
import { registerStreamingDataService, setLoggedIn } from './app/slices/loginSlice';
import { store } from './app/store';
import App from './features/structure/app/App';
import './index.scss';
import StreamingAccountSummaryService from './services/StreamingAccountSummaryService';
import StreamingDataService from './services/StreamingDataService';
import StreamingInstrumentService from './services/StreamingInstrumentService';
import StreamingOrdersService from './services/StreamingOrdersService';
import StreamingPositionsService from './services/StreamingPositionsService';
import { scrollPerspective } from './utils/perspectiveUtil';

const container = document.getElementById('root')!;
const root = createRoot(container);

const streamingInstrumentService = new StreamingInstrumentService();
const streamingPositionsService = new StreamingPositionsService();
const streamingOrdersService = new StreamingOrdersService(store.dispatch);
const streamingAccountSummaryService = new StreamingAccountSummaryService(store.dispatch);
const streamingDataService = new StreamingDataService(
  streamingInstrumentService,
  streamingPositionsService,
  streamingOrdersService,
  streamingAccountSummaryService,
  () => store.dispatch(setLoggedIn(false))
);
streamingDataService.setup();

// Required for our hooks to interface with the new service.
registerStreamingInstrumentService(streamingInstrumentService);
registerStreamingPositionsService(streamingPositionsService);
registerStreamingOrdersService(streamingOrdersService);
registerStreamingAccountSummaryService(streamingAccountSummaryService);
registerStreamingDataService(streamingDataService);

// Setup scroll listener for perspective transformations
document.addEventListener("scroll", () => scrollPerspective());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
