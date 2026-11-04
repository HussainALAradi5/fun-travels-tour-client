/** Mirrors the server UserUpdateRequest: self-service profile fields only. */
export interface UserUpdateRequest {
  name?: string;
  mobileNumber?: string;
  age?: number;
  base64Image?: string;
  removeImage?: boolean;
}
