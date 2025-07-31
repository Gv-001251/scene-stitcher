import { useState } from "react";
import { ProgressBar } from "@/components/ProgressBar";
import { StageSelection } from "@/components/steps/StageSelection";
import { CeilingSelection } from "@/components/steps/CeilingSelection";
import { ChairSelection } from "@/components/steps/ChairSelection";
import { LayoutSelection } from "@/components/steps/LayoutSelection";
import { FinalResult } from "@/components/FinalResult";

const steps = ["Stage Design", "Ceiling Style", "Chair Selection", "Layout"];

export const EventDesigner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState({
    stage: null as string | null,
    ceiling: null as string | null,
    chairs: null as string | null,
    layout: null as string | null,
  });

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(steps.length); // Move to final result
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartAgain = () => {
    setCurrentStep(0);
    setSelections({
      stage: null,
      ceiling: null,
      chairs: null,
      layout: null,
    });
  };

  const handleStageSelect = (stageId: string) => {
    setSelections(prev => ({ ...prev, stage: stageId }));
  };

  const handleCeilingSelect = (ceilingId: string) => {
    setSelections(prev => ({ ...prev, ceiling: ceilingId }));
  };

  const handleChairsSelect = (chairsId: string) => {
    setSelections(prev => ({ ...prev, chairs: chairsId }));
  };

  const handleLayoutSelect = (layoutId: string) => {
    setSelections(prev => ({ ...prev, layout: layoutId }));
  };

  // Show final result
  if (currentStep >= steps.length) {
    return (
      <FinalResult
        selections={selections}
        onStartAgain={handleStartAgain}
      />
    );
  }

  return (
    <div className="min-h-screen">
      {/* Progress Bar */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <ProgressBar
          currentStep={currentStep}
          totalSteps={steps.length}
          steps={steps}
        />
      </div>

      {/* Step Content */}
      {currentStep === 0 && (
        <StageSelection
          selectedStage={selections.stage}
          onStageSelect={handleStageSelect}
          onNext={handleNext}
          showPrevious={false}
        />
      )}

      {currentStep === 1 && (
        <CeilingSelection
          selectedCeiling={selections.ceiling}
          onCeilingSelect={handleCeilingSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 2 && (
        <ChairSelection
          selectedChairs={selections.chairs}
          onChairsSelect={handleChairsSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}

      {currentStep === 3 && (
        <LayoutSelection
          selectedLayout={selections.layout}
          onLayoutSelect={handleLayoutSelect}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
};