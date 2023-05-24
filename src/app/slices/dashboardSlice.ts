import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from '../store';

export enum DashboardPanelKind {
    Unkown = 0,
    TickerTape = 1,
    Greeter = 2,
    Watchlist = 3,
    TopPositions = 4,
    OpenOrdersSummary = 5
};

export interface DashboardPanel {
    kind: DashboardPanelKind
    options?: any
}

export interface DashboardState {
    panels: DashboardPanel[]
}

const initialState: DashboardState = {
    panels: [
        { kind: DashboardPanelKind.TickerTape },
        { kind: DashboardPanelKind.Greeter },
        { kind: DashboardPanelKind.Watchlist },
        { kind: DashboardPanelKind.TopPositions },
        { kind: DashboardPanelKind.OpenOrdersSummary }
    ]
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: initialState,
    reducers: {
        setPanels(state, action: PayloadAction<DashboardPanel[]>) {
            state.panels = action.payload;
        },
    },
});

export const selectDashboardPanels = (state: RootState) => state.dashboard.panels;

export default dashboardSlice.reducer;
