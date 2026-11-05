import { Badge } from "@chakra-ui/react";
import { Mars, Venus } from "lucide-react";
import { GenderColor, GenderLabel } from "@/enums/Gender";
import type { GenderBadgeProps } from "@/interfaces/props/user/GenderBadgeProps";

/** One colored pill with the gender's icon and name: blue for male, pink for female. */
export const GenderBadge = ({ gender, size = "sm" }: GenderBadgeProps) => {
  if (!gender) return null;
  const GenderIcon = gender === "MALE" ? Mars : Venus;
  return (
    <Badge colorPalette={GenderColor[gender]} variant="subtle" size={size} borderRadius="full" gap={1}
      aria-label={`Gender: ${GenderLabel[gender]}`}>
      <GenderIcon size={12} strokeWidth={2.5} />
      {GenderLabel[gender]}
    </Badge>
  );
};
