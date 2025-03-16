
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, Square, Loader2, Save } from 'lucide-react';
import AudioVisualizer from './AudioVisualizer';
import { toast } from '@/components/ui/use-toast';

const AudioRecorder: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
      }
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioStream, audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setAudioStream(stream);
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      // Start timer
      timerIntervalRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to record audio",
        variant: "destructive"
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
      }
      setIsRecording(false);
      setIsPaused(false);
      
      // Clear timer
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }
  };

  const saveRecording = async () => {
    if (!audioBlob) return;
    
    setIsSaving(true);
    
    // Simulate saving with a delay
    setTimeout(() => {
      toast({
        title: "Recording saved",
        description: "Your audio recording has been saved successfully"
      });
      setIsSaving(false);
      resetRecording();
    }, 1500);
    
    // In a real application, you would upload the audioBlob to your server here
    // const formData = new FormData();
    // formData.append('audio', audioBlob, 'recording.wav');
    // await fetch('/api/upload-audio', { method: 'POST', body: formData });
  };

  const resetRecording = () => {
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border rounded-2xl p-6 shadow-sm animate-fade-in">
        <h2 className="text-xl font-semibold mb-2">Audio Recorder</h2>
        <p className="text-muted-foreground mb-6">Record high-quality audio for your collection</p>
        
        <AudioVisualizer isRecording={isRecording} audioStream={audioStream} />
        
        <div className="flex items-center justify-center mt-6">
          <div className="text-center">
            <p className="text-2xl font-mono font-semibold mb-4">{formatTime(recordingTime)}</p>
            
            <div className="flex items-center justify-center space-x-4">
              {!isRecording && !audioBlob ? (
                <Button 
                  onClick={startRecording} 
                  size="lg" 
                  className="rounded-full w-16 h-16 button-transition animate-pulse-glow"
                >
                  <Mic className="h-6 w-6" />
                </Button>
              ) : isRecording ? (
                <Button 
                  onClick={stopRecording} 
                  variant="destructive" 
                  size="lg" 
                  className="rounded-full w-16 h-16 button-transition"
                >
                  <Square className="h-6 w-6" />
                </Button>
              ) : (
                <div className="flex items-center space-x-4">
                  <Button 
                    onClick={resetRecording} 
                    variant="outline" 
                    className="button-transition"
                  >
                    Discard
                  </Button>
                  
                  <Button 
                    onClick={saveRecording} 
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
        
        {audioUrl && (
          <div className="mt-6 border border-input rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Preview Recording:</p>
            <audio controls className="w-full" src={audioUrl}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
