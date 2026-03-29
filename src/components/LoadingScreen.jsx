"use client";

import { useEffect, useState } from "react";
import {
  MdAccountCircle,
  MdSettings,
  MdBolt,
  MdVisibility,
  MdEditNote,
  MdMovieEdit,
} from "react-icons/md";

const statusItems = [
  {
    icon: MdVisibility,
    text: "Watching video for you...",
  },
  {
    icon: MdEditNote,
    text: "Writing your LinkedIn posts...",
  },
  {
    icon: MdMovieEdit,
    text: "Crafting your reels...",
  },
];

export default function LoadingScreen() {
  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusItems.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          return 95;
        }

        const next = prev + Math.floor(Math.random() * 7) + 2;
        return next > 95 ? 95 : next;
      });
    }, 650);

    return () => clearInterval(progressTimer);
  }, []);

  const ActiveStatusIcon = statusItems[statusIndex].icon;

  return (
    <div className="bg-[#f9f6f5] text-[#2f2e2e] min-h-screen flex flex-col selection:bg-[#a391ff] selection:text-[#230076]">
      <nav className="bg-[#f9f6f5] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
        <div className="flex items-center gap-8">
          <span className="text-2xl font-extrabold tracking-tighter font-headline">
            KINETIC AI
          </span>
          <div className="hidden md:flex gap-6">
            <a
              className="text-[#afacac] font-medium hover:text-[#5d3fd3] transition-colors duration-200"
              href="#"
            >
              Dashboard
            </a>
            {/* <a
              className="text-[#afacac] font-medium hover:text-[#5d3fd3] transition-colors duration-200"
              href="#"
            >
              History
            </a>
            <a
              className="text-[#afacac] font-medium hover:text-[#5d3fd3] transition-colors duration-200"
              href="#"
            >
              Library
            </a> */}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            aria-label="Account"
            className="text-[#5d3fd3] active:scale-95 transition-transform"
          >
            <MdAccountCircle className="h-5 w-5" />
          </button>
          <button
            aria-label="Settings"
            className="text-[#5d3fd3] active:scale-95 transition-transform"
          >
            <MdSettings className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <main className="flex-grow flex flex-col items-center justify-center px-6 pt-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#5d3fd3] opacity-5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#9b3666] opacity-5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 text-center max-w-md w-full">
          <div className="relative mb-12 flex items-center justify-center h-48">
            <div className="kinetic-loader-ring absolute top-1/2 left-1/2 w-32 h-32 rounded-full border-4 border-[#a391ff]" />
            <div
              className="kinetic-loader-ring absolute top-1/2 left-1/2 w-48 h-48 rounded-full border-2 border-[#5d3fd3] opacity-20"
              style={{ animationDelay: "0.5s" }}
            />
            <div className="kinetic-loader-core w-16 h-16 bg-gradient-to-br from-[#5d3fd3] to-[#a391ff] rounded-xl shadow-2xl flex items-center justify-center rotate-12">
              <MdBolt className="text-[#f6f0ff] text-3xl" />
            </div>
          </div>

          <div className="text-left mb-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-[#9b3666] mb-2 font-label">
              Engine Active
            </p>
            <h1 className="text-5xl font-headline font-extrabold tracking-tighter leading-none">
              High-Velocity <br />
              <span className="text-[#5d3fd3]">Generation</span>
            </h1>
          </div>

          <div className="bg-white/70 backdrop-blur-xl rounded-xl p-8 shadow-[0px_20px_40px_rgba(47,46,46,0.06)] relative overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-grow bg-[#f3f0ef] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-[#5d3fd3] to-[#a391ff] h-full rounded-full transition-[width] duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-bold font-label text-[#5d3fd3]">
                {progress}%
              </span>
            </div>

            <div className="h-6 relative">
              <p
                key={statusItems[statusIndex].text}
                className="status-fade-item absolute inset-0 text-sm font-medium text-[#5c5b5b] flex items-center gap-2 justify-center"
              >
                <ActiveStatusIcon className="text-base" />
                {statusItems[statusIndex].text}
              </p>
            </div>
          </div>

          <div className="mt-12 flex justify-between items-end opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-left">
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Queue Position
              </p>
              <p className="text-3xl font-headline font-extrabold">#04</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold uppercase tracking-widest">
                Est. Time
              </p>
              <p className="text-3xl font-headline font-extrabold">14s</p>
            </div>
          </div>
        </div>

        <div className="hidden lg:block absolute left-12 bottom-24 w-px h-32 bg-gradient-to-b from-transparent via-[#afacac] to-transparent opacity-20" />
        <div className="hidden lg:block absolute right-12 top-32 w-px h-32 bg-gradient-to-b from-transparent via-[#afacac] to-transparent opacity-20" />
      </main>

      <footer className="bg-[#f3f0ef] flex flex-col md:flex-row justify-between items-center gap-6 w-full py-12 px-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="text-sm font-black uppercase tracking-tight font-headline">
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
      </footer>
    </div>
  );
}
