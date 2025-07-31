import { useState } from "react";
import { Palette, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ColorCustomizerProps {
  onColorChange: (color: string) => void;
  currentColor: string;
  isVisible: boolean;
  onToggle: () => void;
}

const colorPresets = [
  { name: "Original", value: "original", bg: "bg-gradient-to-r from-purple-500 to-pink-500" },
  { name: "Royal Blue", value: "hue-rotate-180", bg: "bg-gradient-to-r from-blue-600 to-indigo-600" },
  { name: "Emerald", value: "hue-rotate-90", bg: "bg-gradient-to-r from-emerald-500 to-teal-500" },
  { name: "Sunset", value: "hue-rotate-45", bg: "bg-gradient-to-r from-orange-500 to-red-500" },
  { name: "Rose Gold", value: "hue-rotate-15 saturate-150", bg: "bg-gradient-to-r from-rose-400 to-pink-400" },
  { name: "Lavender", value: "hue-rotate-270", bg: "bg-gradient-to-r from-purple-400 to-violet-400" },
  { name: "Forest", value: "hue-rotate-120 saturate-125", bg: "bg-gradient-to-r from-green-600 to-green-500" },
  { name: "Midnight", value: "hue-rotate-240 brightness-75", bg: "bg-gradient-to-r from-slate-700 to-slate-600" },
];

export const ColorCustomizer = ({ onColorChange, currentColor, isVisible, onToggle }: ColorCustomizerProps) => {
  const [selectedColor, setSelectedColor] = useState(currentColor);

  const handleColorSelect = (colorValue: string) => {
    setSelectedColor(colorValue);
    onColorChange(colorValue);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="lg"
        onClick={onToggle}
        className={cn(
          "group transition-all duration-300",
          isVisible && "bg-primary text-primary-foreground"
        )}
      >
        <Palette className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
        Customize Colors
      </Button>

      {isVisible && (
        <div className="absolute top-full mt-4 left-0 right-0 bg-card border rounded-xl shadow-elegant p-6 animate-fade-in z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-foreground">Choose Color Theme</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleColorSelect("original")}
              className="group"
            >
              <RotateCcw className="w-4 h-4 mr-1 transition-transform group-hover:rotate-180" />
              Reset
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {colorPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleColorSelect(preset.value)}
                className={cn(
                  "relative p-3 rounded-lg text-center transition-all duration-300 hover:scale-105",
                  preset.bg,
                  selectedColor === preset.value
                    ? "ring-2 ring-white shadow-hover"
                    : "hover:shadow-card"
                )}
              >
                <div className="text-white text-xs font-medium drop-shadow-md">
                  {preset.name}
                </div>
                {selectedColor === preset.value && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                  </div>
                )}
              </button>
            ))}
          </div>
          
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Color effects will be applied to curtains, draping, and decorative elements
          </p>
        </div>
      )}
    </div>
  );
};