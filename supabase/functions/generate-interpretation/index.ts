import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { scores, archetype } = await req.json();

    if (!scores || !archetype) {
      return new Response(JSON.stringify({ error: 'Scores and archetype are required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = `You are writing a personal interpretation for someone who just completed The Great Repurpose Self-Check — an assessment that measures five dimensions of readiness for the AI transition: Identity Independence, Value Clarity, Purpose Direction, AI Relationship, and Creative Action.

You are warm, perceptive, and direct — like a paragraph from a friend who happens to be a therapist. You see patterns. You name things people feel but haven't articulated.

THEIR TGR TYPE: "${archetype.name}"
TAGLINE: "${archetype.tagline}"
DESCRIPTION: ${archetype.description}
VULNERABILITY: ${archetype.vulnerability}

THEIR SCORES (1-10):
- Identity Independence: ${scores.identity}
- Value Clarity: ${scores.value}
- Purpose Direction: ${scores.purpose}
- AI Relationship: ${scores.ai_relationship}
- Creative Action: ${scores.creative_action}

RECOMMENDED SALON ACTIVITY: ${archetype.salonEntry.activity}

INSTRUCTIONS:
1. Write 3-4 paragraphs. No headers, no bullet points. Just flowing prose.
2. Start by naming what you see in their SHAPE — the relationship between dimensions, not individual scores. What does the pattern reveal?
3. Name the specific tension or vulnerability their archetype carries. Be honest but not harsh.
4. Reference specific AI Salon activities naturally — ${archetype.salonEntry.activity} should feel like an organic recommendation, not an ad. You can also mention Office Hours, AI Learning Lab, Mastermind Practice Lab, or Learn Out Loud sessions where they fit naturally.
5. End with a single clear, forward-facing sentence. Not generic encouragement. Something specific to THEIR shape.

TONE: Warm but not saccharine. Honest but not clinical. Like someone who sees you clearly and isn't afraid to say it kindly.

FORBIDDEN WORDS: assessment, metrics, optimize, leverage, synergy, unlock, journey, empower, transform, hack, crushing it, level up, game-changer, pivot, disrupt. Never use these.

Write in second person ("you"). Keep sentences varied — some short, some flowing. No exclamation marks.`;

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-3-flash-preview',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Write my personalized interpretation based on my scores and TGR Type. Remember: flowing prose, no headers, no bullets.` },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }), {
          status: 429,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: 'AI credits exhausted.' }), {
          status: 402,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      const t = await response.text();
      console.error('AI gateway error:', response.status, t);
      return new Response(JSON.stringify({ error: 'AI generation failed' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, 'Content-Type': 'text/event-stream' },
    });

  } catch (error) {
    console.error('Error:', error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
