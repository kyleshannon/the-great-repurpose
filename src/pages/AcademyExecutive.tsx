import { OneSheet } from "./academy/OneSheet";
import html from "./academy/executiveHtml";

const AcademyExecutive = () => (
  <OneSheet
    html={html}
    title="Executive Leadership Academy | AI Leadership Training"
    description="An eight-hour immersive workshop plus three months of implementation sessions that build executive AI readiness — for CEOs, COOs, CHROs, and workforce transformation leads."
    canonical="https://thegreatrepurpose.com/academy/leadership"
    path="/academy/leadership"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "The Executive Leadership Academy",
      description:
        "An eight-hour immersive workshop followed by ninety-minute implementation sessions every two weeks for three months, applied to real workforce, technology, and organizational decisions.",
      url: "https://thegreatrepurpose.com/academy/leadership",
      provider: {
        "@type": "Organization",
        name: "The Great Repurpose",
        url: "https://thegreatrepurpose.com/",
      },
      audience: {
        "@type": "Audience",
        audienceType: "CEOs, COOs, CHROs, heads of talent, workforce transformation leads",
      },
      teaches: [
        "Understand the Implications of AI",
        "Shift Your Leadership Mindset",
        "Build Executive AI Readiness",
        "Find and Support Your People",
      ],
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Blended",
        courseWorkload: "PT8H",
      },
    }}
  />
);

export default AcademyExecutive;
