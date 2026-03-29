"use client";

import { useState } from "react";
import Image from "next/image";
import { MdAccountCircle, MdSettings, MdError, MdLink } from "react-icons/md";

export default function HomeInputScreen({
  onGenerateScripts,
  isSubmitting = false,
  errorMessage = "",
}) {
  const [urlInput, setUrlInput] = useState("");
  const [localError, setLocalError] = useState("");

  const handleGenerateScripts = async () => {
    if (!urlInput.trim()) {
      setLocalError("Please enter a valid YouTube URL");
      return;
    }

    setLocalError("");

    if (typeof onGenerateScripts === "function") {
      await onGenerateScripts(urlInput.trim());
    }
  };

  return (
    <>
      <nav className="bg-[#f9f6f5] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
        <div className="text-2xl font-headline font-extrabold tracking-tighter text-[#2f2e2e]">
          KINETIC AI
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a
            className="text-[#5d3fd3] font-bold border-b-2 border-[#5d3fd3] font-headline tracking-tighter hover:text-[#5d3fd3] transition-colors duration-200"
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
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-[#5d3fd3] active:scale-95 transition-transform">
            <MdAccountCircle className="h-5 w-5" />
          </button>
          <button className="material-symbols-outlined text-[#5d3fd3] active:scale-95 transition-transform">
            <MdSettings className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <main className="pt-24 pb-12 overflow-x-hidden">
        <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-32 flex flex-col items-start relative">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#a391ff]/20 rounded-full blur-[100px] -z-10"></div>

          <div className="w-full max-w-4xl">
            <span className="text-[#9b3666] font-body text-xs uppercase tracking-widest font-semibold mb-4 block">
              Engineered for Velocity
            </span>

            <h1 className="text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-[#2f2e2e] leading-[0.95] mb-8">
              Turn YouTube videos into LinkedIn posts and Reels{" "}
              <span className="text-[#5d3fd3]">in seconds</span>.
            </h1>

            <p className="text-[#5c5b5b] text-lg md:text-xl font-body max-w-2xl mb-12">
              {"Our AI extracts the core insights from any video and reformats them for your audience's favorite platforms. Fast, focused, and frictionless."}
            </p>

            <div className="w-full max-w-2xl">
              <div className="bg-[#f3f0ef] p-2 rounded-xl flex flex-col md:flex-row gap-2 kinetic-shadow transition-all duration-300 focus-within:bg-white focus-within:ring-2 ring-[#5d3fd3]/20">
                <div className="flex-grow flex items-center px-4 py-3 bg-white rounded-lg border border-transparent focus-within:border-[#5d3fd3]/30 transition-all">
                  <span className="material-symbols-outlined text-[#787676] mr-3">
                    <MdLink className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    placeholder="Paste YouTube URL here..."
                    className="bg-transparent border-none focus:ring-0 w-full font-body text-[#2f2e2e] placeholder:text-[#afacac]"
                  />
                </div>
                <button
                  onClick={handleGenerateScripts}
                  disabled={isSubmitting || !urlInput.trim()}
                  className="kinetic-gradient text-white font-headline font-bold px-8 py-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#5d3fd3]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Generate Scripts
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    bolt
                  </span>
                </button>
              </div>

              <div className="mt-4 flex gap-4 items-center">
                <span className="text-label text-xs text-[#787676] font-semibold uppercase tracking-wider">
                  Popular now:
                </span>
                <div className="flex gap-2">
                  <span className="bg-[#ff8cbc]/20 text-[#8c2a5a] text-[10px] font-bold px-3 py-1 rounded-full border border-[#ff8cbc]/30 kinetic-shadow">
                    PODCAST REPURPOSING
                  </span>
                  <span className="bg-[#a391ff]/20 text-[#5130c6] text-[10px] font-bold px-3 py-1 rounded-full border border-[#a391ff]/30 kinetic-shadow">
                    REEL HOOKS
                  </span>
                </div>
              </div>

              {(localError || errorMessage) && (
                <div className="mt-4 flex items-center gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                  <MdError className="text-red-600 flex-shrink-0" />
                  <span className="text-red-700 text-sm font-body">
                    {localError || errorMessage}
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#f3f0ef] py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-headline font-extrabold tracking-tighter text-[#2f2e2e] mb-4">
                The new standard for content workflows.
              </h2>
              <div className="h-1 w-20 bg-[#5d3fd3]"></div>
            </div>
            <div className="md:col-span-2 grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-8 rounded-xl kinetic-shadow text-center">
                <div className="text-4xl font-headline font-extrabold text-[#5d3fd3] mb-1">
                  1.2M
                </div>
                <div className="text-[10px] font-bold text-[#787676] uppercase tracking-widest">
                  Scripts Generated
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl kinetic-shadow text-center">
                <div className="text-4xl font-headline font-extrabold text-[#5d3fd3] mb-1">
                  45s
                </div>
                <div className="text-[10px] font-bold text-[#787676] uppercase tracking-widest">
                  Avg Process Time
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl kinetic-shadow text-center">
                <div className="text-4xl font-headline font-extrabold text-[#5d3fd3] mb-1">
                  98%
                </div>
                <div className="text-[10px] font-bold text-[#787676] uppercase tracking-widest">
                  Accuracy Rating
                </div>
              </div>
              <div className="bg-white p-8 rounded-xl kinetic-shadow text-center">
                <div className="text-4xl font-headline font-extrabold text-[#5d3fd3] mb-1">
                  15+
                </div>
                <div className="text-[10px] font-bold text-[#787676] uppercase tracking-widest">
                  Export Formats
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto py-32 px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 grid-rows-2 gap-6 h-auto md:h-[600px]">
            <div className="md:col-span-7 md:row-span-2 bg-white rounded-xl overflow-hidden relative group border border-[#e5e2e1] kinetic-shadow">
              <Image
                alt="Repurposing visualization"
                className="w-full h-full object-cover grayscale opacity-20 group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCKvWchtRw9Ea0T-I1cuf6Zj_fkHoigKFUKqBmbbcsQlukIOEKFtiekFEMgZNbWwRE86EAK2OC1xZZ_wauo2ISuIY_ynndSo_ZqWHDWcyLZ7Hb0BljOPLW86QCH0hsCEi04KRiWXIGbb49rjt_feGahLzRGaC-9pyVdC72wpGjUqR5vosSrH5i4j0zhfDobkhZXA-j0aGQqdTyVAMc1TTD_E26a9R9c-Kd6GN5gQIBWbYxBWX-4AbcB3k-TGruEbfdfN0a_7XXpdsgj"
                width={1200}
                height={900}
                unoptimized
              />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h3 className="text-4xl font-headline font-extrabold tracking-tighter text-[#2f2e2e] mb-4">
                  Smart Narrative Extraction
                </h3>
                <p className="text-[#5c5b5b] font-body max-w-md">
                  {"Our neural engine doesn't just transcribe—it understands the hook, the tension, and the climax of your video to craft perfect posts."}
                </p>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#a391ff]/10 rounded-xl p-10 flex flex-col justify-center border border-[#a391ff]/20">
              <span className="material-symbols-outlined text-[#5d3fd3] text-4xl mb-4">
                speed
              </span>
              <h3 className="text-2xl font-headline font-extrabold tracking-tighter text-[#2f2e2e] mb-2">
                High-Velocity Output
              </h3>
              <p className="text-[#5c5b5b] font-body text-sm">
                {"Download your LinkedIn threads, Reels scripts, and X posts instantly after processing."}
              </p>
            </div>

            <div className="md:col-span-5 bg-[#ff8cbc]/10 rounded-xl p-10 flex flex-col justify-center border border-[#ff8cbc]/20">
              <span className="material-symbols-outlined text-[#9b3666] text-4xl mb-4">
                hub
              </span>
              <h3 className="text-2xl font-headline font-extrabold tracking-tighter text-[#2f2e2e] mb-2">
                Multi-Platform Sync
              </h3>
              <p className="text-[#5c5b5b] font-body text-sm">
                {"Direct integrations with your favorite scheduling tools to keep your pipeline moving at light speed."}
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#f3f0ef] w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm font-black text-[#2f2e2e]">
          KINETIC EDITORIAL AI
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          <a
            className="text-[#afacac] font-body text-xs uppercase tracking-widest font-semibold hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
            href="#"
          >
            Support
          </a>
          <a
            className="text-[#afacac] font-body text-xs uppercase tracking-widest font-semibold hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
            href="#"
          >
            Privacy
          </a>
          <a
            className="text-[#afacac] font-body text-xs uppercase tracking-widest font-semibold hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
            href="#"
          >
            Terms
          </a>
          <a
            className="text-[#afacac] font-body text-xs uppercase tracking-widest font-semibold hover:text-[#9b3666] transition-colors duration-300 opacity-80 hover:opacity-100"
            href="#"
          >
            API
          </a>
        </div>
        <div className="text-[#afacac] font-body text-xs uppercase tracking-widest font-semibold">
          © 2024 Kinetic Editorial AI. Built for High-Velocity Creators.
        </div>
      </footer>
    </>
  );
}
