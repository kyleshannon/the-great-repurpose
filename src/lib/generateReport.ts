import jsPDF from "jspdf";

// ── Colors ───────────────────────────────────────────────────────────────────
const NAVY = [26, 28, 30] as const;       // #1a1c1e
const CREAM = [222, 215, 200] as const;    // hsl(40,25%,90%) approx
const SAGE = [96, 160, 112] as const;      // hsl(145,25%,50%) approx
const MUTED = [160, 155, 145] as const;    // cream/60
const DIVIDER = [60, 62, 64] as const;     // subtle line

type DimensionKey = "identity" | "value" | "purpose" | "ai_relationship" | "creative_action";

const dimensionLabels: Record<DimensionKey, { label: string; stage: string }> = {
  identity:        { label: "Unhook Identity",     stage: "I'm not my job." },
  value:           { label: "Reclaim Value",       stage: "Here's Who I Am." },
  purpose:         { label: "Discover Purpose",    stage: "What matters to me." },
  ai_relationship: { label: "Become AI Ready",     stage: "Understand AI's power to amplify your ideas." },
  creative_action: { label: "Relaunch Yourself",   stage: "Turn who you are into work, opportunity, and income." },
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

function drawLine(doc: jsPDF, y: number, pageWidth: number, margin: number) {
  doc.setDrawColor(DIVIDER[0], DIVIDER[1], DIVIDER[2]);
  doc.setLineWidth(0.3);
  doc.line(margin, y, pageWidth - margin, y);
}

/** Wrap text and render, returning the new Y position. Adds pages as needed. */
function renderWrappedText(
  doc: jsPDF,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  margin: number,
  bottomMargin: number,
): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  // Strip markdown bold markers for PDF
  const clean = text.replace(/\*\*/g, "");
  // Strip markdown links [text](url) → text
  const noLinks = clean.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const lines = doc.splitTextToSize(noLinks, maxWidth) as string[];
  for (const line of lines) {
    if (y + lineHeight > pageHeight - bottomMargin) {
      doc.addPage();
      y = margin;
      // Re-draw background on new page
      doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.rect(0, 0, doc.internal.pageSize.getWidth(), pageHeight, "F");
    }
    doc.text(line, x, y);
    y += lineHeight;
  }
  return y;
}

// ── Main generator ───────────────────────────────────────────────────────────

export function generateReportPDF(data: ReportData) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 25;
  const contentWidth = pageWidth - margin * 2;
  const bottomMargin = 25;

  // ── Page 1: Cover ──────────────────────────────────────────────────────────

  // Background
  doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.rect(0, 0, pageWidth, pageHeight, "F");

  let y = 55;

  // Small label
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setColor(doc, SAGE);
  doc.text("YOUR GREAT REPURPOSE PROFILE", pageWidth / 2, y, { align: "center" });
  y += 14;

  // Category headline
  if (data.category) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    setColor(doc, CREAM);
    const headline = data.category.isCapstone
      ? "You've made it through."
      : `You're a ${data.category.label}.`;
    doc.text(headline, pageWidth / 2, y, { align: "center" });
    y += 10;
  }

  // Archetype name
  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  setColor(doc, CREAM);
  doc.text(data.archetype.name, pageWidth / 2, y, { align: "center" });
  y += 10;

  // Category description
  if (data.category) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setColor(doc, MUTED);
    const descLines = doc.splitTextToSize(data.category.description, contentWidth - 30) as string[];
    for (const line of descLines) {
      doc.text(line, pageWidth / 2, y, { align: "center" });
      y += 5;
    }
    y += 4;
  }

  // Tagline
  doc.setFont("helvetica", "italic");
  doc.setFontSize(13);
  setColor(doc, MUTED);
  const taglineLines = doc.splitTextToSize(data.archetype.tagline, contentWidth - 20) as string[];
  for (const line of taglineLines) {
    doc.text(line, pageWidth / 2, y, { align: "center" });
    y += 6;
  }
  y += 10;

  // Divider
  drawLine(doc, y, pageWidth, margin + 20);
  y += 16;

  // ── Scores table ───────────────────────────────────────────────────────────

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  setColor(doc, SAGE);
  doc.text("YOUR SCORES", margin, y);
  y += 10;

  for (const dim of dimOrder) {
    const meta = dimensionLabels[dim];
    const score = data.scores[dim];

    // Dimension label
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(doc, CREAM);
    doc.text(meta.label, margin, y);

    // Score
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(score.toFixed(1), pageWidth - margin, y, { align: "right" });

    // Stage subtitle
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(doc, MUTED);
    doc.text(meta.stage, margin, y + 5);

    // Score bar
    const barY = y + 8;
    const barWidth = contentWidth - 50;
    const barHeight = 2;
    doc.setFillColor(DIVIDER[0], DIVIDER[1], DIVIDER[2]);
    doc.roundedRect(margin, barY, barWidth, barHeight, 1, 1, "F");
    const fillWidth = ((score - 1) / 9) * barWidth;
    doc.setFillColor(SAGE[0], SAGE[1], SAGE[2]);
    doc.roundedRect(margin, barY, Math.max(fillWidth, 2), barHeight, 1, 1, "F");

    y += 18;
  }

  y += 5;
  drawLine(doc, y, pageWidth, margin + 20);
  y += 14;

  // ── Description ────────────────────────────────────────────────────────────

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  setColor(doc, MUTED);
  y = renderWrappedText(doc, data.archetype.description, margin, y, contentWidth, 5, margin, bottomMargin);
  y += 6;
  y = renderWrappedText(doc, data.archetype.vulnerability, margin, y, contentWidth, 5, margin, bottomMargin);

  // ── Footer on cover
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  setColor(doc, MUTED);
  doc.text("TheGreatRepurpose.com  •  The AI Salon", pageWidth / 2, pageHeight - 12, { align: "center" });

  // ── Interpretation pages ───────────────────────────────────────────────────

  if (data.interpretation) {
    doc.addPage();
    doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    y = margin;

    // Header
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    setColor(doc, SAGE);
    doc.text("YOUR PERSONALIZED REPORT", margin, y);
    y += 12;

    // Parse markdown sections
    const sections = parseInterpretation(data.interpretation);

    for (const section of sections) {
      // Check if we need a new page for the heading
      if (y + 20 > pageHeight - bottomMargin) {
        doc.addPage();
        doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
        doc.rect(0, 0, pageWidth, pageHeight, "F");
        y = margin;
      }

      if (section.title) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        setColor(doc, SAGE);
        doc.text(section.title.toUpperCase(), margin, y);
        y += 8;
      }

      // Body paragraphs
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      setColor(doc, CREAM);

      const paragraphs = section.body.split("\n\n").filter(Boolean);
      for (const para of paragraphs) {
        y = renderWrappedText(doc, para.trim(), margin, y, contentWidth, 4.8, margin, bottomMargin);
        y += 4;
      }
      y += 4;
    }

    // Footer on last page
    const lastPageCount = doc.getNumberOfPages();
    for (let p = 1; p <= lastPageCount; p++) {
      doc.setPage(p);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      setColor(doc, MUTED);
      doc.text("TheGreatRepurpose.com  •  The AI Salon", pageWidth / 2, pageHeight - 12, { align: "center" });
    }
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
