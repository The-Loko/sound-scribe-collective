
import React from 'react';
import AudioVisualizer from './AudioVisualizer';
import RecordingControls from './RecordingControls';
import AudioPreview from './AudioPreview';
import { useAudioRecorder } from '@/hooks/useAudioRecorder';

const AudioRecorder: React.FC = () => {
  const {
    isRecording,
    isPaused,
    recordingTime,
    audioStream,
    audioBlob,
    audioUrl,
    isSaving,
    startRecording,
    stopRecording,
    saveRecording,
    resetRecording,
    formatTime
  } = useAudioRecorder();

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border rounded-2xl p-6 shadow-sm animate-fade-in">
        <h2 className="text-xl font-semibold mb-2">Audio Recorder</h2>
        <p className="text-muted-foreground mb-6">Record high-quality audio for your collection</p>
        
        <AudioVisualizer isRecording={isRecording} audioStream={audioStream} />
        
        <RecordingControls
          isRecording={isRecording}
          audioBlob={audioBlob}
          isSaving={isSaving}
          recordingTime={recordingTime}
          formatTime={formatTime}
          onStartRecording={startRecording}
          onStopRecording={stopRecording}
          onSaveRecording={saveRecording}
          onResetRecording={resetRecording}
        />
        
        <AudioPreview audioUrl={audioUrl} />
      </div>
    </div>
  );
};

export default AudioRecorder;
