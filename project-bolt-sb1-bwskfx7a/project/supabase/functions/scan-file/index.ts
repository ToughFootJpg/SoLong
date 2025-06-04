import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "npm:@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};

const VIRUSTOTAL_API_KEY = Deno.env.get("VIRUSTOTAL_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  try {
    const supabase = createClient(
      SUPABASE_URL || "",
      SUPABASE_SERVICE_ROLE_KEY || ""
    );

    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Method not allowed" }),
        {
          status: 405,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Get the formData
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return new Response(
        JSON.stringify({ error: "No file provided" }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    // VirusTotal API endpoint for file scanning
    const vtApiUrl = "https://www.virustotal.com/api/v3/files";

    // Create a FormData object for VirusTotal API
    const vtFormData = new FormData();
    vtFormData.append("file", file);

    // Call VirusTotal API to scan the file
    const vtResponse = await fetch(vtApiUrl, {
      method: "POST",
      headers: {
        "x-apikey": VIRUSTOTAL_API_KEY || "",
      },
      body: vtFormData,
    });

    if (!vtResponse.ok) {
      const errorText = await vtResponse.text();
      throw new Error(`VirusTotal API error: ${errorText}`);
    }

    const vtData = await vtResponse.json();
    const analysisId = vtData.data.id;

    // Wait for the analysis to complete (real implementation would use polling or webhooks)
    // For simplicity, we'll add a small delay and then get the analysis result
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Get analysis results
    const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${analysisId}`;
    const analysisResponse = await fetch(analysisUrl, {
      headers: {
        "x-apikey": VIRUSTOTAL_API_KEY || "",
      },
    });

    if (!analysisResponse.ok) {
      const errorText = await analysisResponse.text();
      throw new Error(`VirusTotal analysis error: ${errorText}`);
    }

    const analysisData = await analysisResponse.json();
    const stats = analysisData.data.attributes.stats;
    
    // Determine if file is clean (no malicious detections)
    const isClean = stats.malicious === 0 && stats.suspicious === 0;
    const totalScans = Object.values(stats).reduce((a: number, b: number) => a + b, 0);

    return new Response(
      JSON.stringify({
        isClean,
        detections: stats.malicious + stats.suspicious,
        totalScans,
        scanId: analysisId,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error scanning file:", error);
    
    return new Response(
      JSON.stringify({ error: "Failed to scan file" }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});