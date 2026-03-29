import { NextResponse } from 'next/server';
import { getYoutubeTranscript } from '@/lib/youtube';
import { generateScripts } from '@/lib/openrouter';

export async function POST(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json(
        { error: 'YouTube URL is required' },
        { status: 400 }
      );
    }

    // 1. Fetch the transcript using our extracted function
    const { transcript, fullText } = await getYoutubeTranscript(url);
    
    // 2. Pass the full transcript text to Gemini to generate the scripts
    const scripts = await generateScripts(fullText);

    return NextResponse.json(
      { 
        success: true, 
        data: scripts
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Transcription/AI error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'YouTube URL is required. Provide it via the ?url= query parameter.' },
      { status: 400 }
    );
  }

  try {
    // 1. Fetch transcript
    const { transcript, fullText } = await getYoutubeTranscript(url);
    
    // 2. Pass transcript to Gemini
    const scripts = await generateScripts(fullText);

    return NextResponse.json(
      { 
        success: true, 
        data: scripts
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Transcription/AI error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred.' },
      { status: 500 }
    );
  }
}
