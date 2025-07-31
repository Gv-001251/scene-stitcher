import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import stage1 from "@/assets/stage-1.jpg";
import stage2 from "@/assets/stage-2.jpg";
import stage3 from "@/assets/stage-3.jpg";

interface StageSelectionProps {
  selectedStage: string | null;
  onStageSelect: (stageId: string) => void;
  onNext: () => void;
  onPrevious?: () => void;
  showPrevious?: boolean;
}

const stages = [
  {
    id: "stage-1",
    src: stage1,
    title: "Luxurious Purple & Gold",
    description: "Elegant draping with ornate backdrop and sophisticated lighting for a truly regal atmosphere."
  },
  {
    id: "stage-2",
    src: stage2,
    title: "Romantic Pink & Cream",
    description: "Soft rose arrangements with flowing fabrics create a dreamy, romantic ambiance."
  },
  {
    id: "stage-3",
    src: stage3,
    title: "Modern Minimalist",
    description: "Clean lines with contemporary design elements for a sleek, professional look."
  }
];

export const StageSelection = ({
  selectedStage,
  onStageSelect,
  onNext,
  onPrevious,
  showPrevious = true
}: StageSelectionProps) => {
  return (
    <StepContainer
      title="Choose Your Stage Design"
      subtitle="Select the perfect backdrop that will set the tone for your entire event"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedStage}
      showPrevious={showPrevious}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {stages.map((stage, index) => (
          <ImageCard
            key={stage.id}
            src={stage.src}
            title={stage.title}
            description={stage.description}
            isSelected={selectedStage === stage.id}
            onClick={() => onStageSelect(stage.id)}
            index={index}
          />
        ))}
      </div>
    </StepContainer>
  );
};