import { useState } from "react";
import { Flex, VStack, HStack, Box, Text, Center, Icon, IconButton, Textarea, Button } from "@chakra-ui/react";
import { User, Pencil, X, Check } from "lucide-react";
import type { CommentItemDisplayProps } from "@/interface/props/ui/CommentItemDisplayProps";

export const CommentItemDisplay = ({ comment, isMe, isReadOnly, onEdit }: CommentItemDisplayProps) => {
  const [isEditingLocal, setIsEditingLocal] = useState(false);
  const [editValue, setEditValue] = useState(comment.content);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!onEdit) return;
    setLoading(true);
    await onEdit(comment.id, editValue);
    setLoading(false);
    setIsEditingLocal(false);
  };

  return (
    <Flex 
      direction={isMe ? "row-reverse" : "row"} 
      gap={3} align="flex-end"
      transition="transform 0.2s ease"
      _hover={{ transform: "translateY(-2px)" }}
    >
      {!isMe && (
        <Center w={9} h={9} borderRadius="full" bg="blue.50" color="blue.500" borderWidth="1px" borderColor="blue.100" flexShrink={0} shadow="sm">
          <Icon size="xs" as={User}/>
        </Center>
      )}
      
      <VStack align={isMe ? "flex-end" : "flex-start"} gap={1} maxW="85%">
        <HStack fontSize="11px" color="fg.muted" gap={2} px={1}>
          {!isMe && <Text fontWeight="bold" color="blue.600">{comment.authorName}</Text>}
          <Text opacity={0.8}>{new Date(comment.createdAt).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' })}</Text>
          {isMe && !isEditingLocal && !isReadOnly && onEdit && (
            <IconButton size="xs" variant="ghost" aria-label="Edit" color="blue.500" onClick={() => setIsEditingLocal(true)}>
              <Pencil size={12}/>
            </IconButton>
          )}
        </HStack>

        {isEditingLocal ? (
          <Box w="full" bg="bg.subtle" p={3} borderRadius="2xl" borderWidth="2px" borderColor="blue.400">
            <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} size="sm" rows={2} mb={2} resize="none" autoFocus variant="subtle" />
            <HStack justify="flex-end" gap={2}>
              <Button size="xs" variant="ghost" onClick={() => setIsEditingLocal(false)}><Icon as={X} size="xs" /> Cancel</Button>
              <Button size="xs" colorPalette="blue" onClick={handleUpdate} loading={loading} borderRadius="lg"><Icon as={Check} size="xs" /> Update</Button>
            </HStack>
          </Box>
        ) : (
          <Box 
            bg={isMe ? "blue.500" : "white"} _dark={{ bg: isMe ? "blue.600" : "whiteAlpha.100" }}
            color={isMe ? "white" : "fg.emphasized"} p={4} borderRadius="2xl" borderWidth={isMe ? "0" : "1px"} 
            borderColor="border.subtle" shadow="sm" borderTopRightRadius={isMe ? "4px" : "2xl"} borderTopLeftRadius={!isMe ? "4px" : "2xl"}
            _hover={{ shadow: "md", borderColor: isMe ? "transparent" : "blue.300", bg: isMe ? "blue.600" : "blue.50/30" }}
          >
            <Text fontSize="sm" lineHeight="tall" whiteSpace="pre-wrap">{comment.content}</Text>
            {comment.updatedAt && <Text fontSize="10px" mt={1} opacity={0.6} textAlign={isMe ? "right" : "left"}>Edited</Text>}
          </Box>
        )}
      </VStack>
    </Flex>
  );
};