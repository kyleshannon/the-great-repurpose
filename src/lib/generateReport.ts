import jsPDF from "jspdf";
import lockupIndigo from "@/assets/tgr-lockup-indigo.png.asset.json";
import logoIndigo from "@/assets/tgr-logo-indigo.png.asset.json";
import logoAqua from "@/assets/tgr-logo-aqua.png.asset.json";
import logoOrchid from "@/assets/tgr-logo-orchid.png.asset.json";
import logoCitrus from "@/assets/tgr-logo-citrus.png.asset.json";
import logoPoppy from "@/assets/tgr-logo-poppy.png.asset.json";

// ── Brand palette (print-safe, light background) ─────────────────────────────
const OFFWHITE = [242, 241, 241] as const;   // Soft White
const AUBERGINE = [1, 15, 50] as const;      // Aubergine-Black
const MUTED = [90, 100, 120] as const;       // muted body text
const RULE = [214, 213, 213] as const;       // hairline rules

const INDIGO = [21, 45, 236] as const;
const AQUA = [6, 183, 178] as const;
const ORCHID = [149, 92, 213] as const;
const CITRUS = [237, 179, 34] as const;
const CITRUS_TEXT = [166, 118, 6] as const;   // darker citrus for legible text on light bg
const POPPY = [252, 84, 48] as const;

type DimensionKey = "identity" | "value" | "purpose" | "ai_relationship" | "creative_action";

const dimensionMeta: Record<
  DimensionKey,
  {
    label: string;
    stage: string;
    color: readonly [number, number, number];
    textColor?: readonly [number, number, number];
    logo: string;
  }
> = {
  identity: { label: "Unhook Identity", stage: "I'm not my job.", color: INDIGO, logo: logoIndigo.url },
  value: { label: "Reclaim Value", stage: "Here's Who I Am.", color: AQUA, logo: logoAqua.url },
  purpose: { label: "Discover Purpose", stage: "What matters to me.", color: ORCHID, logo: logoOrchid.url },
  ai_relationship: {
    label: "Become AI Ready",
    stage: "Understand AI's power to amplify your ideas.",
    color: CITRUS,
    textColor: CITRUS_TEXT,
    logo: logoCitrus.url,
  },
  creative_action: {
    label: "Relaunch Yourself",
    stage: "Turn who you are into work, opportunity, and income.",
    color: POPPY,
    logo: logoPoppy.url,
  },
};

const dimOrder: DimensionKey[] = ["identity", "value", "purpose", "ai_relationship", "creative_action"];

