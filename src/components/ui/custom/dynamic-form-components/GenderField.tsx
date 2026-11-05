import { Button, HStack } from "@chakra-ui/react";
import { Mars, Venus } from "lucide-react";
import { Gender, GenderColor, GenderLabel } from "@/enums/Gender";
import type { GenderFieldProps } from "@/interfaces/props/ui/GenderFieldProps";

const OPTIONS = [Gender.MALE, Gender.FEMALE];

/** Male / female choice for DynamicForm, each option in its badge color with its icon. */
export function GenderField({ field, value, onChange }: GenderFieldProps) {
  return (
    <HStack role="radiogroup" aria-label={field.label} gap={3} w="100%">
      {OPTIONS.map((gender) => {
        const selected = value === gender;
        const GenderIcon = gender === Gender.MALE ? Mars : Venus;
        return (
          <Button key={gender} role="radio" aria-checked={selected} flex={1} size="lg" borderRadius="xl"
            colorPalette={selected ? GenderColor[gender] : "gray"} variant={selected ? "subtle" : "outline"}
            borderWidth="1.5px" borderColor={selected ? `${GenderColor[gender]}.500` : undefined}
            disabled={field.disabled} onClick={() => onChange(field.name as string, gender)}>
            <GenderIcon size={18} />
            {GenderLabel[gender]}
          </Button>
        );
      })}
    </HStack>
  );
}
