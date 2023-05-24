import { WatchlistItem } from "./watchlistItem";

export interface Watchlist {
  watchlistId: number,
  name: string,

  watchlistItems: WatchlistItem[]
}