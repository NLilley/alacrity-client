import { TagTypes } from "../enums/api/tagTypes";
import { GetWebMessageThreadsRequest, GetWebMessageThreadsResponse } from "../models/reqres/webMessages/getWebMessageThreadsReqRes";
import { SetMessageReadRequest, SetMessageReadResponse } from "../models/reqres/webMessages/setMessageReadReqRes";
import { SetMessageFinalizedRequest, SetMessageFinalizedResponse } from "../models/reqres/webMessages/setMessagefinalizedReqRes";
import { SubmitMessageRequest, SubmitMessageResponse } from "../models/reqres/webMessages/submitMessage";
import { WebMessageThread } from "../models/webMessage";
import { alacrityApi } from "./api";

const webMessageApi = alacrityApi.injectEndpoints({
  endpoints: (build) => ({
    webMessageThreads: build.query<WebMessageThread[], Partial<GetWebMessageThreadsRequest>>({
      query: (request) => ({
        url: 'webmessages'
      }),
      transformResponse: (res: GetWebMessageThreadsResponse) => res.webMessageThreads,
      providesTags: [TagTypes.WebMessageThreads]
    }),
    submitMessage: build.mutation<SubmitMessageResponse, SubmitMessageRequest>({
      query: (request) => ({
        url: 'webmessages',
        method: 'POST',
        body: request
      }),
      invalidatesTags: [TagTypes.WebMessageThreads]
    }),
    setMessageRead: build.mutation<SetMessageReadResponse, Partial<SetMessageReadRequest>>({
      query: (request) => ({
        url: 'webmessages/read',
        method: 'PUT',
        body: request
      }),
      invalidatesTags: [TagTypes.WebMessageThreads]
    }),
    setMessageFinalized: build.mutation<SetMessageFinalizedResponse, Partial<SetMessageFinalizedRequest>>({
      query: (request) => ({
        url: 'webmessages/finalized',
        method: 'PUT',
        body: request
      }),
      invalidatesTags: [TagTypes.WebMessageThreads]
    })
  })
});

export const { 
  useWebMessageThreadsQuery, 
  useSubmitMessageMutation,
  useSetMessageReadMutation, 
  useSetMessageFinalizedMutation 
} = webMessageApi;
