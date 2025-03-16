
import React from 'react';

interface AudioPreviewProps {
  audioUrl: string | null;
}

const AudioPreview: React.FC<AudioPreviewProps> = ({ audioUrl }) => {
  if (!audioUrl) return null;
  
  return (
    <div className="mt-6 border border-input rounded-lg p-4">
      <p className="text-sm font-medium mb-2">Preview Recording:</p>
      <audio controls className="w-full" src={audioUrl}>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default AudioPreview;
