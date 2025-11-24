import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TimeSelectorProps {
  selectedHours: number;
  onSelect: (hours: number) => void;
}

const timeOptions = [
  { hours: 1, label: "1H" },
  { hours: 6, label: "6H" },
  { hours: 24, label: "24H" },
  { hours: 168, label: "7D" },
  { hours: 720, label: "30D" },
];

export const TimeSelector = ({ selectedHours, onSelect }: TimeSelectorProps) => {
  const currentIndex = timeOptions.findIndex(opt => opt.hours === selectedHours);
  const currentOption = timeOptions[currentIndex] || timeOptions[2]; // Default to 24H if not found

  const handleUp = () => {
    if (currentIndex < timeOptions.length - 1) {
      onSelect(timeOptions[currentIndex + 1].hours);
    }
  };

  const handleDown = () => {
    if (currentIndex > 0) {
      onSelect(timeOptions[currentIndex - 1].hours);
    }
  };

  return (
    <div className="flex items-center gap-3 px-1">
      <div className="flex flex-col items-end min-w-[3rem]">
        <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Range</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentOption.label}
            initial={{ y: 5, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -5, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="text-2xl font-bold font-heading text-primary tabular-nums leading-none"
          >
            {currentOption.label}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex flex-col gap-0.5 border-l border-border/50 pl-2">
        <button
          onClick={handleUp}
          disabled={currentIndex === timeOptions.length - 1}
          className="p-0.5 hover:bg-primary/10 text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
          aria-label="Increase time range"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={handleDown}
          disabled={currentIndex === 0}
          className="p-0.5 hover:bg-primary/10 text-muted-foreground hover:text-primary disabled:opacity-30 disabled:hover:bg-transparent transition-colors active:scale-95"
          aria-label="Decrease time range"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
