import { useState } from "react";
import { toaster } from "@/components/ui/toaster";
import type { User } from "@/interfaces/user/User";
import type { UserUpdateRequest } from "@/interfaces/user/UserUpdateRequest";
import { userService } from "@/services/user/userService";
import type { ProfileFormValues } from "@/types/user/ProfileFormValues";
import { authUtils } from "@/utilities/AuthUtils";

/** Saves self-service profile changes and refreshes the stored session user. */
export function useProfileEditor(user: User | null, refreshUser: () => Promise<void>) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const save = async (formValues: Record<string, unknown>) => {
    if (!user?.id) return;
    const values = formValues as ProfileFormValues;
    const payload: UserUpdateRequest = {
      name: values.name,
      mobileNumber: values.mobileNumber,
      age: values.age === undefined || values.age === "" ? undefined : Number(values.age),
      base64Image: values.removeImage ? undefined : values.base64Image || undefined,
      removeImage: Boolean(values.removeImage),
    };
    setIsSubmitting(true);
    try {
      const updated = await userService.updateUser(Number(user.id), payload);
      authUtils.saveSession(authUtils.getToken() || "", updated);
      await refreshUser();
      setIsEditOpen(false);
      toaster.create({ title: "Profile updated successfully", type: "success" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isEditOpen, setIsEditOpen, isSubmitting, save };
}
