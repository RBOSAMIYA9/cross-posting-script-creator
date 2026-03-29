"use client";

import { useState } from "react";
import { Player } from "@remotion/player";
import { MyVideo } from "@/remotion/MyVideo";

export default function PreviewRoute() {
  const [script, setScript] = useState("");

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center p-8 font-sans">
      <h1 className="text-3xl font-bold mb-6">Remotion Video Preview</h1>
      
      {/* 
        This is where your teammate will hook up the data from the /api/transcribe route!
        For now, you can just manually type to see the video update instantly.
      */}
      <div className="w-full max-w-2xl mb-8 flex flex-col gap-2">
        <label className="text-neutral-400 font-medium">Test Script Input</label>
        <textarea 
          value={script}
          onChange={(e) => setScript(e.target.value)}
          placeholder="Paste one of the AI generated Reel scripts here..."
          className="w-full h-32 p-4 bg-neutral-900 text-white border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>
      
      <div className="w-full max-w-[360px] rounded-2xl overflow-hidden border-4 border-neutral-800 shadow-2xl bg-black">
        <Player
          component={MyVideo}
          inputProps={{ script }}
          durationInFrames={150} // 5 seconds
          compositionWidth={1080}
          compositionHeight={1920}
          fps={30}
          controls
          style={{ width: "100%", aspectRatio: "9/16" }} 
        />
      </div>
    </div>
  );
}
