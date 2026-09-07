import { Box, Textarea, HStack, Button, Alert } from "@chakra-ui/react";
import { Send, Lock } from "lucide-react";
import { useState } from "react";

interface Props {
  isReadOnly: boolean;
  onAdd: (content: string) => Promise<void>;
}

export const CommentInputArea = ({ isReadOnly, onAdd }: Props) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePost = async () => {
    if (!text.trim()) return;
    setLoading(true);
    await onAdd(text);
    setText("");
    setLoading(false);
  };

  if (isReadOnly) {
    return (
      <Alert.Root 
        status="info" 
        variant="subtle" 
        borderRadius="2xl" 
        py={4} 
        borderWidth="1px" 
        // Use semantic colors for border and background
        borderColor="blue.500/20"
        bg="blue.50/50"
        _dark={{ 
          bg: "blue.950/30", 
          borderColor: "blue.800/50",
          color: "blue.200" 
        }}
      >
        <Alert.Indicator>
          <Lock size={18} />
        </Alert.Indicator>
        <Alert.Content>
          <Alert.Title fontWeight="bold">Comment Locked</Alert.Title>
          <Alert.Description fontSize="xs" opacity={0.9}>
            This request is complete. No further responses can be sent.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  return (
    <Box 
      p={1} 
      bg="white" 
      _dark={{ bg: "bg.panel" }} 
      borderRadius="2xl" 
      borderWidth="2px" 
      borderColor="transparent" 
      transition="all 0.2s" 
      _focusWithin={{ borderColor: "blue.400", shadow: "lg" }}
    >
      <Textarea 
        placeholder="Write a message..." 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        rows={2} 
        px={4} 
        pt={4} 
        resize="none" 
        variant="flushed" 
        fontSize="sm" 
      />
      <HStack justify="flex-end" p={2}>
        <Button 
          size="sm" 
          colorPalette="blue" 
          disabled={!text.trim()} 
          onClick={handlePost} 
          loading={loading} 
          borderRadius="xl" 
          px={6} 
          shadow="0 4px 12px rgba(49, 130, 206, 0.2)"
        >
          <Send size={14} style={{marginRight: '8px'}}/> Send Message
        </Button>
      </HStack>
    </Box>
  );
};