import classes from './WatchlistTable.module.scss';
import { useInstrumentPrice } from "../../../../app/hooks";
import Table from "../../../../controls/table/Table"
import { useInstrumentQuery } from '../../../../app/api/instrumentsApi';
import { useWatchlistsQuery } from '../../../../app/api/watchlistsApi';
import { WatchlistItem } from '../../../../app/models/watchlistItem';
import { IconCancel } from '../../../../shared/icons';
import { focusHandler } from '../../../../utils/accessibilityUtil';
import LoadingBox from '../../../../controls/loading-box/LoadingBox';
import { useState } from 'react';
import { Confirm } from '../../../modals/confirm/Confirm';

interface WatchlistRowProps {
  watchlistName: string,
  instrumentId: number,
  onSelect?: (instrumentId: number, ticker: string) => void,
  onDelete?: () => void
}

const WatchlistRow = (props: WatchlistRowProps) => {
  const [showRemoveTickerDialog, setShowRemoveTickerDialog] = useState(false);

  const { isLoading: isLoadingInstrument, data: instrument } = useInstrumentQuery({ instrumentId: props.instrumentId }, { skip: props.instrumentId == null });
  const price = useInstrumentPrice(props.instrumentId);

  if (isLoadingInstrument || instrument == null || price == null)
    return <tr></tr>;

  const mid = price?.mid;
  const change = price == null ? 0 : mid! - instrument.previousClose;
  const changePct = price == null ? 0 :
    !!instrument.previousClose ? ((mid! / instrument.previousClose) - 1) * 100 : null;
  const isLoser = change < 0;
  const colorClass = isLoser ? 'lose' : 'win';

  return <>
    <tr className="pointer"
      tabIndex={0}
      onKeyUp={focusHandler}
      onClick={() => props.onSelect && props.onSelect(instrument.instrumentId, instrument.ticker)}
    >
      <td><div className={classes.watchlistItem}>{instrument!.name}</div></td>
      <td><div className={`${classes.watchlistItem} ${classes.price}`}>{mid!.toFixed(2)}</div></td>
      <td>
        <div className={`${classes.watchlistItem} ${colorClass}`}>
          <div className={classes.leftRight}>
            <div className="text-left">{change?.toFixed(2)}</div>
            <div className="text-left">{changePct!.toFixed(2)}%</div>
          </div>
        </div>
      </td>
      {
        props.onDelete &&
        <td><div className={classes.watchlistItem}>
          <span
            className="pointer"
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();

              setShowRemoveTickerDialog(true);
            }}
            tabIndex={0}>
            {IconCancel}
          </span>
        </div>
        </td>
      }
    </tr>
    {
      showRemoveTickerDialog && <Confirm
        header={"Are you sure?"}
        onCancel={() => setShowRemoveTickerDialog(false)}
        confirmText='Remove'
        onConfirm={() => {
          setShowRemoveTickerDialog(false);
          props.onDelete!();
        }}
        autofocus
      >
        <span>This will remove "{instrument!.name}" from watchlist "{props.watchlistName}"</span>
      </Confirm>
    }
  </>;
};

export interface WatchlistTableProps {
  watchlistId: number,
  onSelect?: ((instrumentId: number, ticker: string) => void),
  onDelete?: (wi: WatchlistItem) => void
};

const watchlistHeaderWithoutDelete = ['Ticker', 'Price', 'Change'];
const watchlistHeader = ['Instrument', 'Price', 'Change', ''];
const WatchlistTable = (props: WatchlistTableProps) => {
  const { isLoading: isWatchlistsLoading, data: watchlists } = useWatchlistsQuery({});

  if (isWatchlistsLoading || watchlists == null)
    return <LoadingBox height={300} />

  const watchlist = watchlists.find(w => w.watchlistId === props.watchlistId);
  if (watchlist == null)
    return <Table
      header={watchlistHeaderWithoutDelete}
      emptyMessage={props.watchlistId == null ? 'Please select a watchlist' : "Could not find selected watchlist."}
      rows={[]}
    />

  const watchlistRows = (watchlist == null)
    ? []
    : watchlist.watchlistItems.map((wi) => <WatchlistRow
      key={wi.watchlistItemId}
      watchlistName={watchlist.name}
      instrumentId={wi.instrumentId}
      onSelect={props.onSelect}
      onDelete={props.onDelete ? () => props.onDelete!(wi) : undefined}
    />);

  return <Table
    header={props.onDelete ? watchlistHeader : watchlistHeaderWithoutDelete}
    rows={watchlistRows}
    emptyMessage='No tickers have been added to this watchlist.'
  />
}

export default WatchlistTable;