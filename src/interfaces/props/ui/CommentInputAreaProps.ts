export interface CommentInputAreaProps {
  isReadOnly?: boolean;
  onAdd: (content: string) => void | Promise<void>;
}
