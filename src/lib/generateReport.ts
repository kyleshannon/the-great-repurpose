import jsPDF from "jspdf";
import lockupIndigo from "@/assets/tgr-lockup-indigo.png.asset.json";
import logoIndigo from "@/assets/tgr-logo-indigo.png.asset.json";
import logoAqua from "@/assets/tgr-logo-aqua.png.asset.json";
import logoOrchid from "@/assets/tgr-logo-orchid.png.asset.json";
import logoCitrus from "@/assets/tgr-logo-citrus.png.asset.json";
import logoPoppy from "@/assets/tgr-logo-poppy.png.asset.json";
import elaHeroAsset from "@/assets/ela-hero.png.asset.json";
import taHeroAsset from "@/assets/ta-hero.png.asset.json";
import {
  getStageScoreNote,
  getTacticalPractices,
  type Archetype,
  type Scores,
} from "@/lib/archetypes";

// ── Brand palette (print-safe, light background) ─────────────────────────────
const OFFWHITE = [242, 241, 241] as const;   // Soft White
const AUBERGINE = [1, 15, 50] as const;      // Aubergine-Black
const MUTED = [90, 100, 120] as const;       // muted body text
const RULE = [214, 213, 213] as const;       // hairline rules
const GRAY_HEAD = [107, 114, 128] as const;  // section header gray (matches web)

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
  archetype: Archetype;
  /** Canonical profile subtitle + definition shown on the web report. */
  profileTagline: string;
  profileDescription: string;
  scores: Record<DimensionKey, number>;
  interpretation: string;
  /** Optional radar chart rendered as a PNG data URL. */
  chartImage?: string | null;
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

/** Load an image and center-crop it to a target aspect ratio (like CSS object-cover). */
async function loadImageCover(url: string, ratio: number): Promise<string | null> {
  const dataUrl = await loadImage(url);
  if (!dataUrl) return null;
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = dataUrl;
    });
    const srcRatio = img.width / img.height;
    let sw = img.width;
    let sh = img.height;
    if (srcRatio > ratio) sw = img.height * ratio;
    else sh = img.width / ratio;
    const sx = (img.width - sw) / 2;
    const sy = (img.height - sh) / 2;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(sw);
    canvas.height = Math.round(sh);
    const ctx = canvas.getContext("2d");
    if (!ctx) return dataUrl;
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch {
    return dataUrl;
  }
}

/** Crop blank (transparent or uniform-background) borders off a PNG data URL. */
async function trimImage(dataUrl: string): Promise<string> {
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = reject;
      el.src = dataUrl;
    });
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d", { willReadFrequently: true });
    if (!ctx) return dataUrl;
    ctx.drawImage(img, 0, 0);
    const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);
    // Reference background = top-left pixel
    const r0 = data[0], g0 = data[1], b0 = data[2], a0 = data[3];
    const isBlank = (i: number) => {
      const a = data[i + 3];
      if (a < 8 && a0 < 8) return true;
      return (
        Math.abs(data[i] - r0) < 6 &&
        Math.abs(data[i + 1] - g0) < 6 &&
        Math.abs(data[i + 2] - b0) < 6 &&
        Math.abs(a - a0) < 6
      );
    };
    let top = 0, bottom = height - 1, left = 0, right = width - 1;
    const rowBlank = (y: number) => {
      for (let x = 0; x < width; x++) if (!isBlank((y * width + x) * 4)) return false;
      return true;
    };
    const colBlank = (x: number) => {
      for (let y = top; y <= bottom; y++) if (!isBlank((y * width + x) * 4)) return false;
      return true;
    };
    while (top < bottom && rowBlank(top)) top++;
    while (bottom > top && rowBlank(bottom)) bottom--;
    while (left < right && colBlank(left)) left++;
    while (right > left && colBlank(right)) right--;
    const w = right - left + 1;
    const h = bottom - top + 1;
    if (w <= 0 || h <= 0 || (w === width && h === height)) return dataUrl;
    const out = document.createElement("canvas");
    out.width = w;
    out.height = h;
    const octx = out.getContext("2d");
    if (!octx) return dataUrl;
    octx.drawImage(c, left, top, w, h, 0, 0, w, h);
    return out.toDataURL("image/png");
  } catch {
    return dataUrl;
  }
}

