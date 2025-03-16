
import React, { useState } from 'react';
import NavBar from '@/components/NavBar';
import AudioList from '@/components/AudioList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Check, Clock, X, BarChart2, FileAudio, Users } from 'lucide-react';

const Dashboard: React.FC = () => {
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
      </div>
    </div>
  );
};

export default Dashboard;
