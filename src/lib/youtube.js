import { YoutubeTranscript } from 'youtube-transcript';

export async function getYoutubeTranscript(url) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(url);
    const fullText = transcript.map(t => t.text).join(' ');
    return { transcript, fullText };
  } catch (error) {
    console.error('YouTube transcript error:', error);
    throw new Error('Failed to extract transcript. Ensure the video has captions enabled.');
  }
}
