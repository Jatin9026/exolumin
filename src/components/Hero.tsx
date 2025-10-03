import { Telescope } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6">
          <Telescope className="w-16 h-16 text-primary animate-pulse" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-cosmic bg-clip-text text-transparent">
          A World Away
        </h1>
        <p className="text-xl md:text-2xl text-foreground/90 mb-4 max-w-3xl mx-auto">
          Hunting for Exoplanets with AI
        </p>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload candidate data and let our trained Random Forest model identify potential exoplanets 
          with precision and clarity.
        </p>
      </div>
    </section>
  );
};

export default Hero;
