import { useNavigate } from 'react-router-dom';
import { useClientQuery } from '../../../app/api/clientsApi';
import { useAccountSummary, useOrders } from '../../../app/hooks';
import Button from '../../../controls/button/Button';
import { pluralizeS } from '../../../utils/humanizeUtil';
import { formatMoney, moneyClass } from '../../../utils/moneyUtils';
import classes from './GreeterPanel.module.scss';
import LoadingBox from '../../../controls/loading-box/LoadingBox';

interface GreeterPanelProps { }

const GreeterPanel = (props: GreeterPanelProps) => {
  const navigate = useNavigate();

  const { isLoading: isClientLoading, data: client } = useClientQuery({});
  const accountSummary = useAccountSummary();
  const orders = useOrders();

  if (isClientLoading || client == null || accountSummary == null || orders == null)
    return <LoadingBox height={350} />;

  const openPositions = accountSummary.accountValue - accountSummary.cashBalance;
  const unreadMessages = accountSummary.unreadMessages;
  const openOrders = Object.keys(orders as any).length;

  return <div className="card">
    <h2 className={classes.header}>Good Morning, {client?.firstName}!</h2>
    <div className={classes.position}>
      The value of your open positions is <span className="number">{formatMoney(openPositions)}</span>
    </div>
    <div className={classes.position}>Your current profit is <span className={moneyClass(accountSummary.profitLoss)}>
      {formatMoney(accountSummary.profitLoss)}</span>.
    </div>
    <div className={classes.messages}>
      You have {openOrders === 0 ? 'no' : openOrders} open order{pluralizeS(openOrders)}, and {unreadMessages > 0 ? <span className="lose">{unreadMessages}</span> : 'no'} new message{pluralizeS(unreadMessages)}.
    </div>
    <div className="card-footer">
      <Button text="View My Account" size="medium" onClick={() => navigate('/account')} />
    </div>
  </div>
};

export default GreeterPanel;