const isNextMoveTitle = (title: string) => /next\s+move/i.test(title);

export async function generateReportPDF(data: ReportData) {
  const doc = new jsPDF("p", "mm", "letter");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 22;
  const contentWidth = pageWidth - margin * 2;
  const bottomMargin = 24;

  // Preload brand imagery
  const [lockup, elaPhoto, taPhoto, ...stageLogos] = await Promise.all([
    loadImage(lockupIndigo.url),
    loadImageCover(elaHeroAsset.url, 16 / 9),
    loadImageCover(taHeroAsset.url, 16 / 9),
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

  let y = 26;

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - bottomMargin) {
      doc.addPage();
      paintPage();
      y = margin + 4;
    }
  };

  /** Wrap text and render, returning the new Y position. Adds pages as needed. */
  const renderWrappedText = (
    text: string,
    x: number,
    startY: number,
    maxWidth: number,
    lineHeight: number,
    align: "left" | "center" = "left",
  ): number => {
    let cursor = startY;
    const clean = text.replace(/\*\*/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
    const lines = doc.splitTextToSize(clean, maxWidth) as string[];
    for (const line of lines) {
      if (cursor + lineHeight > pageHeight - bottomMargin) {
        doc.addPage();
        paintPage();
        cursor = margin + 6;
      }
      doc.text(line, align === "center" ? pageWidth / 2 : x, cursor, { align });
      cursor += lineHeight;
    }
    return cursor;
  };

  /** Small uppercase section eyebrow, matching the web report. */
  const sectionEyebrow = (label: string, color: readonly [number, number, number] = INDIGO) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setColor(doc, color);
    doc.text(label.toUpperCase(), margin, y);
    y += 8;
  };

  // ── Page 1: Cover / profile hero ───────────────────────────────────────────
  paintPage();

  if (lockup) {
    const w = 74;
    const h = w * (595 / 1920);
    doc.addImage(lockup, "PNG", (pageWidth - w) / 2, y, w, h);
    y += h + 16;
  } else {
    y += 10;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  setColor(doc, INDIGO);
  doc.text("YOU ARE:", pageWidth / 2, y, { align: "center" });
  y += 12;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(28);
  setColor(doc, AUBERGINE);
  doc.text(data.archetype.name, pageWidth / 2, y, { align: "center" });
  y += 10;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(12);
  setColor(doc, MUTED);
  y = renderWrappedText(data.profileTagline, 0, y, contentWidth - 20, 6, "center");
  y += 10;

  // ── Profile definition ─────────────────────────────────────────────────────
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  setColor(doc, AUBERGINE);
  y = renderWrappedText(data.profileDescription, margin, y, contentWidth, 5.2);
  y += 8;

  // ── The risk at this stage ─────────────────────────────────────────────────
  {
    const riskLines = doc.splitTextToSize(data.archetype.vulnerability, contentWidth - 8) as string[];
    const blockHeight = 7 + riskLines.length * 5;
    ensureSpace(blockHeight + 6);
    doc.setFillColor(POPPY[0], POPPY[1], POPPY[2]);
    doc.rect(margin, y - 4, 0.8, blockHeight, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    setColor(doc, POPPY);
    doc.text("THE RISK AT THIS STAGE", margin + 5, y);
    y += 5.5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setColor(doc, AUBERGINE);
    y = renderWrappedText(data.archetype.vulnerability, margin + 5, y, contentWidth - 8, 5);
    y += 10;
  }

  // ── Radar chart ────────────────────────────────────────────────────────────
  if (data.chartImage) {
    const chart = await trimImage(data.chartImage);
    const props = doc.getImageProperties(chart);
    const ratio = props.height / props.width;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    setColor(doc, AUBERGINE);
    doc.text("The Shape of Your Repurpose Profile", pageWidth / 2, y, { align: "center" });
    y += 8;
    // Fill the remaining vertical space on page one without overflowing.
    const available = pageHeight - bottomMargin - y;
    const maxW = pageWidth - margin;
    let w = Math.min(maxW, available / ratio);
    let h = ratio * w;
    doc.addImage(chart, "PNG", (pageWidth - w) / 2, y, w, h);
    y += h + 8;
  }



  // ── Your five stage scores ─────────────────────────────────────────────────
  // Keep the header with at least the first stage row.
  ensureSpace(60);
  drawLine(doc, y - 4, margin, pageWidth - margin);
  y += 4;
  sectionEyebrow("Your five stage scores");

  for (const dim of dimOrder) {
    const meta = dimensionMeta[dim];
    const score = data.scores[dim];
    const logo = logoByDim[dim];
    const note = getStageScoreNote(dim, score);
    const noteLines = doc.splitTextToSize(note, contentWidth) as string[];

    ensureSpace(20 + noteLines.length * 4.6);

    const iconSize = 10;
    const textX = margin + iconSize + 5;

    if (logo) {
      doc.addImage(logo, "PNG", margin, y - 5.5, iconSize * (790 / 1124), iconSize);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    setColor(doc, AUBERGINE);
    doc.text(meta.label, textX, y);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    setColor(doc, meta.textColor ?? meta.color);
    doc.text(score.toFixed(1), pageWidth - margin, y, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    setColor(doc, MUTED);
    doc.text(meta.stage, textX, y + 4.4);

    // Score bar
    const barY = y + 7.5;
    const barWidth = contentWidth;
    const barHeight = 2;
    doc.setFillColor(RULE[0], RULE[1], RULE[2]);
    doc.roundedRect(margin, barY, barWidth, barHeight, 1, 1, "F");
    const fillWidth = ((score - 1) / 9) * barWidth;
    doc.setFillColor(meta.color[0], meta.color[1], meta.color[2]);
    doc.roundedRect(margin, barY, Math.max(fillWidth, 2), barHeight, 1, 1, "F");

    y = barY + barHeight + 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    setColor(doc, MUTED);
    y = renderWrappedText(note, margin, y, contentWidth, 4.6);
    y += 7;
  }

  // ── Insights about your profile ────────────────────────────────────────────
  const sections = data.interpretation ? parseInterpretation(data.interpretation) : [];
  const narrativeSections = sections.filter((s) => !isNextMoveTitle(s.title));
  const nextMoveBody = sections
    .filter((s) => isNextMoveTitle(s.title))
    .map((s) => s.body)
    .join("\n\n")
    .trim();

  if (narrativeSections.length) {
    // Flow onto the current page when there's room; only break if cramped.
    y += 6;
    ensureSpace(46);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    setColor(doc, GRAY_HEAD);
    doc.text("INSIGHTS ABOUT YOUR PROFILE", margin, y);
    y += 10;


    for (const section of narrativeSections) {
      ensureSpace(20);

      if (section.title) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        setColor(doc, INDIGO);
        doc.text(section.title.toUpperCase(), margin, y);
        y += 6;
      }

      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      setColor(doc, AUBERGINE);

      for (const para of section.body.split("\n\n").filter(Boolean)) {
        y = renderWrappedText(para.trim(), margin, y, contentWidth, 4.9);
        y += 4;
      }
      y += 4;
    }
  }

  // ── What to work on next ───────────────────────────────────────────────────
  {
    ensureSpace(60);
    y += 6;
    drawLine(doc, y - 6, margin, pageWidth - margin);
    sectionEyebrow("What to work on next");

    if (nextMoveBody) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      setColor(doc, AUBERGINE);
      for (const para of nextMoveBody.split("\n\n").filter(Boolean)) {
        y = renderWrappedText(para.trim(), margin, y, contentWidth, 4.9);
        y += 4;
      }
      y += 2;
    }

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    setColor(doc, MUTED);
    y = renderWrappedText(
      "Three concrete things you could actually do in the next month, chosen from where your scores are thinnest.",
      margin,
      y,
      contentWidth,
      4.9,
    );
    y += 6;

    for (const { stage, action } of getTacticalPractices(data.scores as Scores)) {
      const color = dimensionMeta[stage as DimensionKey].color;
      const descLines = doc.splitTextToSize(action.desc, contentWidth - 8) as string[];
      const blockHeight = 6 + descLines.length * 4.6;
      ensureSpace(blockHeight + 6);

      doc.setFillColor(color[0], color[1], color[2]);
      doc.rect(margin, y - 4, 0.8, blockHeight, "F");

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      setColor(doc, AUBERGINE);
      doc.text(action.label, margin + 5, y);
      y += 5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      setColor(doc, MUTED);
      y = renderWrappedText(action.desc, margin + 5, y, contentWidth - 8, 4.6);
      y += 7;
    }
  }

  // ── Academy offerings ──────────────────────────────────────────────────────
  {
    const tracks = [
      {
        eyebrow: "For leaders making the calls",
        title: "The Executive Leadership Academy",
        desc: "An immersive workshop plus three months of implementation sessions, applied to the decisions already on your desk.",
        url: "TheGreatRepurpose.com/academy/leadership",
        color: INDIGO,
        photo: elaPhoto,
      },
      {
        eyebrow: "For people whose role just ended",
        title: "The TGR Transition Academy",
        desc: "A cohort moving through the five stages together, building real AI agency instead of polishing a resume.",
        url: "TheGreatRepurpose.com/academy/transition",
        color: POPPY,
        photo: taPhoto,
      },
    ];

    const gap = 6;
    const cardW = (contentWidth - gap) / 2;
    const photoH = (cardW * 9) / 16;
    const padX = 5;
    const textW = cardW - padX * 2;

    // Measure the tallest card so both share a height
    doc.setFontSize(9.5);
    const bodyLines = tracks.map((t) => doc.splitTextToSize(t.desc, textW) as string[]);
    const titleLines = tracks.map((t) => {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      return doc.splitTextToSize(t.title, textW) as string[];
    });
    const cardH =
      photoH +
      6 +
      Math.max(
        ...tracks.map(
          (_, i) => 3.8 + titleLines[i].length * 4.8 + 1.5 + bodyLines[i].length * 4.2 + 5.5,
        ),
      ) +
      5;

    ensureSpace(cardH + 24);
    y += 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    setColor(doc, AUBERGINE);
    y = renderWrappedText(
      "Learn About The Great Repurpose Academy",
      0,
      y,
      contentWidth,
      6.5,
      "center",
    );
    y += 4;

    tracks.forEach((t, i) => {
      const cx = margin + i * (cardW + gap);

      doc.setFillColor(255, 255, 255);
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.setLineWidth(0.3);
      doc.roundedRect(cx, y, cardW, cardH, 3, 3, "FD");

      if (t.photo) {
        doc.addImage(t.photo, "JPEG", cx, y, cardW, photoH);
      } else {
        doc.setFillColor(t.color[0], t.color[1], t.color[2]);
        doc.rect(cx, y, cardW, photoH, "F");
      }
      // hairline under the photo
      doc.setDrawColor(RULE[0], RULE[1], RULE[2]);
      doc.line(cx, y + photoH, cx + cardW, y + photoH);

      let ty = y + photoH + 6;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      setColor(doc, t.color);
      doc.text(t.eyebrow.toUpperCase(), cx + padX, ty);
      ty += 5;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      setColor(doc, AUBERGINE);
      doc.text(titleLines[i], cx + padX, ty);
      ty += titleLines[i].length * 4.8 + 1.5;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      setColor(doc, MUTED);
      doc.text(bodyLines[i], cx + padX, ty);
      ty += bodyLines[i].length * 4.2 + 4.5;

      doc.setFontSize(8);
      setColor(doc, INDIGO);
      doc.text(t.url, cx + padX, ty);
    });

    y += cardH + 6;
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
