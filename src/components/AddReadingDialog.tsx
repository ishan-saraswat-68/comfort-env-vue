import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { addReading } from "@/services/api";

interface AddReadingDialogProps {
  onReadingAdded?: () => void;
}

export const AddReadingDialog = ({ onReadingAdded }: AddReadingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const temp = parseFloat(temperature);
    const hum = parseFloat(humidity);

    // Validation
    if (isNaN(temp) || isNaN(hum)) {
      toast.error("Please enter valid numbers");
      return;
    }

    if (temp < -50 || temp > 150) {
      toast.error("Temperature must be between -50°C and 150°C");
      return;
    }

    if (hum < 0 || hum > 100) {
      toast.error("Humidity must be between 0% and 100%");
      return;
    }

    setIsSubmitting(true);
    try {
      await addReading({ temperature: temp, humidity: hum });
      toast.success("Reading added successfully!");
      setOpen(false);
      setTemperature("");
      setHumidity("");
      onReadingAdded?.();
    } catch (error) {
      toast.error((error as Error).message || "Failed to add reading");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Reading
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Reading</DialogTitle>
            <DialogDescription>
              Enter temperature and humidity values to add a new reading.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="temperature">Temperature (°C)</Label>
              <Input
                id="temperature"
                type="number"
                step="0.1"
                placeholder="e.g., 22.5"
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Valid range: -50°C to 150°C
              </p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="humidity">Humidity (%)</Label>
              <Input
                id="humidity"
                type="number"
                step="0.1"
                placeholder="e.g., 55"
                value={humidity}
                onChange={(e) => setHumidity(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Valid range: 0% to 100%
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Reading"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
