import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ImageCardProps {
  src: string;
  title: string;
  description: string;
  isSelected?: boolean;
  onClick: () => void;
  index?: number;
}

export const ImageCard = ({
  src,
  title,
  description,
  isSelected = false,
  onClick,
  index = 0
}: ImageCardProps) => {
  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-500 animate-fade-in",
        "transform hover:scale-105 hover:-translate-y-2"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-xl shadow-card hover:shadow-hover transition-all duration-300",
          "border-2 transition-colors",
          isSelected
            ? "border-primary shadow-elegant ring-4 ring-primary/20"
            : "border-transparent hover:border-primary/50"
        )}
      >
        <div className="aspect-video w-full relative overflow-hidden">
          <img
            src={src}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            )}
          />
          {isSelected && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-elegant animate-scale-in">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
        <div className="p-6 bg-card">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};