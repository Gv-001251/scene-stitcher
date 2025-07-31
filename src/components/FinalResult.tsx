import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, Share2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

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
    // Simulate image stitching process
    const stitchImages = async () => {
      setIsStitching(true);
      
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // For now, we'll use one of the stage images as the final result
      // In a real implementation, this would combine all selected images
      const stageMap: Record<string, string> = {
        'stage-1': '/src/assets/stage-1.jpg',
        'stage-2': '/src/assets/stage-2.jpg',
        'stage-3': '/src/assets/stage-3.jpg'
      };
      
      setStitchedImage(stageMap[selections.stage || 'stage-1']);
      setIsStitching(false);
      toast.success("Your personalized event design is ready!");
    };

    stitchImages();
  }, [selections]);

  const handleDownload = () => {
    toast.success("Your event design has been downloaded!");
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