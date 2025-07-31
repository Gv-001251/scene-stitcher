import { useState } from "react";
import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import chairs1 from "@/assets/chairs-1.jpg";
import chairs2 from "@/assets/chairs-2.jpg";
import chairs3 from "@/assets/chairs-3.jpg";
import chairs4 from "@/assets/chairs-4.jpg";
import chairs5 from "@/assets/chairs-5.jpg";
import chairs6 from "@/assets/chairs-6.jpg";

interface ChairSelectionProps {
  selectedChairs: string | null;
  onChairsSelect: (chairsId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const chairs = [
  {
    id: "chairs-1",
    src: chairs1,
    title: "White Chiavari Elegance",
    description: "Classic white chiavari chairs with ivory covers and gold sashes for timeless sophistication."
  },
  {
    id: "chairs-2",
    src: chairs2,
    title: "Gold Luxury",
    description: "Glamorous gold chiavari chairs with elegant cushions for an opulent, premium feel."
  },
  {
    id: "chairs-3",
    src: chairs3,
    title: "Modern Acrylic",
    description: "Contemporary transparent ghost chairs for a sleek, minimalist aesthetic."
  },
  {
    id: "chairs-4",
    src: chairs4,
    title: "Bohemian Peacock",
    description: "Rattan peacock chairs with colorful bohemian cushions for a vintage boho vibe."
  },
  {
    id: "chairs-5",
    src: chairs5,
    title: "Rustic Wooden",
    description: "Vintage wooden folding chairs with ivory cushions for a charming farmhouse style."
  },
  {
    id: "chairs-6",
    src: chairs6,
    title: "Velvet Luxury",
    description: "Plush velvet upholstered armchairs in rich jewel tones for ultimate comfort and elegance."
  }
];

export const ChairSelection = ({
  selectedChairs,
  onChairsSelect,
  onNext,
  onPrevious
}: ChairSelectionProps) => {
  const [colorFilter, setColorFilter] = useState("original");
  const [showColorPicker, setShowColorPicker] = useState(false);
  return (
    <StepContainer
      title="Choose Your Chair Style"
      subtitle="Select the seating that matches your event's style and comfort requirements"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedChairs}
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
        {chairs.map((chair, index) => (
          <ImageCard
            key={chair.id}
            src={chair.src}
            title={chair.title}
            description={chair.description}
            isSelected={selectedChairs === chair.id}
            onClick={() => onChairsSelect(chair.id)}
            index={index}
            colorFilter={colorFilter}
          />
        ))}
      </div>
    </StepContainer>
  );
};