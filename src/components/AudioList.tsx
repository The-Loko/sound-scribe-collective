
import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Download, Trash2 } from 'lucide-react';

interface AudioItem {
  id: string;
  name: string;
  duration: string;
  date: string;
  status: 'validated' | 'pending' | 'rejected';
}

interface AudioListProps {
  title: string;
  description?: string;
  items: AudioItem[];
}

const AudioList: React.FC<AudioListProps> = ({ title, description, items }) => {
  const [playingId, setPlayingId] = React.useState<string | null>(null);

  const togglePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: AudioItem['status'] }) => {
    const getStatusClasses = () => {
      switch (status) {
        case 'validated':
          return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
        case 'pending':
          return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
        case 'rejected':
          return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
        default:
          return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      }
    };

    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClasses()}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="w-full animate-slide-up">
      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        {description && <p className="text-muted-foreground mb-6">{description}</p>}
        
        {items.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-lg">
            <p className="text-muted-foreground">No audio recordings found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div 
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full mr-3"
                      onClick={() => togglePlay(item.id)}
                    >
                      {playingId === item.id ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <div className="truncate">
                      <h3 className="text-sm font-medium truncate">{item.name}</h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <p className="text-xs text-muted-foreground">{item.duration}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                        <StatusBadge status={item.status} />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioList;
