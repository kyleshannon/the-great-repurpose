import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const KIT_FORM_ID = '9103025';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, lowest_dimension, archetype } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const KIT_API_KEY = Deno.env.get('KIT_API_KEY');
    if (!KIT_API_KEY) {
      throw new Error('KIT_API_KEY is not configured');
    }

    // Subscribe to Kit Form 9103025 via API v3
    const response = await fetch(`https://api.convertkit.com/v3/forms/${KIT_FORM_ID}/subscribe`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_secret: KIT_API_KEY,
        email: email.trim().toLowerCase(),
        fields: {
          lowest_dimension: lowest_dimension || '',
          archetype: archetype || '',
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('KIT API error:', JSON.stringify(data));
      // Don't block the user — log and return soft success
      return new Response(JSON.stringify({ success: false, kit_error: data }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
