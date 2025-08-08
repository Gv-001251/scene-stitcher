import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { api } from "@/services/api";

interface FinalResultProps {
  selections: {
    stage: string | null;
    ceiling: string | null;
    chairs: string | null;
    layout: string | null;
  };
  onStartAgain: () => void;
}

export const FinalResult = ({ selections, onStartAgain }: FinalResultProps) => {
  const [isStitching, setIsStitching] = useState(true);
  const [stitchedImage, setStitchedImage] = useState<string | null>(null);

  useEffect(() => {
    const stitchImages = async () => {
      setIsStitching(true);
      
      try {
        // Convert selections to image filenames
        const layers = [
          selections.stage ? `${selections.stage}.jpg` : null,
          selections.ceiling ? `${selections.ceiling}.jpg` : null,
          selections.chairs ? `${selections.chairs}.jpg` : null,
          selections.layout ? `${selections.layout}.jpg` : null,
        ].filter(Boolean) as string[];

        if (layers.length === 0) {
          throw new Error('No images selected');
        }

        // Map layout selection to arrangement style
        const layoutToArrangement: Record<string, 'theater' | 'lounge' | 'banquet'> = {
          'layout-1': 'banquet',  // Circular Dining -> banquet
          'layout-2': 'theater',  // Theater Style -> theater
          'layout-3': 'lounge',   // Lounge Setup -> lounge
          'layout-4': 'lounge',   // Cocktail Party -> lounge
          'layout-5': 'lounge',   // Garden Party Mix -> lounge
          'layout-6': 'banquet',  // Banquet Hall -> banquet
        };

        const arrangement = selections.layout ? layoutToArrangement[selections.layout] || 'theater' : 'theater';

        // Call the backend API with arrangement style
        const imageBlob = await api.composeImages(layers, arrangement);
        
        // Convert blob to data URL for display
        const imageUrl = URL.createObjectURL(imageBlob);
        setStitchedImage(imageUrl);
        
        toast.success("Your personalized event design is ready!");
      } catch (error) {
        console.error('Error stitching images:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to create design');
      } finally {
        setIsStitching(false);
      }
    };

    stitchImages();
  }, [selections]);

  const handleDownload = () => {
    if (stitchedImage) {
      const link = document.createElement('a');
      link.href = stitchedImage;
      link.download = 'event-design.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Your event design has been downloaded!");
    } else {
      toast.error("No design available to download");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Custom Event Design',
        text: 'Check out my personalized event setup!',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  if (isStitching) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="mb-8">
            <Sparkles className="w-24 h-24 text-primary mx-auto animate-float" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Creating Your Perfect Event
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            We're stitching together your selected elements to create a stunning personalized event design...
          </p>
          <div className="w-64 h-2 bg-muted rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-primary rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            Your Dream Event Design
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Congratulations! Your personalized event setup is complete and ready to bring your vision to life.
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12 animate-scale-in">
          <div className="relative overflow-hidden rounded-2xl shadow-elegant bg-card">
            {stitchedImage && (
              <img
                src={stitchedImage}
                alt="Your personalized event design"
                className="w-full h-auto"
              />
            )}
            <div className="absolute top-4 right-4 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-semibold shadow-elegant">
              Custom Design
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12 animate-slide-in-right">
          {[
            { label: "Stage Design", value: selections.stage },
            { label: "Ceiling Style", value: selections.ceiling },
            { label: "Chair Type", value: selections.chairs },
            { label: "Layout", value: selections.layout }
          ].map((item, index) => (
            <div key={index} className="bg-card rounded-xl p-6 shadow-card hover:shadow-hover transition-all duration-300">
              <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
              <p className="text-sm text-muted-foreground capitalize">
                {item.value?.replace('-', ' ') || 'Not selected'}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
          <Button
            variant="elegant"
            size="lg"
            onClick={handleDownload}
            className="w-full sm:w-auto group"
          >
            <Download className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            Download Design
          </Button>
          
          <Button
            variant="gold"
            size="lg"
            onClick={handleShare}
            className="w-full sm:w-auto group"
          >
            <Share2 className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
            Share Design
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onStartAgain}
            className="w-full sm:w-auto group"
          >
            <RotateCcw className="w-4 h-4 mr-2 transition-transform group-hover:rotate-180" />
            Start Again
          </Button>
        </div>
      </div>
    </div>
  );
};