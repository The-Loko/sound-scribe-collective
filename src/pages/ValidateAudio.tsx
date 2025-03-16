
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, CheckCircle, XCircle, Forward } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ValidateAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Mock data that would come from the database
  const validationItem = {
    id: "val-001",
    audioUrl: "https://s3.amazonaws.com/dns-audio-samples/speech_test.mp3", // This is a placeholder URL
    transcription: "The quick brown fox jumps over the lazy dog.",
    language: "en",
    speakerId: "speaker-123",
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

  const handleValidate = (isValid: boolean) => {
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      toast({
        title: isValid ? "Recording validated" : "Recording rejected",
        description: isValid 
          ? "You've marked this recording as valid" 
          : "You've marked this recording as invalid"
      });
      setIsSubmitting(false);
      
      // Here you would actually send the validation result to your PostgreSQL database
      // through your API
    }, 1000);
  };

  const handleSkip = () => {
    toast({
      title: "Skipped",
      description: "You've skipped this validation task"
    });
    
    // Here you would actually fetch the next validation task from your PostgreSQL database
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Validate Audio</h1>
        <p className="text-muted-foreground mb-8">Listen to the audio and verify if it matches the transcription</p>
        
        <Card className="shadow-md max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Validation Task #{validationItem.id}</CardTitle>
            <CardDescription>
              Verify that the audio matches the transcription accurately
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-muted p-6 rounded-md flex flex-col items-center justify-center min-h-[150px]">
              <audio 
                ref={audioRef}
                src={validationItem.audioUrl}
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
            
            <div className="bg-secondary/20 p-4 rounded-md border">
              <h3 className="text-sm font-medium mb-2">Transcription:</h3>
              <p className="text-lg leading-relaxed">{validationItem.transcription}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-muted p-3 rounded-md">
                <span className="font-medium">Language:</span> {validationItem.language.toUpperCase()}
              </div>
              <div className="bg-muted p-3 rounded-md">
                <span className="font-medium">Duration:</span> {validationItem.duration}
              </div>
              <div className="bg-muted p-3 rounded-md">
                <span className="font-medium">Speaker ID:</span> {validationItem.speakerId}
              </div>
              <div className="bg-muted p-3 rounded-md">
                <span className="font-medium">Assignment ID:</span> {validationItem.id}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4 pt-4">
            <Button 
              variant="destructive" 
              onClick={() => handleValidate(false)} 
              disabled={isSubmitting}
              className="w-32"
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSkip} 
              disabled={isSubmitting}
              className="w-32"
            >
              <Forward className="mr-2 h-4 w-4" />
              Skip
            </Button>
            <Button 
              variant="default" 
              onClick={() => handleValidate(true)} 
              disabled={isSubmitting}
              className="w-32"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ValidateAudio;
