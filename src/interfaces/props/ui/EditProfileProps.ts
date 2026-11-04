import type { ProfileResponseDto } from "@/dtos/user/ProfileResponseDto";

export interface EditProfileProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, unknown>) => Promise<void>;
  loading: boolean;
  initialValues: ProfileResponseDto;
}
