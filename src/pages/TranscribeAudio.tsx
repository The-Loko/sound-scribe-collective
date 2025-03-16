
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Play, Send, RotateCcw, Headphones, Clock } from 'lucide-react';
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
    <div className="min-h-screen bg-background transition-colors duration-300">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">Transcribe Audio</h1>
        <p className="text-muted-foreground mb-8 text-center text-lg">Listen to the audio and type what you hear</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-md border-2 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <Headphones className="h-5 w-5" />
                Audio Sample
              </CardTitle>
              <CardDescription>Listen carefully and transcribe the audio</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="bg-muted/30 p-6 rounded-md flex flex-col items-center justify-center min-h-[200px] border shadow-sm">
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
                  className="rounded-full w-20 h-20 mb-6 shadow-lg hover:bg-primary/10"
                >
                  <Play className={`h-8 w-8 ${isPlaying ? 'text-primary' : ''}`} />
                </Button>
                
                <p className="text-center text-sm text-muted-foreground">
                  {isPlaying ? "Playing audio..." : "Click to play"}
                </p>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                <div className="bg-primary/10 px-3 py-1 rounded-full flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Duration: <span className="font-medium ml-1">{audioSample.duration}</span>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-full">
                  Language: <span className="font-medium">{audioSample.language.toUpperCase()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border-2 overflow-hidden">
            <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Your Transcription
              </CardTitle>
              <CardDescription>Type what you hear in the audio</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <Textarea
                placeholder="Type the transcription here..."
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                className="min-h-[200px] resize-none shadow-sm border-2 bg-card/50 p-4"
              />
            </CardContent>
            <CardFooter className="flex justify-end space-x-3 p-6 pt-2">
              <Button 
                variant="outline" 
                onClick={handleReset}
                disabled={!transcription || isSubmitting}
                className="shadow-sm"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!transcription || isSubmitting}
                className="shadow-sm"
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
