import { useNavigate } from 'react-router-dom';
import { useClientQuery } from '../../../app/api/clientsApi';
import { SpecialInstruments } from '../../../app/enums/specialInstruments';
import { useAccountSummary, usePositions, useStreamingInstrumentService } from '../../../app/hooks';
import Button from '../../../controls/button/Button';
import { formatMoney } from '../../../utils/moneyUtils';
import { OrdersTable } from '../../components/smart/orders-table/OrdersTable';
import { PositionsTable } from '../../components/smart/positions-table/PositionsTable';
import classes from './AccountPage.module.scss';
import LoadingBox from '../../../controls/loading-box/LoadingBox';

export interface AccountPageProps { }

const AccountPage = (props: AccountPageProps) => {
  const navigate = useNavigate();
  const instrumentService = useStreamingInstrumentService();
  const positions = usePositions();
  const accountSummary = useAccountSummary();
  const { isLoading: isClientLoading, data: client } = useClientQuery({});

  if (positions == null || instrumentService == null || accountSummary == null || isClientLoading)
    return <section className="page"><LoadingBox height={300} /></section>;

  let pnlColor = accountSummary.profitLoss < 0 ? 'lose' : 'win';

  return <section className={`page rotate-root`}>
    <section className={`card left`}>
      <h2>{client?.firstName} {client?.otherNames}</h2>
      <div className={classes.fundSummary}>
        <div>Cash Balance: <div>{formatMoney(accountSummary.cashBalance)}</div></div>
        <div>Account Value: <div>{formatMoney(accountSummary.accountValue)}</div></div>
        <div>Open P/L: <div className={pnlColor}>{formatMoney(accountSummary.profitLoss)}</div></div>
      </div>

      <div className={classes.actions}>
        <Button text='Deposit' kind='sub' onClick={() => navigate('/deposit-funds')} />
        <Button text='Withdraw' kind='sub' onClick={() => navigate('/withdraw-funds')} />
      </div>

      <div>
        <h3 style={{ marginBottom: 0 }}>Top Positions</h3>
        <PositionsTable onSelect={(instrumentId, ticker) => instrumentId !== SpecialInstruments.Cash && navigate(`/instrument/${ticker}`)} />
        <div className={classes.actions}>
          <Button text='View Full Positions' kind='sub' onClick={() => navigate('/trade-nexus')} />
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 0 }}>Open Orders</h3>
        <OrdersTable onSelect={(instrumentId, ticker) => navigate(`/trade/${ticker}`)} />
        <div className={classes.actions}>
          <Button text='View All Orders' kind='sub' onClick={() => navigate('/trade-nexus')} />
        </div>
      </div>
    </section >

    <section className={`card right`}>
      <div>
        <h3>Web Messages</h3>
        <div>
          {
            accountSummary.unreadMessages > 0
              ? <span>You have <span className="lose">{accountSummary.unreadMessages}</span> messages waiting to be read</span>
              : "You have no unread web messages."
          }
        </div>
        <div className={classes.actions}>
          <Button text='View Message Hub' kind='sub' onClick={() => navigate('/message-hub')} />
        </div>
      </div>

      <div>
        <h3>Statements</h3>
        Statements are generated daily, weekly and monthly by default,
        as well as for major yearly and account specific events. They can also be
        generated on demand.

        All of your statements, current and historic, are available from our statements page.

        <div className={classes.actions}>
          <Button text='View Statements' kind='sub' onClick={() => navigate('/statements')} />
        </div>
      </div>

      <div>
        <h3>Password and Authentication</h3>
        <div className={classes.actions}>
          <Button text='Change Password' kind='sub' onClick={() => navigate('/change-password')} />
          <Button text='Change Email' kind='sub' onClick={() => navigate('/change-email')} />
          <Button text='Update Address' kind='sub' onClick={() => navigate('/update-address')} />
        </div>
      </div>
    </section>

  </section >
}
export default AccountPage;
