"use client";

import { useState } from "react";
import {
  MdAccountCircle,
  MdSettings,
  MdRefresh,
  MdArticle,
  MdMovie,
  MdContentCopy,
  MdCheckCircle,
} from "react-icons/md";

const defaultLinkedInDrafts = [
  {
    id: "Draft #1",
    accent: "border-[#5d3fd3]",
    body: `The future of high-velocity creation isn't just about speed. It's about kinetic energy.

Most teams treat content as a static output. But in 2024, content is a living engine.

We've just launched Kinetic AI to help you build that engine. Here's how:
1. Editorial precision at scale.
2. Frictionless script-to-visual workflows.
3. Command-line speed for creators.

Stop building templates. Start building momentum.

#AI #CreatorEconomy #Velocity`,
  },
  {
    id: "Draft #2",
    accent: "border-[#5d3fd3]/40",
    body: `Content friction is the silent killer of growth.

If your team spends 4 hours formatting a single post, you've already lost the attention war.

Kinetic AI was built for the 10x creators who value their time above everything else.

Generate
Edit
Deploy

Repeat until you're the loudest voice in the room.`,
  },
  {
    id: "Draft #3",
    accent: "border-[#5d3fd3]/20",
    body: `Why do 90% of AI-generated posts sound like a robot wrote them?

Because they lack the "Kinetic Pulse."

Our new engine doesn't just predict the next word. It understands the rhythm of an editorial headline. It knows when to breathe and when to punch.

Experience the difference today. Link in bio.`,
  },
];

const defaultReels = [
  {
    hook: "Stop wasting hours on content that no one reads.",
    script:
      "[Voiceover] You're scrolling, I'm scrolling, everyone's scrolling. But who's creating? The bottleneck isn't ideas, it's execution. Kinetic AI turns your rough thoughts into high-velocity editorial assets in seconds.",
    cta: "Hit the link in bio to join the beta.",
    visuals: [
      "Fast jump-cuts between desk and city.",
      "Kinetic text overlays in purple.",
      "Lofi high-tempo background track.",
    ],
  },
  {
    hook: "This AI tool actually writes like a human.",
    script:
      "[Voiceover] Most AI is robotic. It's boring. It's safe. We built something different. We trained Kinetic AI on premium editorial archives to give you that high-fashion, high-impact voice.",
    cta: "Comment 'KINETIC' for a trial key.",
    visuals: [
      "Macro shots of keyboard typing.",
      "Splitscreen: Old way vs Kinetic way.",
      "Soft film grain overlay throughout.",
    ],
  },
  {
    hook: "How I scaled my content without a team.",
    script:
      "[Voiceover] Scaling is usually expensive. You need editors, writers, and designers. Or, you just need a better engine. Kinetic AI is the secret weapon for solo creators going 100mph.",
    cta: "Check out the link in bio for more.",
    visuals: [
      "Direct to camera address, wide lens.",
      "Dynamic progress bars filling up.",
      "Warm evening lighting in home studio.",
    ],
  },
];

