

# Push Submission Data to Google Sheet

## Overview

On email submission, send all result data to a public Google Sheet alongside the existing database insert and Kit subscription.

## Approach

Use a **Google Apps Script Web App** as a webhook. This is the simplest approach for a public sheet -- no OAuth or service account needed.

### Step 1: Create a Google Apps Script on the Sheet

You (the user) will add a small Apps Script to the Google Sheet that accepts POST requests and appends rows. Here's what to paste:

1. Open the Google Sheet
2. Go to **Extensions > Apps Script**
3. Replace the default code with:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.email,
    data.identity_score,
    data.value_score,
    data.purpose_score,
    data.ai_relationship_score,
    data.creative_action_score,
    data.lowest_dimension,
    data.archetype,
    data.open_answer || ""
  ]);
  return ContentService.createTextOutput(JSON.stringify({ success: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Deploy > New deployment**
5. Choose **Web app**, set "Execute as" to **Me**, and "Who has access" to **Anyone**
6. Copy the deployment URL

### Step 2: Store the URL as a secret

The Apps Script deployment URL will be stored as a backend secret (`GOOGLE_SHEET_WEBHOOK_URL`) so it's not exposed in frontend code.

### Step 3: Create a new edge function `push-to-sheet`

A small edge function that receives the submission data and POSTs it to the Google Apps Script webhook.

**File: `supabase/functions/push-to-sheet/index.ts`**

- Accepts POST with: email, scores, lowest_dimension, archetype, open_answer
- Reads `GOOGLE_SHEET_WEBHOOK_URL` from environment
- Forwards the data to the webhook
- Returns success/failure (non-blocking to the user)

### Step 4: Call the edge function from `ResultsPreview.tsx`

In the `handleEmailSuccess` function (around line 397), add a fire-and-forget call to `push-to-sheet` alongside the existing `subscribe-kit` call:

```typescript
supabase.functions
  .invoke("push-to-sheet", {
    body: {
      email,
      identity_score: scores.identity,
      value_score: scores.value,
      purpose_score: scores.purpose,
      ai_relationship_score: scores.ai_relationship,
      creative_action_score: scores.creative_action,
      lowest_dimension: lowestDim,
      archetype: archetype.name,
      open_answer: openAnswer || null,
    },
  })
  .catch((err) => console.warn("Sheet push failed:", err));
```

### Step 5: Set up the Sheet headers

The first row of the Google Sheet should have these column headers:
Timestamp | Email | Identity | Value | Purpose | AI Relationship | Creative Action | Lowest Dimension | Archetype | Open Answer

## Files to create/modify

1. **Create** `supabase/functions/push-to-sheet/index.ts` -- new edge function
2. **Modify** `src/pages/ResultsPreview.tsx` -- add fire-and-forget call in `handleEmailSuccess`
3. **Modify** `supabase/config.toml` -- add function config (verify_jwt = false)

## User action required

- Set up the Google Apps Script on the Sheet and deploy it
- Provide the deployment URL so it can be stored as a secret

