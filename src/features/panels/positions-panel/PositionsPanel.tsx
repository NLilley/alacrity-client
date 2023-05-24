import { useNavigate } from "react-router";
import { PositionsTable } from "../../components/smart/positions-table/PositionsTable"
import Button from "../../../controls/button/Button";

export interface PositionsPanelProps { };

const PositionsPanel = (props: PositionsPanelProps) => {
  const navigate = useNavigate();

  return <div className="card">
    <h2>Top Positions</h2>
    <PositionsTable maxRows={7} onSelect={(instrumentId, ticker) => navigate(`/instrument/${ticker}`)} />
    <div className="card-footer">
      <Button text="View Positions" size="medium" onClick={() => navigate('/trade-nexus')} />
    </div>
  </div>
}

export default PositionsPanel;