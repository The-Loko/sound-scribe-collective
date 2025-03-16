
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileUp, Upload, FileText, Plus, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

interface TranscriptUploadFormValues {
  language: string;
  transcriptionText: string;
}

interface AudioUploadFormValues {
  language: string;
  transcriptionId: string;
  speakerName: string;
  speakerId: string;
  gender: string;
  country: string;
  state: string;
  city: string;
  ageGroup: string;
  accent: string;
}

const AdminUpload: React.FC = () => {
  const [uploadingTranscript, setUploadingTranscript] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  
  // Mock data for recent transcripts
  const recentTranscripts = [
    { id: 'tr-001', language: 'en', text: 'The quick brown fox jumps...', uploadedAt: '2023-06-10' },
    { id: 'tr-002', language: 'es', text: 'El zorro marrón rápido...', uploadedAt: '2023-06-09' },
    { id: 'tr-003', language: 'fr', text: 'Le rapide renard brun...', uploadedAt: '2023-06-08' },
  ];
  
  // Mock data for recent audio files
  const recentAudioFiles = [
    { id: 'au-001', filename: 'speech_sample_1.wav', transcriptionId: 'tr-001', speakerId: 'sp-001', uploadedAt: '2023-06-10' },
    { id: 'au-002', filename: 'speech_sample_2.mp3', transcriptionId: 'tr-002', speakerId: 'sp-002', uploadedAt: '2023-06-09' },
    { id: 'au-003', filename: 'speech_sample_3.wav', transcriptionId: 'tr-001', speakerId: 'sp-003', uploadedAt: '2023-06-08' },
  ];
  
  const transcriptForm = useForm<TranscriptUploadFormValues>({
    defaultValues: {
      language: 'en',
      transcriptionText: '',
    }
  });
  
  const audioForm = useForm<AudioUploadFormValues>({
    defaultValues: {
      language: 'en',
      transcriptionId: '',
      speakerName: '',
      speakerId: '',
      gender: '',
      country: '',
      state: '',
      city: '',
      ageGroup: '',
      accent: '',
    }
  });
  
  const handleTranscriptFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setTranscriptFile(e.target.files[0]);
    }
  };
  
  const handleAudioFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAudioFile(e.target.files[0]);
    }
  };
  
  const onTranscriptSubmit = (data: TranscriptUploadFormValues) => {
    setUploadingTranscript(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      toast({
        title: "Transcript uploaded",
        description: "Your transcript has been uploaded successfully"
      });
      setUploadingTranscript(false);
      setTranscriptFile(null);
      transcriptForm.reset();
      
      // Here you would actually send the transcript to your PostgreSQL database
      // through your API
    }, 1500);
  };
  
  const onAudioSubmit = (data: AudioUploadFormValues) => {
    if (!audioFile) {
      toast({
        title: "Audio file required",
        description: "Please select an audio file to upload",
        variant: "destructive"
      });
      return;
    }
    
    setUploadingAudio(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      toast({
        title: "Audio uploaded",
        description: "Your audio file has been uploaded successfully"
      });
      setUploadingAudio(false);
      setAudioFile(null);
      audioForm.reset();
      
      // Here you would actually send the audio to your PostgreSQL database
      // through your API
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-6">Admin Upload</h1>
        <p className="text-muted-foreground mb-8">Upload transcripts and audio files for collection</p>
        
        <Tabs defaultValue="transcript" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="transcript">Upload Transcript</TabsTrigger>
            <TabsTrigger value="audio">Upload Audio</TabsTrigger>
          </TabsList>
          
          <TabsContent value="transcript">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Upload Transcript</CardTitle>
                  <CardDescription>Add a new transcription to the database</CardDescription>
                </CardHeader>
                <Form {...transcriptForm}>
                  <form onSubmit={transcriptForm.handleSubmit(onTranscriptSubmit)}>
                    <CardContent className="space-y-4">
                      <FormField
                        control={transcriptForm.control}
                        name="language"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Language</FormLabel>
                            <FormControl>
                              <Input placeholder="en" {...field} />
                            </FormControl>
                            <FormDescription>
                              Language code (e.g., en, es, fr)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={transcriptForm.control}
                        name="transcriptionText"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Transcription Text</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter transcription text here..." 
                                className="min-h-[150px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="space-y-2">
                        <FormLabel>Upload Transcript File (Optional)</FormLabel>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept=".txt,.csv"
                            onChange={handleTranscriptFileChange}
                            className="flex-1"
                          />
                        </div>
                        <FormDescription>
                          You can upload a file or enter the text manually
                        </FormDescription>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        disabled={uploadingTranscript}
                        className="w-full"
                      >
                        {uploadingTranscript ? (
                          "Uploading..."
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Upload Transcript
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Recent Transcripts</CardTitle>
                  <CardDescription>
                    Recently uploaded transcriptions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead>Preview</TableHead>
                        <TableHead>Uploaded</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTranscripts.map((transcript) => (
                        <TableRow key={transcript.id}>
                          <TableCell className="font-medium">{transcript.id}</TableCell>
                          <TableCell>{transcript.language}</TableCell>
                          <TableCell className="truncate max-w-[150px]">{transcript.text}</TableCell>
                          <TableCell>{transcript.uploadedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="audio">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Upload Audio</CardTitle>
                  <CardDescription>Add a new audio recording to the database</CardDescription>
                </CardHeader>
                <Form {...audioForm}>
                  <form onSubmit={audioForm.handleSubmit(onAudioSubmit)}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <FormLabel>Audio File</FormLabel>
                        <div className="flex items-center gap-2">
                          <Input
                            type="file"
                            accept="audio/*"
                            onChange={handleAudioFileChange}
                            className="flex-1"
                          />
                        </div>
                        {audioFile && (
                          <div className="text-sm text-muted-foreground">
                            Selected: {audioFile.name} ({Math.round(audioFile.size / 1024)} KB)
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={audioForm.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Language</FormLabel>
                              <FormControl>
                                <Input placeholder="en" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="transcriptionId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Transcript ID</FormLabel>
                              <FormControl>
                                <Input placeholder="tr-001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="speakerName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Speaker Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="speakerId"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Speaker ID</FormLabel>
                              <FormControl>
                                <Input placeholder="sp-001" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <Input placeholder="Male/Female/Other" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="ageGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age Group</FormLabel>
                              <FormControl>
                                <Input placeholder="18-30" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              <FormControl>
                                <Input placeholder="United States" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="state"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>State/Region</FormLabel>
                              <FormControl>
                                <Input placeholder="California" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input placeholder="San Francisco" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={audioForm.control}
                          name="accent"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Accent</FormLabel>
                              <FormControl>
                                <Input placeholder="General American" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        type="submit" 
                        disabled={uploadingAudio || !audioFile}
                        className="w-full"
                      >
                        {uploadingAudio ? (
                          "Uploading..."
                        ) : (
                          <>
                            <FileUp className="mr-2 h-4 w-4" />
                            Upload Audio
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </form>
                </Form>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Recent Audio Files</CardTitle>
                  <CardDescription>
                    Recently uploaded audio recordings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Filename</TableHead>
                        <TableHead>Transcript ID</TableHead>
                        <TableHead>Uploaded</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAudioFiles.map((audio) => (
                        <TableRow key={audio.id}>
                          <TableCell className="font-medium">{audio.id}</TableCell>
                          <TableCell className="truncate max-w-[150px]">{audio.filename}</TableCell>
                          <TableCell>{audio.transcriptionId}</TableCell>
                          <TableCell>{audio.uploadedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminUpload;
