export interface ChangePasswordRequest {
  existingPassword: string,
  newPassword: string
}

export interface ChangePasswordResponse {
  succeeded: boolean
  errorMessage: string,
}