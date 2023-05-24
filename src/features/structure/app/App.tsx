import classes from './App.module.scss';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../../app/slices/loginSlice';
import Button from '../../../controls/button/Button';
import ErrorBoundary from '../../../controls/error-boundary/ErrorBoundary';
import AccountPage from '../../pages/account-page/AccountPage';
import ChangePasswordPage from '../../pages/change-password-page/ChangePasswordPage';
import DashboardPage from '../../pages/dashboard-page/DashboardPage';
import InstrumentPage from '../../pages/instrument-page/InstrumentPage';
import LoginPage from '../../pages/login-page/LoginPage';
import MessageHubPage from '../../pages/message-hub-page/MessageHubPage';
import MessagePage from '../../pages/message-page/MessagePage';
import NewWebMessagePage from '../../pages/new-message-page/NewMessagePage';
import NotFoundPage from '../../pages/not-found-page/NotFoundPage';
import NotImplementedPage from '../../pages/not-implemented/NotImplementedPage';
import PlaceTradePage from '../../pages/place-trade-page/PlaceTradePage';
import SearchPage from '../../pages/search-page/SearchPage';
import SettingsPage from '../../pages/settings-page/SettingsPage';
import TradeNexusPage from '../../pages/trade-nexus-page/TradeNexusPage';
import WatchlistPage from '../../pages/watchlist-page/WatchlistPage';
import WithdrawFundsPage from '../../pages/withdraw-funds-page/WithdrawFundsPage';
import FooterBar from '../footer-bar/FooterBar';
import MainContent from '../main-content/MainContent';
import NavBar from '../nav-bar/NavBar';
import DepositFundsPage from '../../pages/deposit-funds-page/DepositFundsPage';
import AboutPage from '../../pages/about-page/AboutPage';
import ContactUsPage from '../../pages/contact-us-page/ContactUsPage';
import HelpPage from '../../pages/help-page/HelpPage';
import PrivacyPolicyPage from '../../pages/privacy-policy-page/PrivacyPolicyPage';

const accountPaths = [
  {
    path: 'account',
    element: <AccountPage />
  },
  {
    path: 'change-email',
    element: <NotImplementedPage />
  },
  {
    path: 'deposit-funds',
    element: <DepositFundsPage />
  },
  {
    path: 'login',
    element: <LoginPage />
  },
  {
    path: 'message-hub',
    element: <MessageHubPage />
  },
  {
    path: 'message/:rootId',
    element: <MessagePage />
  },
  {
    path: 'new-message/:rootId?',
    element: <NewWebMessagePage />
  },
  {
    path: 'change-password',
    element: <ChangePasswordPage />
  },
  {
    path: 'settings',
    element: <SettingsPage />
  },
  {
    path: 'statements',
    element: <NotImplementedPage />
  },
  {
    path: 'update-address',
    element: <NotImplementedPage />
  },
  {
    path: 'withdraw-funds',
    element: <WithdrawFundsPage />
  },
];

const tradingPaths = [
  {
    path: 'instrument/:ticker',
    element: <InstrumentPage />
  },
  {
    path: 'search/:initialSearchTerm?',
    element: <SearchPage />
  },
  {
    path: 'trade/:ticker',
    element: <PlaceTradePage />
  },
  {
    path: 'trade-nexus',
    element: <TradeNexusPage />
  },
  {
    path: 'watchlist',
    element: <WatchlistPage />
  },
];

const infoPaths = [
  {
    path: 'about',
    element: <AboutPage />
  },
  {
    path: 'contact-us',
    element: <ContactUsPage />
  },
  {
    path: 'help',
    element: <HelpPage />
  },
  {
    path: 'privacy-policy',
    element: <PrivacyPolicyPage />
  },
  {
    path: 'terms-and-conditions',
    element: <AboutPage />
  },
  {
    path: 'not-implemented',
    element: <NotImplementedPage />
  }
];

const miscPaths = [
  {
    path: 'not-found',
    element: <NotFoundPage />,
  },
];

const errorBoundaryWarning = <div>
  <div style={{ textAlign: 'center' }}>
    <h2>Looks like something has gone wrong!</h2>
    <div>Please report this bug to support@alacrity.com</div>
    <div style={{ marginTop: 32 }} >
      <Button text="Send Diagnostics" />
      <span style={{ marginLeft: 16 }}>
        <Button kind="sub" text="Restart App" onClick={() => window.location.reload()} />

      </span>
    </div>
  </div>
</div>;

const unauthenticatedRouter = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <FooterBar />
      <ErrorBoundary fallback={errorBoundaryWarning}>
        <MainContent />
      </ErrorBoundary>
    </>,
    errorElement: errorBoundaryWarning,
    children: [
      {
        element: <LoginPage />,
        index: true
      },
      {
        path: '*',
        element: <LoginPage />
      },
      ...infoPaths
    ]
  }
])

const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <NavBar />
      <FooterBar />
      <ErrorBoundary fallback={errorBoundaryWarning}>
        <MainContent />
      </ErrorBoundary>
    </>,
    errorElement: errorBoundaryWarning,
    children: [
      {
        element: <DashboardPage />,
        index: true
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
      .concat(accountPaths)
      .concat(tradingPaths)
      .concat(infoPaths)
      .concat(miscPaths)
  },
]);

const App = () => {
  var isLoggedIn = useSelector(selectIsLoggedIn);
  const routerToUse = isLoggedIn ? router : unauthenticatedRouter;
  return <div className={classes.app}>
    <RouterProvider router={routerToUse} />
  </div>
}

export default App;
