import { useInstrumentQuery } from "../../../../app/api/instrumentsApi";
import { useInstrumentPrice } from "../../../../app/hooks"
import LoadingBox from "../../../../controls/loading-box/LoadingBox";
import Ticker from "../../dumb/ticker/Ticker";

export interface SmartTickerProps {
  instrumentId: number,
  onClick?: () => void
}

const SmartTicker = (props: SmartTickerProps) => {
  const instrumentPrice = useInstrumentPrice(props.instrumentId);
  const { isLoading, data: instrument } = useInstrumentQuery({ instrumentId: props.instrumentId });

  if (isLoading || instrument == null || instrumentPrice == null)
    return <LoadingBox height={112} width={352} />

  return <Ticker
    icon={instrument.iconPath}
    ticker={instrument.ticker}
    price={instrumentPrice.mid ?? 0}
    prevClose={instrument.previousClose}
    onClick={props.onClick}
  />
}

export default SmartTicker;
