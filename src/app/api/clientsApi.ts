import { TagTypes } from "../enums/api/tagTypes";
import { Client } from "../models/client";
import { ClientSettings } from "../models/clientSettings";
import { SetClientSettingRequest, SetClientSettingResponse } from "../models/reqres/client/SetClientSettingReqRes";
import { GetClientRequest, GetClientResponse } from "../models/reqres/client/getClientReqRes";
import { GetClientSettingsRequest, GetClientSettingsResponse } from "../models/reqres/client/getClientSettingsReqRes";
import { alacrityApi } from "./api";

const clientsApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    client: build.query<Client, Partial<GetClientRequest>>({
      query: (request) => ({
        url: 'clients'
      }),
      transformResponse: (res: GetClientResponse) => res.client
    }),
    clientSettings: build.query<ClientSettings, Partial<GetClientSettingsRequest>>({
      query: (request) => ({
        url: 'clients/settings'
      }),
      transformResponse: (res: GetClientSettingsResponse) => res.clientSettings,
      providesTags: [TagTypes.ClientSettings]
    }),
    setClientSetting: build.mutation<SetClientSettingResponse, Partial<SetClientSettingRequest>>({
      query: (request) => ({
        url: '/clients/settings',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: [TagTypes.ClientSettings]
    })
  })
});

export const { useClientQuery, useClientSettingsQuery, useSetClientSettingMutation } = clientsApi;