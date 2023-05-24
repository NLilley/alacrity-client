import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { LocalStorageKeys } from "../../shared/constants";
import StreamingDataService from "../../services/StreamingDataService";
import { VisualizationQuality } from "../enums/client/visualizationQuality";
import { setPerspectiveVisualizationQuality } from "../../utils/perspectiveUtil";

interface ILoginState {
  isLoggedIn: boolean,
  visualisationQuality: VisualizationQuality
}

const initialIsLoggedIn = window.localStorage.getItem(LocalStorageKeys.isLoggedIn) === "true";
const localVisualizationPreference = parseInt(window.localStorage.getItem(LocalStorageKeys.visualizationPreferences) ?? VisualizationQuality.High.toString(), 10);
const initialState: ILoginState = {
  isLoggedIn: initialIsLoggedIn,
  visualisationQuality: localVisualizationPreference
}
setPerspectiveVisualizationQuality(localVisualizationPreference);

// Required so that we can establish a SingalR connection once client has authenticated
let _streamingDataService: StreamingDataService | undefined;
export const registerStreamingDataService = (service: StreamingDataService) => {
  _streamingDataService = service;
  if(initialIsLoggedIn)
    service.start();
}

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
      window.localStorage.setItem(LocalStorageKeys.isLoggedIn, state.isLoggedIn ? "true" : "false");

      // Reload the page to clear client's personal data loaded into redux.
      if (!state.isLoggedIn)
        window.location.reload();
      else
        _streamingDataService?.start();
    },
    setVisualizationQuality(state, action: PayloadAction<VisualizationQuality>) {
      state.visualisationQuality = action.payload;
      setPerspectiveVisualizationQuality(action.payload);
    }
  }
});

export const selectIsLoggedIn = (state: RootState) => state.login.isLoggedIn;
export const selectVisualizationQuality = (state: RootState) => state.login.visualisationQuality;
export const { setLoggedIn, setVisualizationQuality } = loginSlice.actions;

export default loginSlice.reducer;