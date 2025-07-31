import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import chairs1 from "@/assets/chairs-1.jpg";
import chairs2 from "@/assets/chairs-2.jpg";
import chairs3 from "@/assets/chairs-3.jpg";

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
  }
];

export const ChairSelection = ({
  selectedChairs,
  onChairsSelect,
  onNext,
  onPrevious
}: ChairSelectionProps) => {
  return (
    <StepContainer
      title="Choose Your Chair Style"
      subtitle="Select the seating that matches your event's style and comfort requirements"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedChairs}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {chairs.map((chair, index) => (
          <ImageCard
            key={chair.id}
            src={chair.src}
            title={chair.title}
            description={chair.description}
            isSelected={selectedChairs === chair.id}
            onClick={() => onChairsSelect(chair.id)}
            index={index}
          />
        ))}
      </div>
    </StepContainer>
  );
};