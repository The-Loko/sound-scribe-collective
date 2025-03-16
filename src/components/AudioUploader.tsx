
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, File, X, Check, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const AudioUploader: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  // Handle file input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  // Process the files
  const handleFiles = (fileList: File[]) => {
    const audioFiles = fileList.filter(file => {
      const isAudio = file.type.startsWith('audio/');
      if (!isAudio) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an audio file.`,
          variant: "destructive"
        });
      }
      return isAudio;
    });
    
    setFiles(prev => [...prev, ...audioFiles]);
  };

  // Remove file from list
  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Trigger file input click
  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  // Handle upload
  const handleUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    
    // Simulate upload with a delay
    setTimeout(() => {
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${files.length} audio file${files.length !== 1 ? 's' : ''}.`
      });
      setFiles([]);
      setUploading(false);
    }, 2000);
    
    // In a real application, you would upload the files to your server here
    // const formData = new FormData();
    // files.forEach(file => formData.append('files', file));
    // await fetch('/api/upload-audio-files', { method: 'POST', body: formData });
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-card border rounded-2xl p-6 shadow-sm animate-fade-in">
        <h2 className="text-xl font-semibold mb-2">Audio Uploader</h2>
        <p className="text-muted-foreground mb-6">Upload existing audio files to your collection</p>
        
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center ${
            dragActive ? 'border-primary bg-primary/5' : 'border-border'
          } transition-colors duration-200`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept="audio/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <p className="font-medium">
                Drag and drop your audio files here, or
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                WAV, MP3, OGG, and other audio formats accepted
              </p>
              <Button 
                type="button" 
                onClick={handleButtonClick} 
                variant="outline"
                className="button-transition"
              >
                Browse files
              </Button>
            </div>
          </div>
        </div>
        
        {files.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium mb-3">Selected Files ({files.length})</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
              {files.map((file, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between bg-secondary/50 rounded-lg p-3"
                >
                  <div className="flex items-center space-x-3">
                    <File className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm font-medium truncate max-w-xs">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => removeFile(index)}
                    className="h-8 w-8 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-4">
              <Button 
                onClick={handleUpload} 
                disabled={uploading} 
                className="button-transition"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Upload {files.length} file{files.length !== 1 ? 's' : ''}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioUploader;
