import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const LightCurve = () => {
  // Mock data for demonstration - in production, this would come from actual observations
  const generateMockData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const time = i * 0.1;
      const baseline = 1.0;
      const noise = (Math.random() - 0.5) * 0.002;
      const transit = time > 4 && time < 6 ? -0.01 * Math.sin((time - 4) * Math.PI / 2) : 0;
      data.push({
        time: time,
        flux: baseline + noise + transit,
      });
    }
    return data;
  };

  const data = generateMockData();

  return (
    <Card className="p-8 bg-card/50 backdrop-blur-sm border-primary/20">
      <h3 className="text-2xl font-bold mb-6">Light Curve Analysis</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Normalized brightness over time showing the characteristic dip when an exoplanet transits in front of its star.
      </p>
      
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            label={{ value: 'Time (days)', position: 'insideBottom', offset: -5 }}
            stroke="hsl(var(--foreground))"
          />
          <YAxis 
            label={{ value: 'Normalized Flux', angle: -90, position: 'insideLeft' }}
            stroke="hsl(var(--foreground))"
            domain={[0.985, 1.005]}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'hsl(var(--card))', 
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="flux" 
            stroke="hsl(var(--accent))" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
      
      <div className="mt-6 p-4 bg-secondary/50 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong>Note:</strong> This is a simulated light curve for demonstration. 
          In production, actual observation data would be displayed here.
        </p>
      </div>
    </Card>
  );
};

export default LightCurve;
