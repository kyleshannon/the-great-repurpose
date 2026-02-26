import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const KIT_FORM_ID = '9103025';

const ARCHETYPE_TAG_IDS: Record<string, number> = {
  'the-amplifier': 16555347,
  'the-architect': 16555359,
  'the-awakener': 16555348,
  'the-catalyst': 16554557,
  'the-compass': 16555360,
  'the-explorer': 16555350,
  'the-firestarter': 16555352,
  'the-original': 16555385,
  'the-translator': 16555356,
  'the-unlocker': 16555386,
};

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

    const headers = {
      'Content-Type': 'application/json',
      'X-Kit-Api-Key': KIT_API_KEY,
    };

    const emailNorm = email.trim().toLowerCase();

    // Step 1: Create subscriber (or get existing)
    const createRes = await fetch('https://api.kit.com/v4/subscribers', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        email_address: emailNorm,
        fields: {
          lowest_dimension: lowest_dimension || '',
          archetype: archetype || '',
        },
      }),
    });

    const createData = await createRes.json();
    console.log('Create subscriber response:', createRes.status, JSON.stringify(createData));

    if (!createRes.ok) {
      return new Response(JSON.stringify({ success: false, kit_error: createData }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const subscriberId = createData?.subscriber?.id;
    if (!subscriberId) {
      console.error('No subscriber ID returned:', JSON.stringify(createData));
      return new Response(JSON.stringify({ success: false, error: 'No subscriber ID' }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Step 2: Add subscriber to form
    const formRes = await fetch(`https://api.kit.com/v4/forms/${KIT_FORM_ID}/subscribers/${subscriberId}`, {
      method: 'POST',
      headers,
      body: JSON.stringify({}),
    });

    const formData = await formRes.json();
    console.log('Add to form response:', formRes.status, JSON.stringify(formData));

    if (!formRes.ok) {
      console.error('Form add error:', JSON.stringify(formData));
    }

    // Step 3: Tag subscriber with archetype
    const tagId = archetype ? ARCHETYPE_TAG_IDS[archetype] : undefined;
    if (tagId) {
      try {
        const tagRes = await fetch(`https://api.kit.com/v4/tags/${tagId}/subscribers`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ email_address: emailNorm }),
        });
        const tagData = await tagRes.json();
        console.log('Tag subscriber response:', tagRes.status, JSON.stringify(tagData));
        if (!tagRes.ok) {
          console.error('Tag error:', JSON.stringify(tagData));
        }
      } catch (tagErr) {
        console.error('Tag request failed:', tagErr.message);
      }
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
