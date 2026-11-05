import type { Gender } from "@/enums/Gender";

/** Values produced by the profile edit form. */
export interface ProfileFormValues {
  name?: string;
  gender?: Gender;
  mobileNumber?: string;
  age?: number | string;
  base64Image?: string;
  removeImage?: boolean;
}
