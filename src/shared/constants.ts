// NOTE: These numbers MUST match the scss configured variables.
export const mobileBreakPoint = 600;
export const tabletBreakPoint = 1366;

// TODO: Come up with a way to switch between dev and production URLs
// export const baseApiUrl = "https://localhost:8001";
export const baseApiUrl = "/api/";
export const streamingDataUrl = '/central';

export enum LocalStorageKeys {
  isLoggedIn = "isLoggedIn",
  cookiePreferences = "cookiePreferences",
  visualizationPreferences = "visualizationPreferences"
};