import { useState } from "react";
import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import ceiling1 from "@/assets/ceiling-1.jpg";
import ceiling2 from "@/assets/ceiling-2.jpg";
import ceiling3 from "/Users/ganesan.kgayathri/Downloads/ceiling-3.jpg";
import ceiling4 from "/Users/ganesan.kgayathri/Downloads/ceiling-4.jpg";
import ceiling5 from "/Users/ganesan.kgayathri/Downloads/ceiling-5.jpg";
import ceiling6 from "/Users/ganesan.kgayathri/Downloads/ceiling-6.jpg";

interface CeilingSelectionProps {
  selectedCeiling: string | null;
  onCeilingSelect: (ceilingId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const ceilings = [
  {
    id: "ceiling-1",
    src: ceiling1,
    title: "Floral Elegance",
    description: "Hanging floral arrangements with draped fabric and crystal accents create a luxurious overhead display."
  },
  {
    id: "ceiling-2",
    src: ceiling2,
    title: "Fairy Light Romance",
    description: "Soft fabric draping with delicate fairy lights for a magical, dreamy atmosphere above."
  },
  {
    id: "ceiling-3",
    src: ceiling3,
    title: "Contemporary Lines",
    description: "Modern geometric patterns with sleek lighting fixtures for a sophisticated ceiling design."
  },
  {
    id: "ceiling-4",
    src: ceiling4,
    title: "Tropical Bamboo",
    description: "Natural bamboo installation with palm leaves for a resort-style tropical ambiance."
  },
  {
    id: "ceiling-5",
    src: ceiling5,
    title: "Art Deco Glamour",
    description: "Geometric metallic patterns with vintage 1920s inspired decorations and gold accents."
  },
  {
    id: "ceiling-6",
    src: ceiling6,
    title: "Rustic Barn",
    description: "Exposed wooden beams with mason jar lights for a charming farmhouse aesthetic."
  }
];

export const CeilingSelection = ({
  selectedCeiling,
  onCeilingSelect,
  onNext,
  onPrevious
}: CeilingSelectionProps) => {
  const [colorFilter, setColorFilter] = useState("original");
  const [showColorPicker, setShowColorPicker] = useState(false);
  return (
    <StepContainer
      title="Select Your Ceiling Design"
      subtitle="Add the perfect finishing touch overhead to complete your venue's atmosphere"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedCeiling}
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
        {ceilings.map((ceiling, index) => (
          <ImageCard
            key={ceiling.id}
            src={ceiling.src}
            title={ceiling.title}
            description={ceiling.description}
            isSelected={selectedCeiling === ceiling.id}
            onClick={() => onCeilingSelect(ceiling.id)}
            index={index}
            colorFilter={colorFilter}
          />
        ))}
      </div>
    </StepContainer>
  );
};