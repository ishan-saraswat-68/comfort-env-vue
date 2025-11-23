import { Button } from "@/components/ui/button";

interface TimeSelectorProps {
  selectedHours: number;
  onSelect: (hours: number) => void;
}

const timeOptions = [
  { hours: 1, label: "1H" },
  { hours: 6, label: "6H" },
  { hours: 24, label: "24H" },
  { hours: 168, label: "7D" },
];

export const TimeSelector = ({ selectedHours, onSelect }: TimeSelectorProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {timeOptions.map(({ hours, label }) => (
        <Button
          key={hours}
          onClick={() => onSelect(hours)}
          variant={selectedHours === hours ? "default" : "outline"}
          className={`
            ${selectedHours === hours 
              ? "bg-gradient-cool text-primary-foreground border-0" 
              : "glass-card hover:bg-muted/50"
            }
            transition-all duration-300
          `}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};
