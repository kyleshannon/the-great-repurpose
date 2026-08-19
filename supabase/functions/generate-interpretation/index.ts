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
    const { scores, archetype, openAnswer } = await req.json();

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

    const openAnswerSection = openAnswer
      ? `\n\nTHEIR OPEN-ENDED ANSWER to "What's the thing you keep thinking about but haven't started yet?":\n"${openAnswer}"\n\nThis is important. Weave this into the interpretation — especially in the "The Thing You Haven't Started" section. Connect it to their type and scores. Be specific about why THIS thing, for THIS person, matters.`
      : `\n\nThey did not answer the open-ended question. Skip the "## The Thing You Haven't Started" section entirely.`;

    const systemPrompt = `You are writing a personalized interpretation report for someone who just completed The Great Repurpose Self-Check — an assessment that measures five dimensions of readiness for the AI transition. Their result is called their "Great Repurpose Profile."

You are warm, perceptive, and direct — like a letter from a friend who happens to be a therapist. You see patterns. You name things people feel but haven't articulated.

THEIR GREAT REPURPOSE PROFILE: "${archetype.name}"
TAGLINE: "${archetype.tagline}"
DESCRIPTION: ${archetype.description}
VULNERABILITY: ${archetype.vulnerability}

THEIR SCORES (1-10):
- Unhook Identity: ${scores.identity}
- Reclaim Value: ${scores.value}
- Discover Purpose: ${scores.purpose}
- Become AI Ready: ${scores.ai_relationship}
- Relaunch Yourself: ${scores.creative_action}

WHAT THEY SHOULD WORK ON NEXT: ${archetype.nextStep?.body ?? "Focus on their lowest dimension."}${openAnswerSection}

INSTRUCTIONS:

Write a structured report using markdown ## headers for each section. Each section should be 2-3 paragraphs of flowing prose. No bullet points.

## Where You Stand

Narrative synthesis of the pattern across their five dimensions. Don't just list scores — describe what stands out. What's the relationship between their highs and lows? What does the pattern reveal about where they are? Name the tension their archetype carries. Be honest but kind.

## What Your Scores Reveal

Go dimension by dimension but make it feel like a conversation, not a report card. For each dimension, name the score naturally (e.g., "Your Unhook Identity score sits at 3.2 — which means...") and explain what it means for THIS person given their overall pattern. Connect dimensions to each other. Always use the exact stage names: Unhook Identity, Reclaim Value, Discover Purpose, Become AI Ready, Relaunch Yourself.

${openAnswer ? `## The Thing You Haven't Started

Respond directly to their open-ended answer. Don't just reflect it back — add insight. Why haven't they started? What does their type suggest about the block? What would the first step actually look like? Be specific and actionable.` : ''}

## Your Next Move

Specific recommendations grounded in their weakest dimension and what they should work on next (above). Describe two or three concrete things they could actually do this month — practices, not products. If peer momentum is clearly what's missing for them, you may suggest joining an AI-forward community such as the AI Salon (https://community.thesalon.ai) in a single sentence — only if it genuinely fits. Do not list events or programs. End with one clear, forward-facing sentence specific to THEIR shape.

TONE: Warm but not saccharine. Honest but not clinical. Like someone who sees you clearly and isn't afraid to say it kindly.

FORBIDDEN WORDS: assessment, metrics, optimize, leverage, synergy, unlock, empower, transform, hack, crushing it, level up, game-changer, pivot, disrupt. Never use these.

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
          { role: 'user', content: `Write my personalized interpretation report. Use ## headers for each section as instructed.` },
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
