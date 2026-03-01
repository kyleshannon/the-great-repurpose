

# Fix Social Media Link Previews

## Problem
When sharing on Twitter/X and other platforms, the link preview doesn't render correctly. The `index.html` has:
- Missing `og:url` meta tag (required by most platforms)
- Scattered empty lines and orphaned comments between meta tags that can confuse some crawlers

## Fix

**File:** `index.html`

Clean up the `<head>` section to include all required Open Graph and Twitter meta tags in a well-structured block:

1. Add `og:url` pointing to the published URL (`https://the-great-repurpose.lovable.app`)
2. Remove stray blank lines and empty comment placeholders between the meta tags
3. Keep all existing tag values (title, description, image) unchanged

The final meta block will look like:

```html
<meta property="og:type" content="website" />
<meta property="og:url" content="https://the-great-repurpose.lovable.app" />
<meta property="og:title" content="The Great Repurpose — Find Your TGR Type" />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="The Great Repurpose — Find Your TGR Type" />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

No other files need changes -- this is purely a static HTML fix.
