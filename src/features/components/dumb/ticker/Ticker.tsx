import { focusHandler } from '../../../../utils/accessibilityUtil';
import classes from './Ticker.module.scss'

export interface TickerProps {
  ticker: string,
  price: number,
  prevClose: number,
  icon: any,
  onClick?: (ticker: string) => void,
  isLoading?: false
}

export interface TickerLoadingProps {
  isLoading: true
}

const Ticker = (props: TickerProps | TickerLoadingProps) => {
  if (props.isLoading == true)
    return <div className={classes.ticker}></div>;

  const change = props.price - props.prevClose;
  const changePct = !props.prevClose ? null : 100 * (change / props.prevClose);
  const changeClass = `${classes.tickerChange} ${change < 0 ? classes.tickerChangeLose : classes.tickerChangeWin}`;
  return (
    <div
      className={`${classes.ticker}`}
      onClick={() => !!props.onClick && props.onClick(props.ticker)}
      onKeyUp={focusHandler}
      tabIndex={props.onClick ? 0 : -1}
      role={props.onClick ? 'button' : ''}
    >
      <div className={classes.tickerIcon}>
        {props.icon && <img src={props.icon} className={classes.tickerIconIcon} />}
      </div>
      <div className={classes.tickerTicker}>{props.ticker}</div>
      <div className={classes.tickerDetails}>
        <div>{props.price.toFixed(2)}</div>
        {
          !!change &&
          <div className={changeClass}>
            {change > 0 ? '+' : ''}{change.toFixed(2)} {changePct && `(${changePct?.toFixed(2)}%)`}
          </div>
        }
      </div>
    </div>
  );
}

export default Ticker;
