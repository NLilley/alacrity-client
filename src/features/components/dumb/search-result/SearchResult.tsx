import Button from '../../../../controls/button/Button';
import classes from './SearchResult.module.scss';

export interface SearchResultProps {
  name: string,
  ticker: string,
  industry: string,
  price?: number,
  prevClose: number,
  icon?: any,
  isActive?: boolean,
  onClick?: () => void,
  onView?: () => void,
  onTrade?: () => void
}

const SearchResult = (props: SearchResultProps) => {
  const isLoser = props.prevClose > props.price!;
  const change = props.price! - props.prevClose;
  const changePct = props.prevClose <= 0 ? null : (props.price! / props.prevClose) - 1;

  return <div
    className={`card ${classes.searchResult} ${props.isActive ? classes.active : ''}`}
    onClick={props.onClick}
  >
    {!!props.icon && <div className={classes.icon}><img src={props.icon} /></div>}
    <div className={classes.ticker}>{props.ticker}</div>
    <div className={classes.details}>
      <div className={classes.detailsName}>{props.name}</div>
      <div className={classes.detailsPrices}>
        <div className={`${isLoser ? 'lose' : 'win'}`}>
          <div className={classes.detailsPrice}>{props.price?.toFixed(2)}</div>
          <div>{change.toFixed(2)}</div>
          {!!changePct && <div> ({!isLoser && '+'}{changePct.toFixed(2)}%)</div>}
        </div>
      </div>
      <div className={classes.detailsActions}>
        <Button kind="sub" text="View" onClick={props.onView as any}/>
        <Button text="Trade" onClick={props.onTrade as any} />
      </div>
    </div>
  </div>
}

export default SearchResult;