export interface AddToWatchlistRequest {
  watchlistId: number,
  instrumentId: number,
  rank: number
}
export interface AddToWatchlistResponse {
  watchlistItemId: number
}