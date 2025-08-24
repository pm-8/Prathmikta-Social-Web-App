import { useState } from "react";
import { PostCard } from "./PostCard";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

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

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      username: "USER#1282",
      title: "React State Management Issue",
      content: "I'm having trouble with state management in my React app. The component re-renders infinitely when I update the state inside useEffect. Any suggestions on how to fix this?",
      images: ["https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NTYwMTk0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      upvotes: 24,
      comments: 8,
      isUpvoted: false
    },
    {
      id: "2",
      username: "USER#4567",
      title: "CSS Grid Layout Problem",
      content: "Can someone help me understand why my CSS grid items are not aligning properly? I've set grid-template-columns but the items still overflow.",
      upvotes: 15,
      comments: 5,
      isUpvoted: true
    },
    {
      id: "3",
      username: "USER#8901",
      title: "JavaScript Async/Await Error",
      content: "Getting 'Cannot read property of undefined' error when using async/await with fetch API. The data seems to be coming through but something is wrong with my implementation.",
      images: ["https://images.unsplash.com/photo-1650600538903-ec09f670c391?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9ncmFtbWluZyUyMGNvZGUlMjBzY3JlZW58ZW58MXx8fHwxNzU1OTUzMDc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      upvotes: 32,
      comments: 12,
      isUpvoted: false
    },
    {
      id: "4",
      username: "USER#2345",
      title: "TypeScript Generic Types Confusion",
      content: "I'm struggling to understand how to properly use generic types in TypeScript. Specifically when creating reusable components that can work with different data types.",
      upvotes: 19,
      comments: 7,
      isUpvoted: false
    }
  ]);

  const handleUpvote = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              isUpvoted: !post.isUpvoted,
              upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1
            }
          : post
      )
    );
  };

  const handleComment = (postId: string) => {
    console.log("Comment on post:", postId);
  };

  const handleShare = (postId: string) => {
    console.log("Share post:", postId);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onUpvote={handleUpvote}
              onComment={handleComment}
              onShare={handleShare}
            />
          ))}
        </div>
      </div>
      
      {/* Compose Button */}
      <div className="fixed bottom-8 right-8">
        <Button
          onClick={() => onNavigate("compose")}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}