
CREATE TABLE public.selfcheck_results (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT,
  identity_score FLOAT NOT NULL DEFAULT 5,
  value_score FLOAT NOT NULL DEFAULT 5,
  purpose_score FLOAT NOT NULL DEFAULT 5,
  ai_relationship_score FLOAT NOT NULL DEFAULT 5,
  creative_action_score FLOAT NOT NULL DEFAULT 5,
  lowest_dimension TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.selfcheck_results ENABLE ROW LEVEL SECURITY;

-- Public can insert (no account required)
CREATE POLICY "Anyone can insert results"
  ON public.selfcheck_results
  FOR INSERT
  WITH CHECK (true);

-- Results are publicly readable by ID (for sharing links)
CREATE POLICY "Anyone can view results by id"
  ON public.selfcheck_results
  FOR SELECT
  USING (true);
