import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import layout1 from "@/assets/layout-1.jpg";
import layout2 from "@/assets/layout-2.jpg";
import layout3 from "@/assets/layout-3.jpg";

interface LayoutSelectionProps {
  selectedLayout: string | null;
  onLayoutSelect: (layoutId: string) => void;
  onNext: () => void;
  onPrevious: () => void;
}

const layouts = [
  {
    id: "layout-1",
    src: layout1,
    title: "Circular Dining",
    description: "Round table arrangements with centerpieces for intimate dining and conversation."
  },
  {
    id: "layout-2",
    src: layout2,
    title: "Theater Style",
    description: "Traditional rows and columns seating for presentations and ceremonies."
  },
  {
    id: "layout-3",
    src: layout3,
    title: "Lounge Setup",
    description: "Sophisticated lounge area with carpets and cocktail tables for networking events."
  }
];

export const LayoutSelection = ({
  selectedLayout,
  onLayoutSelect,
  onNext,
  onPrevious
}: LayoutSelectionProps) => {
  return (
    <StepContainer
      title="Select Your Layout"
      subtitle="Choose the seating arrangement that best fits your event's purpose and guest interaction style"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedLayout}
      nextLabel="Create My Event"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {layouts.map((layout, index) => (
          <ImageCard
            key={layout.id}
            src={layout.src}
            title={layout.title}
            description={layout.description}
            isSelected={selectedLayout === layout.id}
            onClick={() => onLayoutSelect(layout.id)}
            index={index}
          />
        ))}
      </div>
    </StepContainer>
  );
};