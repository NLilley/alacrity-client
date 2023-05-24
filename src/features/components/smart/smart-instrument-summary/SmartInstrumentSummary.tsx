import { useInstrumentQuery } from "../../../../app/api/instrumentsApi";
import { useInstrumentPrice } from "../../../../app/hooks";
import InstrumentSummary, { InstrumentSummaryProps } from "../../dumb/instrument-summary/InstrumentSummary";
import { InstrumentUtil } from "../../../../utils/instrumentUtil";
import LoadingBox from "../../../../controls/loading-box/LoadingBox";

export interface SmartInstrumentSummaryProps {
  instrumentId?: number,
  displayChart?: boolean,
  onView?: (instrumentId: number, ticker: string) => void,
  onTrade?: (instrumentId: number, ticker: string) => void
}

const SmartInstrumentSummary = (props: SmartInstrumentSummaryProps) => {
  const { isLoading: isInstrumentLoad, data: instrument } = useInstrumentQuery({ instrumentId: props.instrumentId }, { skip: props.instrumentId == null });
  const price = useInstrumentPrice(props.instrumentId);

  if (props.instrumentId == null || instrument == null || price == null) {
    return <LoadingBox height={300}/>
  }
  const summaryProps: InstrumentSummaryProps = {
    ...InstrumentUtil.getInstrumentSummaryProps(instrument!, price)
  }
  if (!!props.displayChart) summaryProps.displayChart = props.displayChart;
  if (!!props.onView) summaryProps.onView = () => props.onView!(instrument.instrumentId, instrument.ticker);
  if (!!props.onTrade) summaryProps.onTrade = () => props.onTrade!(instrument.instrumentId, instrument.ticker);

  return <InstrumentSummary {...summaryProps} />
}

export default SmartInstrumentSummary;