import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Upload, X, Edit } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface Post {
  id: string;
  title: string;
  content: string;
  images?: string[];
  status?: "pending" | "working" | "solved";
}

interface EditPostDialogProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
  onSave: (postId: string, updates: Partial<Post>) => void;
}

export function EditPostDialog({ isOpen, onClose, post, onSave }: EditPostDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImages(post.images || []);
    }
  }, [post]);

  const handleImageUpload = () => {
    // In a real app, this would handle actual file upload
    // For now, we'll add a placeholder image
    const placeholderImage = "https://images.unsplash.com/photo-1568716353609-12ddc5c67f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwY29kaW5nJTIwcHJvYmxlbXxlbnwxfHx8fDE3NTYwMTk0MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";
    setImages(prev => [...prev, placeholderImage]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (!post || !title.trim() || !content.trim()) {
      alert("Please fill in both title and content");
      return;
    }

    onSave(post.id, {
      title: title.trim(),
      content: content.trim(),
      images: images.length > 0 ? images : undefined
    });

    onClose();
  };

  const handleCancel = () => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImages(post.images || []);
    }
    onClose();
  };

  if (!post) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edit Issue Report
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Issue Title</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a clear, descriptive title for the civic issue"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-content">Issue Description</Label>
            <Textarea
              id="edit-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe the civic issue in detail..."
              className="min-h-32 resize-y"
            />
          </div>

          <div className="space-y-3">
            <Label>Evidence Photos</Label>
            <p className="text-sm text-muted-foreground">Add photos to help municipal authorities understand the issue better</p>
            <Button
              type="button"
              variant="outline"
              onClick={handleImageUpload}
              className="flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Add Photo
            </Button>
            
            {images.length > 0 && (
              <div className="grid grid-cols-1 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <ImageWithFallback
                      src={image}
                      alt={`Evidence ${index + 1}`}
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
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!title.trim() || !content.trim()}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}