import { useCallback, useEffect, useState } from "react";
import { toaster } from "@/components/ui/toaster";
import type { ProfileResponseDto } from "@/dtos/user/ProfileResponseDto";
import type { UserUpdateRequestDto } from "@/dtos/user/UserUpdateRequestDto";
import { profileService } from "@/services/user/profileService";
import type { ProfileFormValues } from "@/types/user/ProfileFormValues";
import { useAuth } from "@/utilities/AuthContext";

/** Loads the profile page in one request and saves self-service edits, then refreshes the session user. */
export function useProfile() {
  const { refreshUser } = useAuth();
  const [profile, setProfile] = useState<ProfileResponseDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const refresh = useCallback(async () => {
    try {
      setProfile(await profileService.getMine());
    } catch {
      setProfile(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const save = async (formValues: Record<string, unknown>) => {
    const values = formValues as ProfileFormValues;
    const request: UserUpdateRequestDto = {
      name: values.name,
      gender: values.gender,
      mobileNumber: values.mobileNumber,
      age: values.age === undefined || values.age === "" ? undefined : Number(values.age),
      base64Image: values.removeImage ? undefined : values.base64Image || undefined,
      removeImage: Boolean(values.removeImage),
    };
    setIsSubmitting(true);
    try {
      setProfile(await profileService.updateMine(request));
      await refreshUser();
      setIsEditOpen(false);
      toaster.create({ title: "Profile updated successfully", type: "success" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return { profile, loading, refresh, isEditOpen, setIsEditOpen, isSubmitting, save };
}
