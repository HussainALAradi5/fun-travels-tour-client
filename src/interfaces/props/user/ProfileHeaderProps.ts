import type { ProfileResponseDto } from "@/dtos/user/ProfileResponseDto";

export interface ProfileHeaderProps {
  user: ProfileResponseDto;
  onEdit: () => void;
}
