import { useSelector } from 'react-redux';
import { DashboardPanelKind, selectDashboardPanels } from '../../../app/slices/dashboardSlice';
import GreeterPanel from '../../panels/greeter-panel/GreeterPanel';
import TickerTapePanel from '../../panels/ticker-tape-panel/TickerTapePanel';
import classes from './DashboardPage.module.scss';
import PositionsPanel from '../../panels/positions-panel/PositionsPanel';
import WatchlistPanel from '../../panels/watchlist-panel/WatchlistPanel';
import OrdersPanel from '../../panels/orders-panel/OrdersPanel';

export interface DashboardPageProps { }

const DashboardPage = (props: DashboardPageProps) => {
  const panels = useSelector(selectDashboardPanels);

  return (
    <section className={`page ${classes.dashboard}`}>
      <div className={classes.dashboardPanels}>
        <section className={classes.dashboardTickerTapePanel}>
          <TickerTapePanel />
        </section>

        <div className={`${classes.dashboardColumn} rotate-root`}>
          <section role="region" className={`${classes.dashboardPanel} left`}>
            <GreeterPanel />
          </section>

          <section role="region" className={`${classes.dashboardPanel} left`}>
            <PositionsPanel />
          </section>
        </div>

        <div className={`${classes.dashboardColumn} rotate-root`}>
          <section role="region" className={`${classes.dashboardPanel} right`}>
            <WatchlistPanel />
          </section>

          <section role="region" className={`${classes.dashboardPanel} right`}>
            <OrdersPanel />
          </section>
        </div>
      </div>
    </section>
  );
}

export default DashboardPage;