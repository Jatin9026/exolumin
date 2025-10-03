import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertCircle, XCircle } from "lucide-react";

interface PredictionResultsProps {
  prediction: string;
  probabilities: {
    CONFIRMED: number;
    CANDIDATE: number;
    "FALSE POSITIVE": number;
  };
}

const PredictionResults = ({ prediction, probabilities }: PredictionResultsProps) => {
  const getIcon = () => {
    switch (prediction) {
      case "CONFIRMED":
        return <CheckCircle2 className="w-12 h-12 text-accent" />;
      case "CANDIDATE":
        return <AlertCircle className="w-12 h-12 text-primary" />;
      default:
        return <XCircle className="w-12 h-12 text-muted-foreground" />;
    }
  };

  const getStatusColor = () => {
    switch (prediction) {
      case "CONFIRMED":
        return "bg-accent text-accent-foreground";
      case "CANDIDATE":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">{getIcon()}</div>
        <Badge className={`text-lg px-6 py-2 ${getStatusColor()}`}>
          {prediction}
        </Badge>
        <p className="text-xl mt-4 text-muted-foreground">
          This candidate has a{" "}
          <span className="text-accent font-bold text-2xl">
            {probabilities.CONFIRMED.toFixed(1)}%
          </span>{" "}
          probability of being an exoplanet.
        </p>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-semibold mb-4">Probability Distribution</h3>
        
        {Object.entries(probabilities).map(([label, value]) => (
          <div key={label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{label}</span>
              <span className="text-muted-foreground">
                {value.toFixed(1)}%
              </span>
            </div>
            <Progress value={value} className="h-3" />
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-secondary/50 rounded-lg">
        <h4 className="font-semibold mb-2">What does this mean?</h4>
        <p className="text-sm text-muted-foreground">
          {prediction === "CONFIRMED" &&
            "This candidate shows strong evidence of being an actual exoplanet based on the model's analysis."}
          {prediction === "CANDIDATE" &&
            "This object requires further observation to confirm its status as an exoplanet."}
          {prediction === "FALSE POSITIVE" &&
            "This signal is likely caused by stellar activity or instrument noise rather than an exoplanet."}
        </p>
      </div>
    </Card>
  );
};

export default PredictionResults;
