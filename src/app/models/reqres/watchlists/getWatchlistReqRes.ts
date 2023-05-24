import { Watchlist } from "../../watchlist";

export interface GetWatchlistRequest { }
export interface GetWatchlistResponse {
  watchlists: Watchlist[]
}