

# Update Community Links Across the Site

## What Changes

Replace all placeholder `https://thesalon.ai` URLs with the correct destinations:

| Link | New URL |
|------|---------|
| Free Community | `https://community.thesalon.ai` |
| Office Hours / Meet & Greet | `https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet` |
| AI Readiness Project Podcast | `http://aireadinessproject.com/` |

## Files to Update

### 1. `src/components/Footer.tsx`
- "thesalon.ai" link -> `https://community.thesalon.ai`
- "The AI Readiness Project Podcast" -> `http://aireadinessproject.com/`
- "Office Hours: Fridays" -> `https://aisalon.mn.co/events/ai-salon-office-hoursmeet-and-greet`

### 2. `src/pages/ResultsPreview.tsx`
Update all dimension recommendation links:
- Every "Friday Office Hours" link -> Office Hours URL
- Every "Free Community" link -> `https://community.thesalon.ai`
- "AI Readiness Project Podcast" in the bottom CTA grid -> `http://aireadinessproject.com/`
- Other links (Learn Out Loud, AI Learning Lab, Mastermind Practice Lab) will keep `https://thesalon.ai` since no specific URL was provided for those

### 3. `src/pages/About.tsx`
- The "Visit thesalon.ai" CTA keeps its current URL (it points to the main site, not the community)

### 4. `src/pages/Index.tsx`
- The inline "AI Salon" link keeps `https://thesalon.ai` (main site reference)

No structural or design changes -- just URL corrections.

