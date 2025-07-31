import { useState } from "react";
import { ImageCard } from "@/components/ImageCard";
import { StepContainer } from "@/components/StepContainer";
import { ColorCustomizer } from "@/components/ColorCustomizer";
import layout1 from "@/assets/layout-1.jpg";
import layout2 from "@/assets/layout-2.jpg";
import layout3 from "@/assets/layout-3.jpg";
import layout4 from "@/assets/layout-4.jpg";
import layout5 from "@/assets/layout-5.jpg";
import layout6 from "@/assets/layout-6.jpg";

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
  },
  {
    id: "layout-4",
    src: layout4,
    title: "Cocktail Party",
    description: "High-top tables with bar stools perfect for networking and social gatherings."
  },
  {
    id: "layout-5",
    src: layout5,
    title: "Garden Party Mix",
    description: "Mixed outdoor seating with picnic tables and benches for casual celebrations."
  },
  {
    id: "layout-6",
    src: layout6,
    title: "Banquet Hall",
    description: "Long rectangular tables in formal banquet style for gala dinners and awards ceremonies."
  }
];

export const LayoutSelection = ({
  selectedLayout,
  onLayoutSelect,
  onNext,
  onPrevious
}: LayoutSelectionProps) => {
  const [colorFilter, setColorFilter] = useState("original");
  const [showColorPicker, setShowColorPicker] = useState(false);
  return (
    <StepContainer
      title="Select Your Layout"
      subtitle="Choose the seating arrangement that best fits your event's purpose and guest interaction style"
      onNext={onNext}
      onPrevious={onPrevious}
      isNextDisabled={!selectedLayout}
      nextLabel="Create My Event"
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
        {layouts.map((layout, index) => (
          <ImageCard
            key={layout.id}
            src={layout.src}
            title={layout.title}
            description={layout.description}
            isSelected={selectedLayout === layout.id}
            onClick={() => onLayoutSelect(layout.id)}
            index={index}
            colorFilter={colorFilter}
          />
        ))}
      </div>
    </StepContainer>
  );
};