import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { ArrowLeft, Upload, X } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ComposePageProps {
  onNavigate: (page: string) => void;
}

export function ComposePage({ onNavigate }: ComposePageProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  const handleImageUpload = () => {
    // In a real app, this would handle actual file upload
    // For now, we'll add a placeholder image
    const placeholderImage = "https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NTYwMTk0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    setImages(prev => [...prev, placeholderImage]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleCompose = () => {
    if (!title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }
    
    // In a real app, this would send the post to a backend
    console.log("Composing post:", { title, content, images });
    alert("Post created successfully!");
    
    // Reset form and navigate back
    setTitle("");
    setContent("");
    setImages([]);
    onNavigate("home");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => onNavigate("home")}
            className="flex items-center gap-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Create a New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Problem Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear, descriptive title for your problem"
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Problem Description</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Describe your problem in detail. Include what you've tried, what you expected to happen, and what actually happened."
                className="w-full min-h-32 resize-y"
              />
            </div>

            <div className="space-y-3">
              <Label>Images</Label>
              <Button
                type="button"
                variant="outline"
                onClick={handleImageUpload}
                className="flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Add Image
              </Button>
              
              {images.length > 0 && (
                <div className="grid grid-cols-1 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative">
                      <ImageWithFallback
                        src={image}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full p-0"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={handleCompose}
                className="flex-1"
                disabled={!title.trim() || !content.trim()}
              >
                Compose Post
              </Button>
              <Button
                variant="outline"
                onClick={() => onNavigate("home")}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}