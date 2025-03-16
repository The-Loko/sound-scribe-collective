
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Mic, Square, Save, RotateCcw } from 'lucide-react';
import AudioVisualizer from '@/components/AudioVisualizer';
import { toast } from '@/components/ui/use-toast';

const RecordAudio: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  
  // Mock transcript data that would come from the database
  const transcript = {
    id: "transcript-001",
    text: "The quick brown fox jumps over the lazy dog. This pangram contains every letter of the English alphabet at least once.",
    language: "en"
  };
  
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const audioChunksRef = React.useRef<Blob[]>([]);
  const timerIntervalRef = React.useRef<number | null>(null);

  React.useEffect(() => {
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
        description: "Your audio recording has been submitted successfully"
      });
      setIsSaving(false);
      resetRecording();
      
      // Here you would actually send the audio to your PostgreSQL database
      // through your API
    }, 1500);
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
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Record Audio</h1>
        <p className="text-muted-foreground mb-8">Read the provided transcript and record your voice</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Transcript to Read</CardTitle>
              <CardDescription>Read this text clearly when recording</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md text-lg leading-relaxed border">
                {transcript.text}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Language: <span className="font-medium">{transcript.language.toUpperCase()}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                ID: <span className="font-medium">{transcript.id}</span>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Audio Recorder</CardTitle>
              <CardDescription>Record yourself reading the transcript</CardDescription>
            </CardHeader>
            <CardContent>
              <AudioVisualizer isRecording={isRecording} audioStream={audioStream} />
              
              <div className="flex flex-col items-center mt-6">
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
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Discard
                      </Button>
                      
                      <Button 
                        onClick={saveRecording} 
                        disabled={isSaving}
                        className="button-transition"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Submit Recording
                      </Button>
                    </div>
                  )}
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
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RecordAudio;
