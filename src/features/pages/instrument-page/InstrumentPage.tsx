import { useNavigate, useParams } from 'react-router';
import { useInstrumentQuery, useInstrumentsQuery } from '../../../app/api/instrumentsApi';
import { useInstrumentIndicators, useInstrumentPrice } from '../../../app/hooks';
import Oscillator from '../../../controls/oscillator/Oscillator';
import InstrumentChart from '../../components/smart/instrument-chart/InstrumentChart';
import SmartInstrumentSummary from '../../components/smart/smart-instrument-summary/SmartInstrumentSummary';
import classes from './InstrumentPage.module.scss';
import LoadingBox from '../../../controls/loading-box/LoadingBox';

const valueToRecommendation = (value: number, min: number, max: number) => {
  return '';
  const range = max - min;
  const percentage = (value - min) / range;
  return percentage < 0.2 ? 'STR. SELL' :
    percentage < 0.4 ? 'SELL' :
      percentage < 0.6 ? 'NEUTRAL' :
        percentage < 0.8 ? 'BUY' :
          'STR. BUY';
}

export interface InstrumentProps { }

const InstrumentPage = (props: InstrumentProps) => {
  const { ticker } = useParams();
  const navigate = useNavigate();

  const { isLoading: isInstrumentsLoading, data: instruments } = useInstrumentsQuery({});
  const instrumentId = instruments?.find(i => i.ticker === ticker)?.instrumentId;
  const { isLoading: isInstrumentLoading, data: instrument } = useInstrumentQuery({ instrumentId }, { skip: instrumentId == null });
  const price = useInstrumentPrice(instrumentId);
  const instrumentIndicators = useInstrumentIndicators(instrumentId);

  if (instrumentId == null)
    return <div className="page">
      <div className="card">
        <h2>Instrument not found</h2>
        <div>Please select another instrument</div>
      </div>
    </div>;

  if (isInstrumentsLoading || instruments == null || isInstrumentLoading || instrument == null)
    return <div className="page">
      <LoadingBox height={300} />
      <LoadingBox height={300} />
    </div>


  const loadingOscillator = <LoadingBox width={120} height={70} />
  const rsiIndicator = instrumentIndicators?.RSI;
  const rsiOscillator = rsiIndicator == null
    ? loadingOscillator
    : <Oscillator
      value={rsiIndicator.value}
      text={valueToRecommendation(rsiIndicator.value, 0, 100)}
      heading="RSI"
      min={0}
      max={100}
    />;

  const stocIndicator = instrumentIndicators?.Stochastic;
  const stocOscillator = stocIndicator == null
    ? loadingOscillator
    : <Oscillator
      value={stocIndicator.value}
      text={valueToRecommendation(stocIndicator.value, 0, 100)}
      heading="Stoc."
      min={0}
      max={100}
    />

  const procIndicator = instrumentIndicators?.PRoC;
  const procOscillator = procIndicator == null
    ? loadingOscillator
    : <Oscillator
      value={procIndicator.value}
      text={valueToRecommendation(procIndicator.value, -100, 100)}
      heading="PRoC"
      min={-100}
      max={100}
    />;

  const companyIcon = instrument.iconPath;

  return <section className="page rotate-root">
    <div className="card left">
      <SmartInstrumentSummary
        instrumentId={instrumentId}
        onTrade={() => navigate(`/trade/${instrument.ticker}`)}
      />
    </div>

    <div className="card right">
      <h2>Technicals</h2>
      <div className={classes.oscillators}>
        <div className={classes.oscillator}>
          {rsiOscillator}
        </div>
        <div className={classes.oscillator}>
          {stocOscillator}
        </div>
        <div className={classes.oscillator}>
          {procOscillator}
        </div>
      </div>

      <div className={classes.chart}>
        <InstrumentChart instrumentId={instrumentId ?? ""} />
      </div>
    </div>
  </section>
};

export default InstrumentPage;