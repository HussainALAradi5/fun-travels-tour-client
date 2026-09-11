import { Input, Button, HStack, Text, Icon, Box, VStack, Avatar } from "@chakra-ui/react";
import { Upload, X, FileImage } from "lucide-react";
import { useRef } from "react";
import type { FormFileProps } from "@/interface/props/ui/FormFileProps";

export const FormFile = ({ field, value, onChange }: FormFileProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasImage = typeof value === "string" && value.startsWith("data:image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      onChange(field.name as string, base64String);
    };
    reader.readAsDataURL(file);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(field.name as string, "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Box width="full">
      <Input
        type="file"
        display="none"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        disabled={field.disabled}
      />

      <HStack
        width="full"
        minH="48px"
        py={2}
        px={3}
        borderWidth="1px"
        borderRadius="lg"
        bg="bg.subtle"
        cursor={field.disabled ? "not-allowed" : "pointer"}
        transition="all 0.2s"
        borderStyle={hasImage ? "solid" : "dashed"}
        borderColor={hasImage ? "blue.500" : "border.emphasized"}
        _hover={!field.disabled ? { borderColor: "blue.500", bg: "bg.muted" } : {}}
        onClick={() => !field.disabled && fileInputRef.current?.click()}
        justify="space-between"
      >
        <HStack gap={3} overflow="hidden">
<Avatar.Root size="sm" shape="rounded">
             {hasImage ? (
               <Avatar.Image src={value as string} objectFit="cover" />
             ) : (
               <Avatar.Fallback bg="gray.100" color="gray.500">
                 <FileImage size={16} />
               </Avatar.Fallback>
             )}
          </Avatar.Root>

          <VStack align="start" gap={0} overflow="hidden">
            <Text fontSize="xs" fontWeight="bold" color={hasImage ? "fg.main" : "fg.muted"} truncate>
              {hasImage ? "Photo selected" : field.placeholder || "Upload Image"}
            </Text>
            {hasImage && (
              <Text fontSize="10px" color="blue.500" fontWeight="extrabold" letterSpacing="wider">
                READY TO UPDATE
              </Text>
            )}
          </VStack>
        </HStack>
<HStack>
          {hasImage && !field.disabled ? (
            <Button
              variant="ghost"
              size="2xs"
              onClick={handleClear}
              borderRadius="full"
              colorPalette="red"
            >
              <X size={14} />
            </Button>
          ) : (
            <Icon size="sm" color="gray.400">
              <Upload size={16} />
            </Icon>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};
