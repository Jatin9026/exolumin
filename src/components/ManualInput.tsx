import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ManualInputProps {
  onSubmit: (features: number[]) => void;
}

const featureLabels = [
  "KOI Score",
  "FP Flag NT",
  "FP Flag SS",
  "FP Flag CO",
  "FP Flag EC",
  "Period (days)",
  "Time0 BK",
  "Impact Parameter",
  "Duration (hours)",
  "Depth (ppm)",
  "Planet Radius (Earth radii)",
  "Equilibrium Temp (K)",
  "Insolation Flux",
  "Model SNR",
  "Stellar Effective Temp (K)",
  "Stellar Surface Gravity",
  "Stellar Radius (Solar radii)",
];

const ManualInput = ({ onSubmit }: ManualInputProps) => {
  const [features, setFeatures] = useState<string[]>(Array(17).fill(""));

  const handleInputChange = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericFeatures = features.map(f => parseFloat(f));
    
    if (numericFeatures.some(isNaN)) {
      alert("Please fill in all fields with valid numbers.");
      return;
    }
    
    onSubmit(numericFeatures);
  };

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
      <h3 className="text-2xl font-bold mb-6 text-center">Manual Input</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {featureLabels.map((label, index) => (
            <div key={index}>
              <Label htmlFor={`feature-${index}`} className="text-sm">
                {label}
              </Label>
              <Input
                id={`feature-${index}`}
                type="number"
                step="any"
                value={features[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="mt-1"
                placeholder="Enter value"
              />
            </div>
          ))}
        </div>
        
        <Button type="submit" className="w-full mt-6" size="lg">
          Predict with Manual Input
        </Button>
      </form>
    </Card>
  );
};

export default ManualInput;
