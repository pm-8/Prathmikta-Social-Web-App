import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronUp, MessageCircle, Share2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Post {
  id: string;
  username: string;
  title: string;
  content: string;
  images?: string[];
  upvotes: number;
  comments: number;
  isUpvoted: boolean;
}

interface PostCardProps {
  post: Post;
  onUpvote: (postId: string) => void;
  onComment: (postId: string) => void;
  onShare: (postId: string) => void;
}

export function PostCard({ post, onUpvote, onComment, onShare }: PostCardProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <span className="text-sm font-medium">
              {post.username.slice(0, 2).toUpperCase()}
            </span>
          </div>
          <div>
            <p className="font-medium">{post.username}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">{post.title}</h3>
          <p className="text-muted-foreground">{post.content}</p>
        </div>
        
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {post.images.map((image, index) => (
              <ImageWithFallback
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onUpvote(post.id)}
            className={`flex items-center gap-2 transition-colors ${
              post.isUpvoted 
                ? 'text-primary hover:text-primary/80' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <ChevronUp className={`w-4 h-4 ${post.isUpvoted ? 'fill-current' : ''}`} />
            <span>{post.upvotes}</span>
          </button>
          
          <button
            onClick={() => onComment(post.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </button>
          
          <button
            onClick={() => onShare(post.id)}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}