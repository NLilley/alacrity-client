import { useNavigate } from "react-router";
import { OrdersTable } from "../../components/smart/orders-table/OrdersTable";
import Button from "../../../controls/button/Button";

export interface OrdersPanelProps { }

const OrdersPanel = (props: OrdersPanelProps) => {
  const navigate = useNavigate();
  return <div className="card">
    <h2>Open Orders</h2>
    <OrdersTable
      onSelect={(instrumentId, ticker) => navigate(`/trade/${ticker}`)}
    />
    <div className="card-footer">
      <Button text="View Trade Nexus" size="medium" onClick={() => navigate(`/trade-nexus`)} />
    </div>
  </div>
}

export default OrdersPanel;