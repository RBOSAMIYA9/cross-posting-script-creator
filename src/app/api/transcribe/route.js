import { NextResponse } from "next/server";
import { getYoutubeTranscript } from "@/lib/youtube";
import { generateScripts } from "@/lib/openrouter";

export async function POST(req) {
  try {
    const { url, text } = await req.json();

    if (!url && !text) {
      return NextResponse.json(
        { error: "Either YouTube URL or text content is required" },
        { status: 400 },
      );
    }

    let fullText;

    // 1. Fetch the transcript from URL or use provided text
    if (url) {
      const { fullText: transcriptText } = await getYoutubeTranscript(url);
      fullText = transcriptText;
    } else if (text) {
      fullText = text;
    }

    // 2. Pass the full transcript text to Gemini to generate the scripts
    const scripts = await generateScripts(fullText);

    return NextResponse.json(
      {
        success: true,
        data: scripts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Transcription/AI error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 },
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const text = searchParams.get("text");

  if (!url && !text) {
    return NextResponse.json(
      {
        error:
          "Either YouTube URL or text content is required. Provide via ?url= or ?text= query parameters.",
      },
      { status: 400 },
    );
  }

  try {
    let fullText;

    // 1. Fetch transcript from URL or use provided text
    if (url) {
      const { fullText: transcriptText } = await getYoutubeTranscript(url);
      fullText = transcriptText;
    } else if (text) {
      fullText = text;
    }

    // 2. Pass transcript to Gemini
    const scripts = await generateScripts(fullText);

    return NextResponse.json(
      {
        success: true,
        data: scripts,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Transcription/AI error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
