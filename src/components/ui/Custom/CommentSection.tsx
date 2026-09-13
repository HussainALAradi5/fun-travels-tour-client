import { VStack, Box, Center, Icon, Text } from "@chakra-ui/react";
import { MessageSquare } from "lucide-react";
import { CommentHeader } from "./Comment/CommentHeader";
import { CommentItemDisplay } from "./Comment/CommentItemDisplay";
import { CommentInputArea } from "./Comment/CommentInputArea";
import type { CommentSectionProps } from "@/interface/props/ui/CommentSectionProps";


export const CommentSection = ({
  comments,
  currentUserId,
  onAddComment,
  onEditComment,
  title = "Discussion",
  emptyMessage = "No comments yet. Start the discussion!",
  isReadOnly = false
}: CommentSectionProps) => {
  return (
    <Box bg="bg.panel" p={6} borderRadius="3xl" borderWidth="1px" shadow="md" display="flex" flexDirection="column" h="full" minH="600px">

      <CommentHeader title={title} count={comments.length} />

      <Box flex="1" overflowY="auto" mb={6} pr={2}>
        <VStack align="stretch" gap={6}>
          {comments.length === 0 ? (
            <Center h="300px" color="fg.muted" flexDir="column" gap={4}>
              <Box p={6} bg="gray.50" _dark={{ bg: "whiteAlpha.50" }} borderRadius="full">
                <Icon size="2xl" opacity={0.3} as={MessageSquare} />
              </Box>
              <Text fontSize="sm" fontWeight="medium">{emptyMessage}</Text>
            </Center>
          ) : (
            comments.map(comment => (
              <CommentItemDisplay
                key={comment.id}
                comment={comment}
                isReadOnly={isReadOnly}
                isMe={String(comment.authorId) === String(currentUserId)}
                onEdit={onEditComment}
              />
            ))
          )}
        </VStack>
      </Box>

      <CommentInputArea isReadOnly={isReadOnly} onAdd={onAddComment} />
    </Box>
  );
};
