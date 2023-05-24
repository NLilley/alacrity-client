import { TagTypes } from "../enums/api/tagTypes";
import { AddToWatchlistRequest, AddToWatchlistResponse } from "../models/reqres/watchlists/addToWatchlistReqRes";
import { AddWatchlistRequest, AddWatchlistResponse } from "../models/reqres/watchlists/addWatchlistReqRes";
import { DeleteWatchlistItemRequest, DeleteWatchlistItemResponse } from "../models/reqres/watchlists/deleteWatchlistItemReqRes";
import { DeleteWatchlistRequest, DeleteWatchlistResponse } from "../models/reqres/watchlists/deleteWatchlistReqRes";
import { GetWatchlistRequest, GetWatchlistResponse } from "../models/reqres/watchlists/getWatchlistReqRes";
import { Watchlist } from "../models/watchlist";
import { alacrityApi } from "./api";

const watchlistsApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    watchlists: build.query<Watchlist[], Partial<GetWatchlistRequest>>({
      query: (request) => ({
        url: 'watchlists'
      }),
      transformResponse: (res: GetWatchlistResponse) => res.watchlists,
      providesTags: [TagTypes.Watchlists]
    }),
    addWatchlist: build.mutation<number, Partial<AddWatchlistRequest>>({
      query: (request) => ({
        url: 'watchlists',
        method: 'POST',
        body: request
      }),
      transformResponse: (res: AddWatchlistResponse) => res.watchlistId,
      invalidatesTags: [TagTypes.Watchlists]
    }),
    addToWatchlist: build.mutation<AddToWatchlistResponse, Partial<AddToWatchlistRequest>>({
      query: (request) => ({
        url: 'watchlists/item',
        method: 'PUT',
        body: request
      }),
      invalidatesTags: [TagTypes.Watchlists]
    }),
    deleteWatchlist: build.mutation<DeleteWatchlistResponse, Partial<DeleteWatchlistRequest>>({
      query: (request) => ({
        url: 'watchlists',
        method: 'DELETE',
        body: request
      }),
      invalidatesTags: [TagTypes.Watchlists]
    }),
    deleteWatchlistItem: build.mutation<DeleteWatchlistItemResponse, Partial<DeleteWatchlistItemRequest>>({
      query: (request) => ({
        url: 'watchlists/item',
        method: 'DELETE',
        body: request
      }),
      invalidatesTags: [TagTypes.Watchlists]
    })
  })
});

export const { useWatchlistsQuery, useAddWatchlistMutation, useAddToWatchlistMutation, useDeleteWatchlistItemMutation, useDeleteWatchlistMutation } = watchlistsApi;