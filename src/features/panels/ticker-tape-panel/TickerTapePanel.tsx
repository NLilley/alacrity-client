import { useNavigate } from "react-router";
import ScrollPanel from "../../../controls/scroll-panel/ScrollPanel";
import SmartTicker from "../../components/smart/smart-ticker/SmartTicker";
import { useInstrumentsQuery } from "../../../app/api/instrumentsApi";

export interface TickerTapePanelProps { }

const defaultTickers = ['AMD', 'NVDA', 'MCD', 'V', 'PG', 'TSLA', 'MSFT', 'AAPL', 'META',]
const TickerTapePanel = (props: TickerTapePanelProps) => {
  const navigate = useNavigate();
  const { isLoading, data: instruments } = useInstrumentsQuery({});

  if (isLoading || instruments == null)
    return <ScrollPanel rotateElements></ScrollPanel>

  const instrumentIds = defaultTickers
    .map(t => ({ ticker: t, instrumentId: instruments!.find(i => i.ticker == t)?.instrumentId }))
    .filter(t => t.instrumentId != null);

  const smartTickers = instrumentIds.map(pairs => <SmartTicker
    key={pairs.instrumentId}
    instrumentId={pairs.instrumentId ?? 0}
    onClick={() => navigate(`/instrument/${pairs.ticker}`)}
  />);

  return <ScrollPanel rotateElements>
    {smartTickers}
  </ScrollPanel>;
}

export default TickerTapePanel;