export interface LoginRequest {
  userName: string,
  password: string
}

export interface LoginResponse {
  succeeded: boolean,
  status?: number,
  error?: string
}