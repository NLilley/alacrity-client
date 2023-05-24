import { BaseQueryFn, FetchArgs, FetchBaseQueryError, FetchBaseQueryMeta, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { LocalStorageKeys, baseApiUrl } from '../../shared/constants';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { setLoggedIn } from '../slices/loginSlice';
import { TagTypes } from '../enums/api/tagTypes';

const metaBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError,
  {},
  FetchBaseQueryMeta & { dispatch: ThunkDispatch<any, any, any> }
> = async (args, api, extraOptions) => {

  var credentials: RequestCredentials = 'include';
  const fetchRequest = { baseUrl: baseApiUrl, credentials, };
  const baseResult = await fetchBaseQuery(fetchRequest)(
    args, api, extraOptions
  );

  if (baseResult.error && baseResult.error.status === 401) {
    api.dispatch(setLoggedIn(false));
    window.localStorage.setItem(LocalStorageKeys.isLoggedIn, "false");
  }

  return {
    ...baseResult,
    meta: baseResult.meta && { ...baseResult.meta, dispatch: api.dispatch },
  };
}

export const alacrityApi = createApi({
  reducerPath: 'alacrity',
  baseQuery: metaBaseQuery,
  endpoints: () => ({}),
  keepUnusedDataFor: 5 * 60,
  tagTypes: [
    TagTypes.ClientSettings,
    TagTypes.Orders,
    TagTypes.Positions,
    TagTypes.Watchlists,
    TagTypes.WebMessageThreads
  ]
});
