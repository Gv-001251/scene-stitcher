import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import ceiling1 from "@/assets/ceiling-1.jpg";
import ceiling2 from "@/assets/ceiling-2.jpg";
import ceiling3 from "@/assets/ceiling-3.jpg";

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
  }
];

export const CeilingSelection = ({
  selectedCeiling,
  onCeilingSelect,
  onNext,
  onPrevious
}: CeilingSelectionProps) => {
  return (
    <StepContainer
      title="Select Your Ceiling Design"
      subtitle="Add the perfect finishing touch overhead to complete your venue's atmosphere"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedCeiling}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {ceilings.map((ceiling, index) => (
          <ImageCard
            key={ceiling.id}
            src={ceiling.src}
            title={ceiling.title}
            description={ceiling.description}
            isSelected={selectedCeiling === ceiling.id}
            onClick={() => onCeilingSelect(ceiling.id)}
            index={index}
          />
        ))}
      </div>
    </StepContainer>
  );
};