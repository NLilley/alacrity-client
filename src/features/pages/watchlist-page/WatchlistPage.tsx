import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router';
import { useInstrumentQuery, useInstrumentsQuery } from '../../../app/api/instrumentsApi';
import { useAddToWatchlistMutation, useAddWatchlistMutation, useDeleteWatchlistItemMutation, useDeleteWatchlistMutation, useWatchlistsQuery } from '../../../app/api/watchlistsApi';
import { useInstrumentPrice } from '../../../app/hooks';
import Select, { SelectProps } from '../../../controls/select/Select';
import Table from '../../../controls/table/Table';
import { mobileBreakPoint } from '../../../shared/constants';
import SmartInstrumentSummary from '../../components/smart/smart-instrument-summary/SmartInstrumentSummary';
import classes from './WatchlistPage.module.scss';
import { WatchlistItem } from '../../../app/models/watchlistItem';
import WatchlistTable from '../../components/smart/watchlist-table/WatchlistTable';
import { IconAdd, IconCancel } from '../../../shared/icons';
import LoadingBox from '../../../controls/loading-box/LoadingBox';
import Prompt from '../../modals/prompt/Promp';
import { focusHandler } from '../../../utils/accessibilityUtil';
import { Confirm } from '../../modals/confirm/Confirm';

