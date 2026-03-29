"use client";

import { useMemo, useState } from "react";
import {
  MdAccountCircle,
  MdSettings,
  MdBolt,
  MdContentPaste,
  MdDelete,
  MdInfo,
} from "react-icons/md";

export default function TranscriptFallbackScreen() {
  const [transcript, setTranscript] = useState("");

  const wordCount = useMemo(() => {
    const trimmed = transcript.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }, [transcript]);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setTranscript((prev) => (prev ? `${prev}\n${text}` : text));
    } catch {
      // Ignore clipboard errors in unsupported browsers/permissions.
    }
  };

  return (
    <div className="bg-[#f9f6f5] text-[#2f2e2e] min-h-screen flex flex-col">
      <header className="bg-[#f9f6f5] w-full top-0 z-50">
        <nav className="flex justify-between items-center w-full px-6 py-4 max-w-full mx-auto">
          <div className="flex items-center gap-8">
            <span className="text-2xl font-headline font-extrabold tracking-tighter text-[#2f2e2e]">
              KINETIC AI
            </span>
            <div className="hidden md:flex gap-6">
              <a
                className="text-[#5d3fd3] font-bold border-b-2 border-[#5d3fd3] transition-colors duration-200"
                href="#"
              >
                Dashboard
              </a>
              <a
                className="text-[#afacac] hover:text-[#5d3fd3] transition-colors duration-200"
                href="#"
              >
                History
              </a>
              <a
                className="text-[#afacac] hover:text-[#5d3fd3] transition-colors duration-200"
                href="#"
              >
                Library
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              aria-label="Account"
              className="text-[#afacac] hover:text-[#5d3fd3] active:scale-95 transition-transform"
            >
              <MdAccountCircle className="h-5 w-5" />
            </button>
            <button
              aria-label="Settings"
              className="text-[#afacac] hover:text-[#5d3fd3] active:scale-95 transition-transform"
            >
              <MdSettings className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-start justify-center px-6 py-12 md:py-24 max-w-7xl mx-auto w-full">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#ff8cbc]/20 text-[#9b3666] text-xs font-semibold uppercase tracking-widest">
              Manual Intervention Required
            </div>

            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tighter text-[#2f2e2e] leading-none">
              Couldn&apos;t fetch transcript, paste it manually below
            </h1>

            <p className="text-[#5c5b5b] text-lg max-w-md">
              Automated extraction failed for this source. Your content
              high-velocity workflow is just one step away-simply paste the raw
              text to continue.
            </p>

            <div className="pt-8 hidden lg:block">
              <div className="h-1 w-24 bg-[#5d3fd3] rounded-full"></div>
              <div className="mt-4 flex gap-2 items-center">
                <MdBolt className="text-[#9680ff]" />
                <span className="text-sm font-semibold text-[#787676]">
                  KINETIC ENGINE READY
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 w-full">
            <div className="bg-[#f3f0ef] rounded-xl p-1 shadow-sm">
              <div className="bg-white/70 glass-panel rounded-lg p-6 md:p-8">
                <div className="flex items-center justify-between mb-4">
                  <label
                    className="font-headline font-extrabold text-sm tracking-tight text-[#2f2e2e]"
                    htmlFor="transcript-input"
                  >
                    RAW TRANSCRIPT CONTENT
                  </label>
                  <span className="text-xs font-medium text-[#afacac] uppercase tracking-widest">
                    {wordCount} words
                  </span>
                </div>

                <div className="relative group">
                  <textarea
                    id="transcript-input"
                    name="transcript-input"
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    placeholder="Paste your text here..."
                    className="w-full h-80 bg-[#f3f0ef] border-0 rounded-lg p-6 font-body text-[#2f2e2e] placeholder:text-[#787676] focus:ring-2 focus:ring-[#5d3fd3] focus:bg-white transition-all duration-300 resize-none"
                  />

                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-50 group-focus-within:opacity-100 transition-opacity">
                    <button
                      aria-label="Paste transcript"
                      className="p-2 hover:bg-[#eae7e7] rounded-lg text-[#5c5b5b] transition-colors"
                      onClick={handlePaste}
                      type="button"
                    >
                      <MdContentPaste className="text-xl" />
                    </button>
                    <button
                      aria-label="Clear transcript"
                      className="p-2 hover:bg-[#eae7e7] rounded-lg text-[#5c5b5b] transition-colors"
                      onClick={() => setTranscript("")}
                      type="button"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </div>

                <div className="mt-8 flex flex-col md:flex-row items-center justify-end gap-6">
                  <div className="flex items-center gap-2 text-[#afacac] text-xs font-semibold uppercase tracking-widest">
                    <MdInfo className="text-sm" />
                    <span>Markdown and plain text supported</span>
                  </div>
                  <button
                    className="kinetic-gradient text-[#f6f0ff] px-8 py-4 rounded-lg font-headline font-extrabold tracking-tight text-lg shadow-xl shadow-[#5d3fd3]/20 hover:scale-[1.02] active:scale-95 transition-all w-full md:w-auto"
                    type="button"
                  >
                    Generate from Text
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-[#ff8cbc] px-4 py-2 rounded-full shadow-[0_0_10px_rgba(163,145,255,0.3)]">
                <MdBolt className="text-sm text-[#63033a]" />
                <span className="text-xs font-bold text-[#63033a]">
                  AI ENHANCED EXTRACTION ACTIVE
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#f3f0ef] w-full py-12 px-8 mt-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-7xl mx-auto">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="text-sm font-black text-[#2f2e2e] tracking-tighter">
              KINETIC EDITORIAL AI
            </span>
            <p className="text-xs uppercase tracking-widest font-semibold text-[#afacac]">
              © 2024 Kinetic Editorial AI. Built for High-Velocity Creators.
            </p>
          </div>

          <div className="flex gap-8">
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
              href="#"
            >
              Support
            </a>
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
              href="#"
            >
              Privacy
            </a>
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
              href="#"
            >
              Terms
            </a>
            <a
              className="text-xs uppercase tracking-widest font-semibold text-[#afacac] hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
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
