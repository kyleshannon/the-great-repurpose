import { OneSheet } from "./academy/OneSheet";
import html from "./academy/transitionHtml";

const AcademyTransition = () => (
  <OneSheet
    html={html}
    title="TGR Transition Academy | Outplacement Reimagined for AI"
    description="Outplacement, reimagined for an AI-shaped future. A cohort-based program that helps departing employees leave with agency, clarity, and real AI readiness."
    canonical="https://thegreatrepurpose.com/academy/transition"
    path="/academy/transition"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Course",
      name: "The TGR Transition Academy",
      description:
        "A cohort-based transition program that moves people through the five stages of The Great Repurpose — unhooking identity from title, reclaiming real value, and developing AI agency to relaunch.",
      url: "https://thegreatrepurpose.com/academy/transition",
      provider: {
        "@type": "Organization",
        name: "The Great Repurpose",
        url: "https://thegreatrepurpose.com/",
      },
      audience: {
        "@type": "Audience",
        audienceType: "HR leaders, people teams, and employees in role transition",
      },
      teaches: [
        "Unhook identity from title",
        "Reclaim real value",
        "Practical AI agency",
        "Relaunch with a cohort",
      ],
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "Blended" },
    }}
  />
);

export default AcademyTransition;
