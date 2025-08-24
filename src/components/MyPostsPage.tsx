import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { ChevronUp, MessageCircle, Share2, Trash2, Upload, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface MyPost {
  id: string;
  title: string;
  content: string;
  images?: string[];
  upvotes: number;
  comments: number;
  status: "pending" | "working" | "solved";
  createdAt: string;
  lastUpdated: string;
}

interface MyPostsPageProps {
  onNavigate: (page: string) => void;
}

export function MyPostsPage({ onNavigate }: MyPostsPageProps) {
  const [posts, setPosts] = useState<MyPost[]>([
    {
      id: "1",
      title: "React State Management Issue",
      content: "I'm having trouble with state management in my React app. The component re-renders infinitely when I update the state inside useEffect. Any suggestions on how to fix this?",
      images: ["https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NTYwMTk0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      upvotes: 24,
      comments: 8,
      status: "solved",
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20"
    },
    {
      id: "2",
      title: "CSS Grid Layout Problem",
      content: "Can someone help me understand why my CSS grid items are not aligning properly? I've set grid-template-columns but the items still overflow.",
      upvotes: 15,
      comments: 5,
      status: "working",
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-22"
    },
    {
      id: "3",
      title: "JavaScript Async/Await Error",
      content: "Getting 'Cannot read property of undefined' error when using async/await with fetch API. The data seems to be coming through but something is wrong with my implementation.",
      upvotes: 32,
      comments: 12,
      status: "pending",
      createdAt: "2024-01-20",
      lastUpdated: "2024-01-20"
    },
    {
      id: "4",
      title: "TypeScript Generic Types Confusion",
      content: "I'm struggling to understand how to properly use generic types in TypeScript. Specifically when creating reusable components that can work with different data types.",
      upvotes: 19,
      comments: 7,
      status: "solved",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-25"
    }
  ]);

  const getStatusIcon = (status: MyPost["status"]) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "working":
        return <AlertCircle className="w-4 h-4" />;
      case "solved":
        return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: MyPost["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "working":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "solved":
        return "bg-green-100 text-green-800 border-green-300";
    }
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const handleReuploadPost = (postId: string) => {
    // In a real app, this would create a new post based on the solved one
    console.log("Reuploading post:", postId);
    alert("Post has been prepared for re-upload. You can modify it in the compose page.");
    onNavigate("compose");
  };

  const filterPostsByStatus = (status: MyPost["status"]) => {
    return posts.filter(post => post.status === status);
  };

  const PostCard = ({ post }: { post: MyPost }) => (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium mb-2">{post.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className={`${getStatusColor(post.status)} flex items-center gap-1`}
              >
                {getStatusIcon(post.status)}
                {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{post.content}</p>
        
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-1 gap-3">
            {post.images.map((image, index) => (
              <ImageWithFallback
                key={index}
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
          <span>Updated: {new Date(post.lastUpdated).toLocaleDateString()}</span>
        </div>
      </CardContent>
      
      <CardFooter className="pt-3 border-t border-border">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <ChevronUp className="w-4 h-4" />
              <span>{post.upvotes}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MessageCircle className="w-4 h-4" />
              <span>{post.comments}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </div>
          </div>
          
          {post.status === "solved" && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReuploadPost(post.id)}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Re-upload
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete your post
                      and remove it from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-destructive hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="mb-2">My Posts</h1>
          <p className="text-muted-foreground">
            Manage your posts and track their status
          </p>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              All ({posts.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({filterPostsByStatus("pending").length})
            </TabsTrigger>
            <TabsTrigger value="working">
              Working ({filterPostsByStatus("working").length})
            </TabsTrigger>
            <TabsTrigger value="solved">
              Solved ({filterPostsByStatus("solved").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't created any posts yet.</p>
                <Button onClick={() => onNavigate("compose")}>
                  Create Your First Post
                </Button>
              </div>
            ) : (
              posts.map(post => <PostCard key={post.id} post={post} />)
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterPostsByStatus("pending").map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            {filterPostsByStatus("pending").length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pending posts.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="working" className="space-y-4">
            {filterPostsByStatus("working").map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            {filterPostsByStatus("working").length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts currently being worked on.</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="solved" className="space-y-4">
            {filterPostsByStatus("solved").map(post => (
              <PostCard key={post.id} post={post} />
            ))}
            {filterPostsByStatus("solved").length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No solved posts yet.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}