export default function ResultsDashboardScreen({
  scriptsData,
  sourceUrl: sourceUrlProp = "",
  onRegenerate = () => {},
}) {
  const [copiedKey, setCopiedKey] = useState("");
  const [copyError, setCopyError] = useState("");

  const copyToClipboard = async (text, key) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopyError("");
      setCopiedKey(key);
      setTimeout(() => {
        setCopiedKey((prev) => (prev === key ? "" : prev));
      }, 1600);
    } catch (error) {
      console.error("Copy failed:", error);
      setCopyError("Unable to copy. Please try again.");
    }
  };

  const formatReelForCopy = (reel) => {
    const visuals =
      Array.isArray(reel.visuals) && reel.visuals.length > 0
        ? reel.visuals.map((item) => `- ${item}`).join("\n")
        : "- No visual direction provided";

    return [
      `Hook: ${reel.hook}`,
      "",
      `Script: ${reel.script}`,
      "",
      `Call to Action: ${reel.cta || "N/A"}`,
      "",
      "Visual Direction:",
      visuals,
    ].join("\n");
  };

  const extractSection = (text, label) => {
    const regex = new RegExp(
      `\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=\\n\\n\\*\\*[A-Za-z ]+:\\*\\*|$)`,
      "i",
    );
    const match = text.match(regex);
    return match ? match[1].trim() : "";
  };

  const parseReelText = (rawText) => {
    const hook = extractSection(rawText, "Hook");
    const script = extractSection(rawText, "Script");
    const visualsRaw = extractSection(rawText, "Visuals");

    const visuals = visualsRaw
      ? visualsRaw
          .split(/\n+/)
          .map((line) => line.replace(/^[-*]\s*/, "").trim())
          .filter(Boolean)
      : [];

    return {
      hook: hook || "Generated reel",
      script: script || rawText,
      cta: "",
      visuals,
    };
  };

  // Validate and normalize reel data to ensure visuals array exists
  const normalizeReels = (rawReels) => {
    return rawReels.map((reel) => {
      if (typeof reel === "string") {
        return parseReelText(reel);
      }

      return {
        hook: reel?.hook || "Generated reel",
        script: reel?.script || "",
        cta: reel?.cta || "",
        visuals: Array.isArray(reel?.visuals) ? reel.visuals : [],
      };
    });
  };

  // Validate and normalize draft data
  const normalizeDrafts = (rawDrafts) => {
    return rawDrafts.map((draft, index) => {
      if (typeof draft === "string") {
        return {
          id: `Draft #${index + 1}`,
          accent: "border-[#5d3fd3]",
          body: draft,
        };
      }

      return {
        id: draft?.id || `Draft #${index + 1}`,
        accent: draft?.accent || "border-[#5d3fd3]",
        body: draft?.body || "",
      };
    });
  };

  const linkedinData = scriptsData?.linkedInDrafts || scriptsData?.linkedin;
  const reelsData = scriptsData?.reels;

  const linkedInDrafts = Array.isArray(linkedinData)
    ? normalizeDrafts(linkedinData)
    : defaultLinkedInDrafts;

  const reels = Array.isArray(reelsData)
    ? normalizeReels(reelsData)
    : defaultReels;
  const sourceUrl = sourceUrlProp;

  return (
    <div className="bg-[#f9f6f5] text-[#2f2e2e] min-h-screen font-body">
      <nav className="bg-[#f9f6f5] flex justify-between items-center w-full px-6 py-4 max-w-full mx-auto fixed top-0 z-50">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-headline font-extrabold tracking-tighter text-[#2f2e2e]">
            KINETIC AI
          </span>
          <div className="hidden md:flex gap-6 items-center">
            <a
              className="text-[#5d3fd3] font-headline font-bold border-b-2 border-[#5d3fd3] transition-colors duration-200"
              href="#"
            >
              Dashboard
            </a>
            <a
              className="text-[#afacac] font-headline font-extrabold tracking-tighter hover:text-[#5d3fd3] transition-colors duration-200"
              href="#"
            >
              History
            </a>
            <a
              className="text-[#afacac] font-headline font-extrabold tracking-tighter hover:text-[#5d3fd3] transition-colors duration-200"
              href="#"
            >
              Library
            </a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Account"
            className="text-[#afacac] hover:text-[#5d3fd3] transition-colors duration-200 active:scale-95 transition-transform"
          >
            <MdAccountCircle className="text-xl" />
          </button>
          <button
            aria-label="Settings"
            className="text-[#afacac] hover:text-[#5d3fd3] transition-colors duration-200 active:scale-95 transition-transform"
          >
            <MdSettings className="text-xl" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <div className="sticky top-20 z-40 mb-12 bg-white/75 backdrop-blur-xl shadow-[0px_20px_40px_rgba(47,46,46,0.06)] rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col">
              <span className="text-[#9b3666] text-[10px] uppercase tracking-widest font-bold mb-1">
                Status: generation complete
              </span>
              <h1 className="text-2xl font-headline font-extrabold tracking-tight text-[#2f2e2e]">
                Campaign Results
              </h1>
              {sourceUrl ? (
                <span className="text-xs text-[#787676] mt-1 truncate max-w-[420px]">
                  Source: {sourceUrl}
                </span>
              ) : null}
              {copyError ? (
                <span className="text-xs text-red-600 mt-1">{copyError}</span>
              ) : null}
            </div>
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-5 py-2.5 bg-[#dfdcdc] text-[#2f2e2e] font-bold rounded-lg hover:bg-[#e5e2e1] transition-colors text-sm"
                type="button"
                onClick={onRegenerate}
              >
                <MdRefresh className="text-lg" />
                Regenerate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <section className="lg:col-span-5 space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#a391ff]/20 rounded-lg">
                  <MdArticle className="text-[#5d3fd3]" />
                </div>
                <h2 className="text-4xl font-headline font-extrabold tracking-tighter">
                  LinkedIn Posts
                </h2>
              </div>

              {linkedInDrafts.map((draft, index) => (
                <div
                  key={`${draft.id}-${index}`}
                  className={`bg-white rounded-xl p-6 shadow-[0px_20px_40px_rgba(47,46,46,0.06)] border-l-4 ${draft.accent} group hover:translate-x-1 transition-transform`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="bg-[#5d3fd3]/10 text-[#5d3fd3] text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                      {draft.id}
                    </span>
                    <button
                      aria-label={`Copy ${draft.id}`}
                      className="p-2 text-[#787676] hover:text-[#5d3fd3] transition-colors"
                      type="button"
                      onClick={() =>
                        copyToClipboard(draft.body, `linkedin-${index}`)
                      }
                    >
                      <MdContentCopy />
                    </button>
                  </div>

                  <p className="text-[#2f2e2e] leading-relaxed text-sm mb-6 whitespace-pre-wrap">
                    {draft.body}
                  </p>

                  <button
                    className="w-full py-3 bg-[#f3f0ef] text-[#2f2e2e] font-bold text-xs uppercase tracking-widest rounded-lg group-hover:bg-[#a391ff]/20 group-hover:text-[#5d3fd3] transition-colors"
                    type="button"
                    onClick={() =>
                      copyToClipboard(draft.body, `linkedin-${index}`)
                    }
                  >
                    {copiedKey === `linkedin-${index}`
                      ? "Copied"
                      : "Copy to Clipboard"}
                  </button>
                </div>
              ))}
            </section>

            <section className="lg:col-span-7 space-y-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-[#ff8cbc]/20 rounded-lg">
                  <MdMovie className="text-[#9b3666]" />
                </div>
                <h2 className="text-4xl font-headline font-extrabold tracking-tighter">
                  Instagram Reels
                </h2>
              </div>

              {reels.map((reel, index) => (
                <div
                  key={`${reel.hook}-${index}`}
                  className="bg-white rounded-xl p-8 shadow-[0px_20px_40px_rgba(47,46,46,0.06)] space-y-6 relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4">
                    <button
                      aria-label={`Copy reel for ${reel.hook}`}
                      className="bg-[#f3f0ef] p-2 rounded-lg hover:bg-[#a391ff]/20 hover:text-[#5d3fd3] transition-all"
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          formatReelForCopy(reel),
                          `reel-${index}`,
                        )
                      }
                    >
                      {copiedKey === `reel-${index}` ? (
                        <MdCheckCircle className="text-[#5d3fd3]" />
                      ) : (
                        <MdContentCopy />
                      )}
                    </button>
                  </div>

                  <div>
                    <span className="text-[10px] text-[#9b3666] font-bold uppercase tracking-widest block mb-2">
                      The Hook
                    </span>
                    <p className="text-2xl font-headline font-extrabold bg-[#ff8cbc]/20 p-4 rounded-lg border-l-4 border-[#9b3666]">
                      &quot;{reel.hook}&quot;
                    </p>
                  </div>

                  <div className="grid">
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] text-[#787676] font-bold uppercase tracking-widest block mb-1">
                          Script Draft
                        </span>
                        <p className="text-sm text-[#5c5b5b] leading-relaxed">
                          {reel.script}
                        </p>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#787676] font-bold uppercase tracking-widest block mb-1">
                          Call to Action
                        </span>
                        <p className="text-sm font-bold text-[#2f2e2e] italic">
                          &quot;{reel.cta}&quot;
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>

      <footer className="bg-[#f3f0ef] py-12 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-7xl mx-auto">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-black text-[#2f2e2e]">
              KINETIC EDITORIAL AI
            </span>
            <span className="text-xs uppercase tracking-widest font-semibold text-[#afacac]">
              © 2024 Kinetic Editorial AI. Built for High-Velocity Creators.
            </span>
          </div>

          <div className="flex gap-8">
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300"
              href="#"
            >
              Support
            </a>
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300"
              href="#"
            >
              API
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
