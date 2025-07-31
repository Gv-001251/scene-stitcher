import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface StepContainerProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  onNext?: () => void;
  onPrevious?: () => void;
  isNextDisabled?: boolean;
  nextLabel?: string;
  showPrevious?: boolean;
}

export const StepContainer = ({
  title,
  subtitle,
  children,
  onNext,
  onPrevious,
  isNextDisabled = false,
  nextLabel = "Next",
  showPrevious = true
}: StepContainerProps) => {
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            {title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        <div className="animate-slide-in-right">
          {children}
        </div>

        <div className="flex justify-between items-center mt-12 max-w-4xl mx-auto">
          {showPrevious && onPrevious ? (
            <Button
              variant="outline"
              size="lg"
              onClick={onPrevious}
              className="group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {onNext && (
            <Button
              variant="event"
              size="xl"
              onClick={onNext}
              disabled={isNextDisabled}
              className="group"
            >
              {nextLabel}
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};