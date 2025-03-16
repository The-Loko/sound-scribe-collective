
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, Send, RotateCcw } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const TranscribeAudio: React.FC = () => {
  const [transcription, setTranscription] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock audio data that would come from the database
  const audioSample = {
    id: "audio-001",
    url: "https://s3.amazonaws.com/dns-audio-samples/speech_test.mp3", // This is a placeholder URL
    language: "en",
    duration: "00:08"
  };
  
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleSubmit = () => {
    if (!transcription.trim()) {
      toast({
        title: "Transcription required",
        description: "Please enter a transcription before submitting",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      toast({
        title: "Transcription submitted",
        description: "Your transcription has been saved successfully"
      });
      setIsSubmitting(false);
      
      // Here you would actually send the transcription to your PostgreSQL database
      // through your API
    }, 1500);
  };

  const handleReset = () => {
    setTranscription('');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Transcribe Audio</h1>
        <p className="text-muted-foreground mb-8">Listen to the audio and type what you hear</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Audio Sample</CardTitle>
              <CardDescription>Listen carefully and transcribe the audio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-6 rounded-md flex flex-col items-center justify-center min-h-[200px]">
                <audio 
                  ref={audioRef}
                  src={audioSample.url}
                  onEnded={handleAudioEnded}
                  className="hidden"
                />
                
                <Button 
                  onClick={handlePlay} 
                  size="lg" 
                  variant="outline"
                  className="rounded-full w-16 h-16 mb-4"
                >
                  <Play className={`h-6 w-6 ${isPlaying ? 'text-primary' : ''}`} />
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  {isPlaying ? "Playing audio..." : "Click to play"}
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Language: <span className="font-medium">{audioSample.language.toUpperCase()}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                Duration: <span className="font-medium">{audioSample.duration}</span>
              </div>
            </CardFooter>
          </Card>
          
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Your Transcription</CardTitle>
              <CardDescription>Type what you hear in the audio</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Type the transcription here..."
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className="min-h-[200px] resize-none"
              />
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={!transcription || isSubmitting}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!transcription || isSubmitting}
              >
                {isSubmitting ? (
                  <>Submitting...</>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TranscribeAudio;
