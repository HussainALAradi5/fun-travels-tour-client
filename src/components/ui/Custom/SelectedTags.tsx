import { HStack, Badge, Box } from "@chakra-ui/react";
import { X } from "lucide-react";
import type { SelectedTagsProps } from "@/interface/props/ui/SelectedTagsProps";

export const SelectedTags = ({ values, options, onRemove }: SelectedTagsProps) => {
  if (values.length === 0) return null;

  return (
    <HStack wrap="wrap" gap={2} mb={2}>
      {values.map((val) => {
        const item = options.find((i) => String(i.value) === String(val));

        return (
          <Badge
            key={val}
            colorPalette="blue"
            variant="subtle"
            px={2}
            py={1}
            borderRadius="md"
            display="flex"
            alignItems="center"
            gap={1.5}
            animation="fade-in 0.2s ease-out"
          >
            {item?.label || val}

            <Box
              as="span"
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(val);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onRemove(val);
                }
              }}
              display="inline-flex"
              alignItems="center"
              justifyContent="center"
              cursor="pointer"
              borderRadius="full"
              transition="all 0.2s"
              _hover={{
                color: "red.500",
                bg: "blackAlpha.100",
                transform: "scale(1.1)"
              }}
            >
              <X size={12} strokeWidth={2.5} />
            </Box>
          </Badge>
        );
      })}
    </HStack>
  );
};