interface ReportData {
  archetype: { name: string; tagline: string; description: string; vulnerability: string; category?: string };
  category?: { label: string; description: string; isCapstone: boolean };
  scores: Record<DimensionKey, number>;
  interpretation: string;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function setColor(doc: jsPDF, rgb: readonly [number, number, number]) {
  doc.setTextColor(rgb[0], rgb[1], rgb[2]);
}

function drawLine(doc: jsPDF, y: number, x1: number, x2: number) {
  doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
  doc.setLineWidth(0.3);
  doc.line(x1, y, x2, y);
}

async function loadImage(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generateReportPDF(data: ReportData) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 22;
  const contentWidth = pageWidth - margin * 2;
  const bottomMargin = 24;

  // Preload brand imagery
  const [lockup, ...stageLogos] = await Promise.all([
    loadImage(lockupIndigo.url),
    ...dimOrder.map((d) => loadImage(dimensionMeta[d].logo)),
  ]);
  const logoByDim: Partial<Record<DimensionKey, string>> = {};
  dimOrder.forEach((d, i) => {
    const img = stageLogos[i];
    if (img) logoByDim[d] = img;
  });

  const paintPage = () => {
    doc.setFillColor(OFFWHITE[0], OFFWHITE[1], OFFWHITE[2]);
    doc.rect(0, 0, pageWidth, pageHeight, "F");
  };

  /** Wrap text and render, returning the new Y position. Adds pages as needed. */
  const renderWrappedText = (
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number,
    align: "left" | "center" = "left",
  ): number => {
    const clean = text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    const lines = doc.splitTextToSize(clean, maxWidth) as string[];
    for (const line of lines) {
      if (y + lineHeight > pageHeight - bottomMargin) {
        doc.addPage();
        paintPage();
        y = margin + 6;
      }
      doc.text(line, align === "center" ? pageWidth / 2 : x, y, { align });
      y += lineHeight;
    }
    return y;
  };

  // ── Page 1: Cover ──────────────────────────────────────────────────────────
  paintPage();

  let y = 26;

  if (lockup) {
    const w = 82;
    const h = w * (595 / 1920);
    doc.addImage(lockup, "PNG", (pageWidth - w) / 2, y, w, h);
    y += h + 16;
  } else {
    y += 10;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setColor(doc, AQUA);
  doc.text("YOUR GREAT REPURPOSE PROFILE", pageWidth / 2, y, { align: "center" });
  y += 12;

  if (data.category) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    setColor(doc, MUTED);
    const headline = data.category.isCapstone
      ? "You've made it through."
      : `You're a ${data.category.label}.`;
    doc.text(headline, pageWidth / 2, y, { align: "center" });
    y += 11;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  setColor(doc, AUBERGINE);
  doc.text(data.archetype.name, pageWidth / 2, y, { align: "center" });
  y += 11;

  if (data.category) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setColor(doc, MUTED);
    y = renderWrappedText(data.category.description, 0, y, contentWidth - 30, 5, "center");
    y += 3;
  }

  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  setColor(doc, INDIGO);
  y = renderWrappedText(data.archetype.tagline, 0, y, contentWidth - 20, 6, "center");
  y += 12;

  drawLine(doc, y, margin + 18, pageWidth - margin - 18);
  y += 14;

  // ── Scores ─────────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setColor(doc, AUBERGINE);
  doc.text("YOUR FIVE STAGES", margin, y);
  y += 9;

  for (const dim of dimOrder) {
    const meta = dimensionMeta[dim];
    const score = data.scores[dim];
    const logo = logoByDim[dim];

    const iconSize = 9;
    const textX = margin + iconSize + 5;

    if (logo) {
      doc.addImage(logo, "PNG", margin, y - 5.5, iconSize * (790 / 1124), iconSize);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(doc, AUBERGINE);
    doc.text(meta.label, textX, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    setColor(doc, meta.textColor ?? meta.color);
    doc.text(score.toFixed(1), pageWidth - margin, y, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(doc, MUTED);
    doc.text(meta.stage, textX, y + 4.6);

    // Score bar
    const barY = y + 7.5;
    const barWidth = pageWidth - margin - textX;
    const barHeight = 2;
    doc.setFillColor(RULE[0], RULE[1], RULE[2]);
    doc.roundedRect(textX, barY, barWidth, barHeight, 1, 1, "F");
    const fillWidth = ((score - 1) / 9) * barWidth;
    doc.setFillColor(meta.color[0], meta.color[1], meta.color[2]);
    doc.roundedRect(textX, barY, Math.max(fillWidth, 2), barHeight, 1, 1, "F");

    y += 17;
  }

  y += 3;
  drawLine(doc, y, margin + 18, pageWidth - margin - 18);
  y += 13;

  // ── Description ────────────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setColor(doc, AUBERGINE);
  y = renderWrappedText(data.archetype.description, margin, y, contentWidth, 5);
  y += 5;
  doc.setFont("helvetica", "italic");
  setColor(doc, MUTED);
  y = renderWrappedText(data.archetype.vulnerability, margin, y, contentWidth, 5);

  // ── Interpretation pages ───────────────────────────────────────────────────
  if (data.interpretation) {
    doc.addPage();
    paintPage();
    y = margin + 4;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setColor(doc, AQUA);
    doc.text("YOUR PERSONALIZED REPORT", margin, y);
    y += 11;

    const sections = parseInterpretation(data.interpretation);

    for (const section of sections) {
      if (y + 20 > pageHeight - bottomMargin) {
        doc.addPage();
        paintPage();
        y = margin + 4;
      }

      if (section.title) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        setColor(doc, AUBERGINE);
        doc.text(section.title.toUpperCase(), margin, y);
        y += 3;
        drawLine(doc, y, margin, pageWidth - margin);
        y += 7;
      }

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      setColor(doc, AUBERGINE);

      const paragraphs = section.body.split("\n\n").filter(Boolean);
      for (const para of paragraphs) {
        y = renderWrappedText(para.trim(), margin, y, contentWidth, 4.9);
        y += 4;
      }
      y += 4;
    }
  }

  // ── Subtle Academy CTA block ───────────────────────────────────────────────
  {
    const blockHeight = 54;
    if (y + blockHeight > pageHeight - bottomMargin) {
      doc.addPage();
      paintPage();
      y = margin + 4;

      // Closing page header so the CTA never floats alone
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      setColor(doc, AQUA);
      doc.text("WHAT'S NEXT", margin, y);
      y += 11;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);
      setColor(doc, AUBERGINE);
      y = renderWrappedText(
        "The five stages aren't a one-time read. They're a practice — and the work goes further with structure and other people moving through it alongside you.",
        margin,
        y,
        contentWidth,
        5.4,
      );
      y += 8;
    } else {
      y += 6;
    }


    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, blockHeight, 3, 3, "FD");

    let by = y + 9;
    const bx = margin + 8;
    const bw = contentWidth - 16;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setColor(doc, AQUA);
    doc.text("CONTINUE THE WORK — THE GREAT REPURPOSE ACADEMY", bx, by);
    by += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor(doc, MUTED);
    doc.text("Two guided tracks built on the five stages in this report.", bx, by);
    by += 7.5;

    const tracks = [
      {
        title: "Executive Leadership Academy",
        desc: "For leaders guiding teams and organizations through the AI transition.",
        url: "TheGreatRepurpose.com/academy/leadership",
        color: INDIGO,
      },
      {
        title: "Transition Academy",
        desc: "For individuals reclaiming identity, value, and a relaunched path forward.",
        url: "TheGreatRepurpose.com/academy/transition",
        color: POPPY,
      },
    ];

    for (const t of tracks) {
      doc.setFillColor(t.color[0], t.color[1], t.color[2]);
      doc.circle(bx + 1, by - 1.2, 1.2, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      setColor(doc, AUBERGINE);
      doc.text(t.title, bx + 5, by);
      by += 4.8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      setColor(doc, MUTED);
      doc.text(doc.splitTextToSize(t.desc, bw - 5) as string[], bx + 5, by);
      by += 4.6;

      doc.setFontSize(8.5);
      setColor(doc, AQUA);
      doc.text(t.url, bx + 5, by);
      by += 8;
    }

    y += blockHeight + 6;
  }

  // ── Footers on every page ──────────────────────────────────────────────────
  const totalPages = doc.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    setColor(doc, MUTED);
    doc.text("TheGreatRepurpose.com", margin, pageHeight - 12);
    doc.text(`${p} / ${totalPages}`, pageWidth - margin, pageHeight - 12, { align: "right" });
  }

  doc.save("great-repurpose-report.pdf");
}

function parseInterpretation(text: string): { title: string; body: string }[] {
  const sections: { title: string; body: string }[] = [];
  const parts = text.split(/^## /m);

  if (parts[0]?.trim()) {
    sections.push({ title: "", body: parts[0].trim() });
  }
  for (let i = 1; i < parts.length; i++) {
    const newlineIdx = parts[i].indexOf("\n");
    if (newlineIdx === -1) {
      sections.push({ title: parts[i].trim(), body: "" });
    } else {
      sections.push({
        title: parts[i].slice(0, newlineIdx).trim(),
        body: parts[i].slice(newlineIdx + 1).trim(),
      });
    }
  }
  return sections;
}
