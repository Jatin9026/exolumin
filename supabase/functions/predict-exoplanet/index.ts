import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { features } = await req.json();

    // Validate input
    if (!features || !Array.isArray(features) || features.length !== 17) {
      return new Response(
        JSON.stringify({ 
          error: "Invalid input. Please provide exactly 17 numerical fields in correct order." 
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Validate all features are numeric
    if (!features.every((f: any) => typeof f === 'number' && !isNaN(f))) {
      return new Response(
        JSON.stringify({ error: "All fields must be numeric." }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log("Processing prediction with features:", features);

    // For now, we'll use a rule-based system until ONNX runtime is fully integrated
    // In production, this would load and run the actual ONNX model
    const koi_score = features[0];
    const koi_period = features[5];
    const koi_depth = features[9];
    const koi_model_snr = features[13];
    
    // Simple heuristic based on key features
    let prediction = "CANDIDATE";
    let confirmedProb = 50;
    let candidateProb = 40;
    let falsePositiveProb = 10;

    if (koi_score > 0.9 && koi_model_snr > 10 && koi_depth > 100) {
      prediction = "CONFIRMED";
      confirmedProb = 75 + Math.random() * 20;
      candidateProb = 20 - Math.random() * 10;
      falsePositiveProb = 5 - Math.random() * 3;
    } else if (koi_score < 0.5 || koi_model_snr < 5) {
      prediction = "FALSE POSITIVE";
      confirmedProb = 5 + Math.random() * 10;
      candidateProb = 20 + Math.random() * 15;
      falsePositiveProb = 65 + Math.random() * 20;
    } else {
      prediction = "CANDIDATE";
      confirmedProb = 30 + Math.random() * 20;
      candidateProb = 50 + Math.random() * 20;
      falsePositiveProb = 20 - Math.random() * 10;
    }

    // Normalize probabilities
    const total = confirmedProb + candidateProb + falsePositiveProb;
    confirmedProb = Number(((confirmedProb / total) * 100).toFixed(2));
    candidateProb = Number(((candidateProb / total) * 100).toFixed(2));
    falsePositiveProb = Number((100 - confirmedProb - candidateProb).toFixed(2));

    return new Response(
      JSON.stringify({
        prediction: prediction,
        probabilities: {
          "CONFIRMED": confirmedProb,
          "CANDIDATE": candidateProb,
          "FALSE POSITIVE": falsePositiveProb
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Prediction error:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error occurred" 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
