import { cn } from "@/lib/utils";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

export const ProgressBar = ({ currentStep, totalSteps, steps }: ProgressBarProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className={cn(
              "flex items-center space-x-2 flex-1",
              index !== totalSteps - 1 && "relative"
            )}
          >
            <div
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                index < currentStep
                  ? "bg-gradient-primary text-white shadow-elegant"
                  : index === currentStep
                  ? "bg-gradient-elegant text-white shadow-hover animate-pulse"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {index + 1}
            </div>
            <span
              className={cn(
                "text-xs font-medium transition-colors duration-300 hidden sm:inline",
                index <= currentStep ? "text-foreground" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
            {index !== totalSteps - 1 && (
              <div className="flex-1 h-1 mx-2 rounded-full bg-muted relative overflow-hidden">
                <div
                  className={cn(
                    "h-full bg-gradient-primary transition-all duration-500 ease-in-out",
                    index < currentStep ? "w-full" : "w-0"
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <p className="text-sm text-muted-foreground">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>
    </div>
  );
};