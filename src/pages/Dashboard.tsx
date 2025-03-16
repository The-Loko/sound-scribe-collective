
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import AudioList from '@/components/AudioList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, X, BarChart2, FileAudio, Users, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { toast } from '@/components/ui/use-toast';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { useIsMobile } from '@/hooks/use-mobile';

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

const Dashboard: React.FC = () => {
  const isMobile = useIsMobile();
  const [currentTab, setCurrentTab] = useState('overview');
  const [uploadingTranscript, setUploadingTranscript] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [transcriptFile, setTranscriptFile] = useState<File | null>(null);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  
  // Mock data for dashboard
  const statistics = {
    totalRecordings: 126,
    validated: 84,
    pending: 32,
    rejected: 10,
    totalDuration: '4h 23m',
    contributors: 18
  };
  
  // Mock data for audio recordings
  const pendingRecordings = [
    {
      id: '1',
      name: 'Nature Sounds.wav',
      duration: '2:48',
      date: 'Today, 5:30 PM',
      status: 'pending' as const
    },
    {
      id: '2',
      name: 'Voice Sample 02.mp3',
      duration: '1:05',
      date: 'Today, 3:15 PM',
      status: 'pending' as const
    },
    {
      id: '3',
      name: 'Podcast Intro.wav',
      duration: '0:47',
      date: 'Yesterday',
      status: 'pending' as const
    },
    {
      id: '4',
      name: 'Street Ambient.mp3',
      duration: '3:22',
      date: '2 days ago',
      status: 'pending' as const
    }
  ];
  
  const validatedRecordings = [
    {
      id: '5',
      name: 'Studio Recording 01.wav',
      duration: '4:15',
      date: 'Yesterday',
      status: 'validated' as const
    },
    {
      id: '6',
      name: 'Sample Dialog.mp3',
      duration: '1:38',
      date: '3 days ago',
      status: 'validated' as const
    },
    {
      id: '7',
      name: 'Musical Sample.wav',
      duration: '2:57',
      date: 'Last week',
      status: 'validated' as const
    }
  ];
  
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
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4">
        <header className="mb-12">
          <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor and manage your audio collection
          </p>
        </header>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recordings">Recordings</TabsTrigger>
            <TabsTrigger value="admin">Admin Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Recordings</CardTitle>
                  <FileAudio className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.totalRecordings}</div>
                  <p className="text-xs text-muted-foreground">{statistics.totalDuration} total duration</p>
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Validated</CardTitle>
                  <Check className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.validated}</div>
                  <Progress value={statistics.validated / statistics.totalRecordings * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Pending</CardTitle>
                  <Clock className="h-4 w-4 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.pending}</div>
                  <Progress value={statistics.pending / statistics.totalRecordings * 100} className="h-2 mt-2" />
                </CardContent>
              </Card>
              
              <Card className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Contributors</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{statistics.contributors}</div>
                  <p className="text-xs text-muted-foreground">Active participants</p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Recent Transcripts</CardTitle>
                  <CardDescription>
                    Recently uploaded transcriptions
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Language</TableHead>
                        <TableHead className="hidden md:table-cell">Preview</TableHead>
                        <TableHead>Uploaded</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTranscripts.map((transcript) => (
                        <TableRow key={transcript.id}>
                          <TableCell className="font-medium">{transcript.id}</TableCell>
                          <TableCell>{transcript.language}</TableCell>
                          <TableCell className="hidden md:table-cell truncate max-w-[150px]">{transcript.text}</TableCell>
                          <TableCell>{transcript.uploadedAt}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Recent Audio Files</CardTitle>
                  <CardDescription>
                    Recently uploaded audio recordings
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead className="hidden md:table-cell">Filename</TableHead>
                        <TableHead>Transcript</TableHead>
                        <TableHead>Uploaded</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAudioFiles.map((audio) => (
                        <TableRow key={audio.id}>
                          <TableCell className="font-medium">{audio.id}</TableCell>
                          <TableCell className="hidden md:table-cell truncate max-w-[150px]">{audio.filename}</TableCell>
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
          
          <TabsContent value="recordings" className="animate-fade-in">
            <Tabs defaultValue="pending" className="max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="pending">Pending ({statistics.pending})</TabsTrigger>
                <TabsTrigger value="validated">Validated ({statistics.validated})</TabsTrigger>
                <TabsTrigger value="rejected">Rejected ({statistics.rejected})</TabsTrigger>
              </TabsList>
              <TabsContent value="pending" className="animate-fade-in">
                <AudioList 
                  title="Pending Recordings" 
                  description="Audio recordings waiting for validation"
                  items={pendingRecordings} 
                />
              </TabsContent>
              <TabsContent value="validated" className="animate-fade-in">
                <AudioList 
                  title="Validated Recordings" 
                  description="Audio recordings that passed validation"
                  items={validatedRecordings} 
                />
              </TabsContent>
              <TabsContent value="rejected" className="animate-fade-in">
                <AudioList 
                  title="Rejected Recordings" 
                  description="Audio recordings that failed validation"
                  items={[]} 
                />
              </TabsContent>
            </Tabs>
          </TabsContent>
          
          <TabsContent value="admin" className="animate-fade-in">
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
                            <TableHead className="hidden md:table-cell">Preview</TableHead>
                            <TableHead>Uploaded</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentTranscripts.map((transcript) => (
                            <TableRow key={transcript.id}>
                              <TableCell className="font-medium">{transcript.id}</TableCell>
                              <TableCell>{transcript.language}</TableCell>
                              <TableCell className="hidden md:table-cell truncate max-w-[150px]">{transcript.text}</TableCell>
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
                                <Upload className="mr-2 h-4 w-4" />
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
                            <TableHead className="hidden md:table-cell">Filename</TableHead>
                            <TableHead>Transcript</TableHead>
                            <TableHead>Uploaded</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentAudioFiles.map((audio) => (
                            <TableRow key={audio.id}>
                              <TableCell className="font-medium">{audio.id}</TableCell>
                              <TableCell className="hidden md:table-cell truncate max-w-[150px]">{audio.filename}</TableCell>
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
