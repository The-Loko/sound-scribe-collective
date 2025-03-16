
import React from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2, Save } from 'lucide-react';

interface RecordingControlsProps {
  isRecording: boolean;
  audioBlob: Blob | null;
  isSaving: boolean;
  recordingTime: number;
  formatTime: (seconds: number) => string;
  onStartRecording: () => void;
  onStopRecording: () => void;
  onSaveRecording: () => void;
  onResetRecording: () => void;
}

const RecordingControls: React.FC<RecordingControlsProps> = ({
  isRecording,
  audioBlob,
  isSaving,
  recordingTime,
  formatTime,
  onStartRecording,
  onStopRecording,
  onSaveRecording,
  onResetRecording
}) => {
  return (
    <div className="flex items-center justify-center mt-6">
      <div className="text-center">
        <p className="text-2xl font-mono font-semibold mb-4">{formatTime(recordingTime)}</p>
        
        <div className="flex items-center justify-center space-x-4">
          {!isRecording && !audioBlob ? (
            <Button 
              onClick={onStartRecording} 
              size="lg" 
              className="rounded-full w-16 h-16 button-transition animate-pulse-glow"
            >
              <Mic className="h-6 w-6" />
            </Button>
          ) : isRecording ? (
            <Button 
              onClick={onStopRecording} 
              variant="destructive" 
              size="lg" 
              className="rounded-full w-16 h-16 button-transition"
            >
              <Square className="h-6 w-6" />
            </Button>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                onClick={onResetRecording} 
                variant="outline" 
                className="button-transition"
              >
                Discard
              </Button>
              
              <Button 
                onClick={onSaveRecording} 
                disabled={isSaving}
                className="button-transition"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Recording
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecordingControls;
