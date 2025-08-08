import { useState } from "react";
import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import stage1 from "/Users/ganesan.kgayathri/Downloads/stage-1.jpg";
import stage2 from "/Users/ganesan.kgayathri/Downloads/stage-2.jpg";
import stage3 from "/Users/ganesan.kgayathri/Downloads/stage-3.jpg";
import stage4 from "/Users/ganesan.kgayathri/Downloads/stage-4.jpg";
import stage5 from "/Users/ganesan.kgayathri/Downloads/stage-5.jpg";
import stage6 from "/Users/ganesan.kgayathri/Downloads/stage-6.jpg";

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
  },
  {
    id: "stage-4",
    src: stage4,
    title: "Bohemian Garden",
    description: "Macrame backdrop with earthy tones and hanging plants for a natural, boho vibe."
  },
  {
    id: "stage-5",
    src: stage5,
    title: "Vintage Garden Party",
    description: "Floral arches with rustic wooden elements perfect for outdoor celebrations."
  },
  {
    id: "stage-6",
    src: stage6,
    title: "Industrial Chic",
    description: "Exposed brick and metal framework with Edison bulbs for an urban loft feel."
  }
];

export const StageSelection = ({
  selectedStage,
  onStageSelect,
  onNext,
  onPrevious,
  showPrevious = true
}: StageSelectionProps) => {
  const [colorFilter, setColorFilter] = useState("original");
  const [showColorPicker, setShowColorPicker] = useState(false);
  return (
    <StepContainer
      title="Choose Your Stage Design"
      subtitle="Select the perfect backdrop that will set the tone for your entire event"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedStage}
      showPrevious={showPrevious}
    >
      <div className="mb-8 flex justify-center">
        <ColorCustomizer
          onColorChange={setColorFilter}
          currentColor={colorFilter}
          isVisible={showColorPicker}
          onToggle={() => setShowColorPicker(!showColorPicker)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {stages.map((stage, index) => (
          <ImageCard
            key={stage.id}
            src={stage.src}
            title={stage.title}
            description={stage.description}
            isSelected={selectedStage === stage.id}
            onClick={() => onStageSelect(stage.id)}
            index={index}
            colorFilter={colorFilter}
          />
        ))}
      </div>
    </StepContainer>
  );
};