export interface WatchlistProps { }
const WatchlistPage = (props: WatchlistProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: ${mobileBreakPoint}px)` });
  const [showAddWatchlistDialog, setShowAddWatchlistDialog] = useState(false);
  const [showDeleteWatchlistDialog, setShowDeleteWatchlistDialog] = useState(false);
  const [showAddTickerDialog, setShowAddTickerDialog] = useState(false);
  const [selectedWatchlistId, setSelectedWatchlistId] = useState(null as number | null);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(undefined as number | undefined);
  const [initializedWatchlistSelect, setInitializedWatchlistSelect] = useState(false);
  const navigate = useNavigate();

  const { isLoading: isWatchlistsLoading, data: watchlists } = useWatchlistsQuery({});
  const { isLoading: isInstrumentsLoading, data: instruments } = useInstrumentsQuery({});
  const [attemptAddWatchlist, addWatchlistResult] = useAddWatchlistMutation();
  const [attemptAddToWatchlist, addToWatchlistResult] = useAddToWatchlistMutation();
  const [attemptDeleteWatchlistItem, deleteWatchlistItemResult] = useDeleteWatchlistItemMutation();
  const [attemptDeleteWatchlist, deleteWatchlistResult] = useDeleteWatchlistMutation();

  // Auto-select a watchlist if able
  if (isWatchlistsLoading == false && watchlists != null && initializedWatchlistSelect == false) {
    setInitializedWatchlistSelect(true);

    if (watchlists.length > 0) {
      const watchlistId = watchlists[0].watchlistId;
      setSelectedWatchlistId(watchlistId);
      return <></>;
    }
  }

  const watchlist = watchlists?.find(w => w.watchlistId == selectedWatchlistId);
  const onWatchlistDeleteItemClicked = (watchlistItem: WatchlistItem) => {
    attemptDeleteWatchlistItem({ watchlistItemId: watchlistItem.watchlistItemId })
      .then(() => {
        if (watchlistItem.instrumentId === selectedInstrumentId)
          setSelectedInstrumentId(undefined);
      });
  }

  const selectProps: SelectProps | undefined = watchlists == null
    ? undefined
    : {
      onSelect: (value: any) => setSelectedWatchlistId(value),
      label: 'Select a Watchlist',
      placeholder: 'Click "+" to create a new Watchlist',
      required: true,
      values: watchlists == null
        ? []
        : watchlists.map(w => ({
          label: w.name,
          value: w.watchlistId
        })),
    };

  if (selectedWatchlistId != null && selectProps != null)
    selectProps.value = selectedWatchlistId;

  return <section className={`page rotate-root`}>
    <div className={`card ${classes.watchlistDisplay} left`}>
      <h2>Watchlists</h2>

      <div className={classes.selectWrapper}>
        <div
          className={classes.addWatchlist}
          onClick={() => setShowAddWatchlistDialog(true)}
          onKeyUp={focusHandler}
          tabIndex={0}
          role='button'
        >
          {IconAdd}
        </div>

        <div
          className={classes.deleteWatchlist}
          onClick={() => {
            if (selectedWatchlistId == null)
              return;

            setShowDeleteWatchlistDialog(true);
          }}
          onKeyUp={focusHandler}
          tabIndex={0}
          role='button'
        >
          {IconCancel}
        </div>

        <div className={classes.selectWatchlist}>
          {selectProps
            ? <Select {...selectProps} />
            : <LoadingBox height={54} />}
        </div>
      </div>

      <WatchlistTable
        watchlistId={selectedWatchlistId!}
        onSelect={(instrumentId: number, ticker: string) => isMobile
          ? navigate(`/instrument/${ticker}`)
          : setSelectedInstrumentId(instrumentId)}
        onDelete={(wi) => onWatchlistDeleteItemClicked(wi)}
      />

      <div
        className={classes.addTicker}
        onClick={() => setShowAddTickerDialog(true)}
        onKeyUp={focusHandler}
        role='button'
        tabIndex={0}
      >
        {IconAdd} Add Ticker
      </div>
    </div>

    {
      <div className={`card ${classes.summary} right`}>
        {
          selectedInstrumentId == null
            ? <h3>Select an instrument to display it's instrument summary</h3>
            : <SmartInstrumentSummary
              instrumentId={selectedInstrumentId}
              displayChart={true}
              onTrade={(instrumentId, ticker) => navigate(`/trade/${ticker}`)}
              onView={(instrumentId, ticker) => navigate(`/instrument/${ticker}`)}
            />
        }
      </div>
    }

    {
      showAddWatchlistDialog && <Prompt
        header={"Add Watchlist"}
        inputLabel={'New Watchlist Name'}
        cancelText='Cancel'
        confirmText='Add'
        onCancel={() => {
          setShowAddWatchlistDialog(false)
        }}
        onConfirm={(watchlistName) => {
          setShowAddWatchlistDialog(false);
          attemptAddWatchlist({
            name: watchlistName
          }).then(result => {
            if ("error" in result)
              return;

            setTimeout(() => setSelectedWatchlistId(result.data), 300);
          });
        }}
      />
    }

    {
      showDeleteWatchlistDialog && <Confirm
        header='Are you sure?'
        confirmText='Delete'
        cancelText='Cancel'
        onCancel={() => setShowDeleteWatchlistDialog(false)}
        onConfirm={() => {
          setShowDeleteWatchlistDialog(false);
          if (selectedWatchlistId == null)
            return;

          attemptDeleteWatchlist({
            watchlistId: selectedWatchlistId!
          }).then(res => {
            setSelectedWatchlistId(null);
            setSelectedInstrumentId(undefined);
          });
        }}
      >
        This will permanently delete "{watchlist!.name}".
        <br />This action is irreversible.
      </Confirm>
    }

    {
      showAddTickerDialog && <Prompt
        header="Add Ticker"
        inputLabel={'Which ticker would you like to add?'}
        confirmText='Add Ticker'
        cancelText='Cancel'
        onCancel={() => setShowAddTickerDialog(false)}
        onConfirm={tickerName => {
          setShowAddTickerDialog(false);

          tickerName = tickerName?.toUpperCase() ?? null;
          const instrumentId = instruments?.find(i => i.ticker == tickerName)?.instrumentId;
          if (tickerName == null || watchlist == null || instrumentId == null)
            return;

          let lastRank = Math.max(...watchlist.watchlistItems.map(i => i.rank));
          if (lastRank <= 0)
            lastRank = 1;

          const newWatchlistItem = {
            instrumentId: instrumentId,
            watchlistId: watchlist.watchlistId,
            rank: lastRank
          };
          attemptAddToWatchlist(newWatchlistItem);
        }}
      />
    }
  </section >;
}

export default WatchlistPage;