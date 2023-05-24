import classes from './InstrumentSummary.module.scss';
import InstrumentChart from '../../smart/instrument-chart/InstrumentChart';
import Button from '../../../../controls/button/Button';

export interface InstrumentSummaryProps {
  instrumentId: number,
  name: string,
  ticker: string,
  industry: string,
  price?: number,
  prevClose: number,
  companyIcon: any,
  description?: string,
  displayChart?: boolean,
  onView?: () => void,
  onTrade?: () => void,
}

const InstrumentSummary = (props: InstrumentSummaryProps) => {
  const change = props.price == null ? 0 : props.price - props.prevClose;
  const changePct = props.price == null ? 0 :
    !!props.prevClose ? ((props.price / props.prevClose) - 1) * 100 : null;
  const isLoser = change < 0;

  const displayActions = props.onView || props.onTrade;

  return <div className={`${classes.summary}`}>
    <div>
      <div className={classes.header}>
        <h2>{props.name}</h2>
        <div className={classes.price}>
          {
            props.price != null &&
            <span className={isLoser ? 'lose' : 'win'}>{props.price.toFixed(2)}</span>
          }
        </div>
      </div>
      <div className={classes.subHeader}>
        <div className={classes.ticker}>{props.ticker} - {props.industry}</div>
        {
          props.price != null && <div className={`${classes.priceChange} ${isLoser ? 'lose' : 'win'}`}>
            <span>{!isLoser && '+'}{change.toFixed(2)}</span>
            {
              changePct && <span>({changePct.toFixed(2)}%)</span>
            }
          </div>
        }
      </div>

      {
        displayActions &&
        <div className={classes.actions}>
          {
            props.onView && <Button
              text='View'
              kind='sub'
              onClick={props.onView}
            />
          }
          {
            props.onTrade && <Button
              text='Trade'
              onClick={props.onTrade} />}
        </div>
      }
    </div>

    {
      !!props.displayChart &&
      <div className={classes.chart}>
        <InstrumentChart instrumentId={props.instrumentId} />
      </div>
    }
    {
      !props.displayChart &&
      <div className={classes.description}>
        {props.description}
      </div>
    }
  </div>;
}

export default InstrumentSummary;
