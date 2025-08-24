import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { HomePage } from "./components/HomePage";
import { ComposePage } from "./components/ComposePage";
import { ProfilePage } from "./components/ProfilePage";
import { MyPostsPage } from "./components/MyPostsPage";
import { Toaster } from "./components/ui/sonner";

interface Post {
  id: string;
  username: string;
  title: string;
  content: string;
  images?: string[];
  upvotes: number;
  comments: number;
  isUpvoted: boolean;
  status?: "pending" | "working" | "solved";
  createdAt: string;
  lastUpdated: string;
  isMyPost?: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  
  // All posts for the homepage feed
  const [allPosts, setAllPosts] = useState<Post[]>([
    {
      id: "1",
      username: "USER#1282",
      title: "Potholes on Main Street Need Urgent Repair",
      content: "The road on Main Street between blocks 15-18 has developed several large potholes that are causing damage to vehicles and creating safety hazards for pedestrians. This has been an ongoing issue for the past 3 months.",
      images: ["https://images.unsplash.com/photo-1740440902073-90e0e72c699f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9rZW4lMjByb2FkJTIwaW5mcmFzdHJ1Y3R1cmV8ZW58MXx8fHwxNzU2MDIwMDU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      upvotes: 24,
      comments: 8,
      isUpvoted: false,
      createdAt: "2024-01-15",
      lastUpdated: "2024-01-20",
      isMyPost: false
    },
    {
      id: "2",
      username: "USER#4567",
      title: "Street Lights Not Working in Residential Area",
      content: "Most of the street lights in Sector 7 have been non-functional for weeks now. This is creating safety concerns, especially for women and elderly residents walking at night.",
      upvotes: 15,
      comments: 5,
      isUpvoted: true,
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-22",
      isMyPost: false
    },
    {
      id: "3",
      username: "USER#8901",
      title: "Irregular Garbage Collection in Our Locality",
      content: "Garbage collection trucks have not been visiting our area (Block C, Phase 2) regularly. The waste is piling up and creating unhygienic conditions. We need a permanent solution for consistent waste management.",
      images: ["https://images.unsplash.com/photo-1637681262973-a516e647e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwY29sbGVjdGlvbiUyMHdhc3RlJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTYwMjAwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      upvotes: 32,
      comments: 12,
      isUpvoted: false,
      createdAt: "2024-01-20",
      lastUpdated: "2024-01-20",
      isMyPost: false
    },
    {
      id: "4",
      username: "USER#2345",
      title: "Water Supply Issues in Morning Hours",
      content: "Our neighborhood has been experiencing low water pressure and irregular supply during morning hours (6-10 AM). This affects daily routines and is particularly problematic for families with children.",
      upvotes: 19,
      comments: 7,
      isUpvoted: false,
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-25",
      isMyPost: false
    }
  ]);

  // User's own posts for My Reports section
  const [myPosts, setMyPosts] = useState<Post[]>([
    {
      id: "my-1",
      username: "USER#1282",
      title: "Broken Street Light Near School",
      content: "The street light near Green Valley Elementary School has been flickering and completely went out yesterday evening. This creates a safety hazard for children walking home after evening activities.",
      upvotes: 12,
      comments: 3,
      isUpvoted: false,
      status: "pending",
      createdAt: "2024-01-22",
      lastUpdated: "2024-01-22",
      isMyPost: true
    },
    {
      id: "my-2", 
      username: "USER#1282",
      title: "Water Logging After Rain in Housing Complex",
      content: "Our housing complex experiences severe water logging during monsoon season. The drainage system seems inadequate and water stagnates for hours, making it difficult to walk and creating mosquito breeding grounds.",
      images: ["https://images.unsplash.com/photo-1637681262973-a516e647e826?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXJiYWdlJTIwY29sbGVjdGlvbiUyMHdhc3RlJTIwbWFuYWdlbWVudHxlbnwxfHx8fDE3NTYwMjAwNjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"],
      upvotes: 8,
      comments: 5,
      isUpvoted: false,
      status: "working",
      createdAt: "2024-01-18",
      lastUpdated: "2024-01-21",
      isMyPost: true
    },
    {
      id: "my-3",
      username: "USER#1282", 
      title: "Bus Stop Bench Repair Request",
      content: "The bench at the bus stop on Oak Avenue has a broken leg and is unsafe to sit on. Many elderly residents use this stop daily and need proper seating while waiting for buses.",
      upvotes: 15,
      comments: 2,
      isUpvoted: false,
      status: "solved",
      createdAt: "2024-01-10",
      lastUpdated: "2024-01-20",
      isMyPost: true
    }
  ]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleUpvote = (postId: string) => {
    setAllPosts(prevPosts =>
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

  const handleCreatePost = (title: string, content: string, images: string[]) => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newPost: Post = {
      id: Date.now().toString(),
      username: "USER#1282", // Current user's username
      title,
      content,
      images: images.length > 0 ? images : undefined,
      upvotes: 0,
      comments: 0,
      isUpvoted: false,
      status: "pending",
      createdAt: currentDate,
      lastUpdated: currentDate,
      isMyPost: true
    };

    // Add to both all posts (for homepage) and my posts (for reports)
    setAllPosts(prev => [newPost, ...prev]);
    setMyPosts(prev => [newPost, ...prev]);
  };

  const handleDeleteMyPost = (postId: string) => {
    setMyPosts(prev => prev.filter(post => post.id !== postId));
    setAllPosts(prev => prev.filter(post => post.id !== postId));
  };

  const handleUpdateMyPost = (postId: string, updates: Partial<Post>) => {
    const updatedPost = { ...updates, lastUpdated: new Date().toISOString().split('T')[0] };
    
    setMyPosts(prev => 
      prev.map(post => post.id === postId ? { ...post, ...updatedPost } : post)
    );
    setAllPosts(prev => 
      prev.map(post => post.id === postId ? { ...post, ...updatedPost } : post)
    );
  };

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <HomePage 
            onNavigate={handleNavigate}
            posts={allPosts}
            onUpvote={handleUpvote}
            onComment={handleComment}
            onShare={handleShare}
          />
        );
      case "compose":
        return (
          <ComposePage 
            onNavigate={handleNavigate}
            onCreatePost={handleCreatePost}
          />
        );
      case "profile":
        return <ProfilePage onNavigate={handleNavigate} />;
      case "posts":
        return (
          <MyPostsPage 
            onNavigate={handleNavigate}
            posts={myPosts}
            onDeletePost={handleDeleteMyPost}
            onUpdatePost={handleUpdateMyPost}
          />
        );
      default:
        return (
          <HomePage 
            onNavigate={handleNavigate}
            posts={allPosts}
            onUpvote={handleUpvote}
            onComment={handleComment}
            onShare={handleShare}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onNavigate={handleNavigate} />
      {renderPage()}
      <Toaster />
    </div>
  );
}