
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import AudioRecorder from '@/components/AudioRecorder';
import AudioUploader from '@/components/AudioUploader';
import AudioList from '@/components/AudioList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index: React.FC = () => {
  // Mock data for audio recordings
  const recentRecordings = [
    {
      id: '1',
      name: 'Voice Sample 01.wav',
      duration: '0:48',
      date: 'Today, 2:30 PM',
      status: 'validated' as const
    },
    {
      id: '2',
      name: 'Ambient Sound Recording.mp3',
      duration: '1:23',
      date: 'Yesterday, 10:15 AM',
      status: 'pending' as const
    },
    {
      id: '3',
      name: 'Interview Segment.wav',
      duration: '5:17',
      date: '2 days ago',
      status: 'rejected' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      <NavBar />
      
      <div className="container pt-24 pb-16 px-4">
        <header className="text-center mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Audio Collection Tool
          </div>
          <h1 className="text-4xl font-bold mb-4">Record, Upload, and Manage Audio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A streamlined platform for collecting and managing high-quality audio data
          </p>
        </header>
        
        <Tabs defaultValue="record" className="max-w-4xl mx-auto mb-12">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="record">Record Audio</TabsTrigger>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
          </TabsList>
          <TabsContent value="record" className="animate-fade-in">
            <AudioRecorder />
          </TabsContent>
          <TabsContent value="upload" className="animate-fade-in">
            <AudioUploader />
          </TabsContent>
        </Tabs>
        
        <div className="max-w-4xl mx-auto mt-16">
          <AudioList 
            title="Recent Recordings" 
            description="Your latest audio recordings and uploads"
            items={recentRecordings} 
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
