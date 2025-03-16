
import { useState, useRef, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface UseAudioRecorderReturn {
  isRecording: boolean;
  isPaused: boolean;
  recordingTime: number;
  audioStream: MediaStream | null;
  audioBlob: Blob | null;
  audioUrl: string | null;
  isSaving: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  saveRecording: () => void;
  resetRecording: () => void;
  formatTime: (seconds: number) => string;
}

export function useAudioRecorder(): UseAudioRecorderReturn {
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

  return {
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
  };
}
