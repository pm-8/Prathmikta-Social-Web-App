import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { MessageCircle, Send } from "lucide-react";

interface Comment {
  id: string;
  username: string;
  content: string;
  timestamp: string;
}

interface CommentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  postId: string;
}

export function CommentDialog({ isOpen, onClose, postTitle, postId }: CommentDialogProps) {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      username: "USER#4567",
      content: "This is indeed a serious issue. I've noticed the same problem in our area as well.",
      timestamp: "2 hours ago"
    },
    {
      id: "2", 
      username: "USER#8901",
      content: "Have you tried contacting the municipal office directly? Sometimes direct communication helps speed up the process.",
      timestamp: "1 hour ago"
    },
    {
      id: "3",
      username: "USER#2345", 
      content: "+1 for this issue. It's affecting multiple residents in the neighborhood.",
      timestamp: "45 minutes ago"
    }
  ]);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      username: "USER#1282", // Current user
      content: newComment.trim(),
      timestamp: "Just now"
    };

    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleAddComment();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            Comments
          </DialogTitle>
          <DialogDescription className="line-clamp-2">
            {postTitle}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-4 py-4">
          {comments.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No comments yet. Be the first to comment!</p>
            </div>
          ) : (
            comments.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-xs">
                    {comment.username.slice(-4)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium">{comment.username}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>

        <DialogFooter className="border-t pt-4">
          <div className="flex w-full gap-2">
            <Textarea
              placeholder="Write a comment... (Ctrl+Enter to send)"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={handleKeyPress}
              className="min-h-10 max-h-20 resize-none"
            />
            <Button 
              onClick={handleAddComment} 
              disabled={!newComment.trim()}
              size="sm"
              className="self-end"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}