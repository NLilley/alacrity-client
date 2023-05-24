import { useNavigate } from "react-router";
import { useWatchlistsQuery } from "../../../app/api/watchlistsApi";
import WatchlistTable from "../../components/smart/watchlist-table/WatchlistTable";
import LoadingBox from "../../../controls/loading-box/LoadingBox";

export interface WatchlistPanelProps { };

const WatchlistPanel = (props: WatchlistPanelProps) => {
  const navigate = useNavigate();
  const { isLoading: isWatchlistsLoading, data: watchlists } = useWatchlistsQuery({});

  if (isWatchlistsLoading || watchlists == null)
    return <LoadingBox height={300}/>

  const firstWatchlist = watchlists[0];

  return <div className="card">
    <h2>{
      firstWatchlist != null
        ? <span>{firstWatchlist.name}</span>
        : <span>You have no watchlists</span>
    }</h2>

    {
      firstWatchlist != null && <WatchlistTable
        watchlistId={firstWatchlist.watchlistId}
        onSelect={(instrumentId, ticker) => navigate(`/instrument/${ticker}`)}
      />
    }
  </div>
};

export default WatchlistPanel;