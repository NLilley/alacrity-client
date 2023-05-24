import { Link, useNavigate } from 'react-router-dom';
import classes from './TradeNexusPage.module.scss';
import Table from '../../../controls/table/Table';
import { Position } from '../../../app/models/position';
import { useInstrumentPrice, useOrders, usePositions } from '../../../app/hooks';
import { SpecialInstruments } from '../../../app/enums/specialInstruments';
import { useInstrumentsQuery } from '../../../app/api/instrumentsApi';
import { formatMoney } from '../../../utils/moneyUtils';
import { PositionsTable } from '../../components/smart/positions-table/PositionsTable';
import { OrdersTable } from '../../components/smart/orders-table/OrdersTable';
import { TradesTable } from '../../components/smart/trades-table/TradesTable';



export interface TradeNexusPageProps { }
const TradeNexusPage = (props: TradeNexusPageProps) => {
  const navigate = useNavigate();
  const onSelectPositions = (instrumentId: number, ticker: string) => {
    if (instrumentId === SpecialInstruments.Cash)
      return;

    navigate(`/instrument/${ticker}`);
  }

  const onSelectTrades = (instrumentId: number, ticker: string) => {
    if (instrumentId === SpecialInstruments.Cash)
      return;

    navigate(`/trade/${ticker}`);
  }

  return <section className={`page rotate-root`}>
    <div className="card left">
      <h2>Trade Nexus</h2>

      <div className="content">
        <h3>Open Positions</h3>
        <PositionsTable onSelect={onSelectPositions} />
      </div>

      <div className="content">
        <h3>Open Orders</h3>
        <OrdersTable onSelect={onSelectTrades} />
      </div>
    </div>

    <div className="card right">
      <div className="content">
        <h3>Trade History</h3>
        <TradesTable onSelect={onSelectTrades} />
      </div>
    </div>
  </section>;
}

export default TradeNexusPage;