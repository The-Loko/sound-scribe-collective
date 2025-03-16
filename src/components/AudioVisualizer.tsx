
import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isRecording: boolean;
  audioStream?: MediaStream | null;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isRecording, audioStream }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>(0);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    if (!audioStream || !isRecording) return;

    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    const audioSource = audioContext.createMediaStreamSource(audioStream);
    audioSource.connect(analyser);
    
    analyserRef.current = analyser;
    const bufferLength = analyser.frequencyBinCount;
    dataArrayRef.current = new Uint8Array(bufferLength);

    const draw = () => {
      if (!canvasRef.current || !analyserRef.current || !dataArrayRef.current) return;
      
      animationFrameRef.current = requestAnimationFrame(draw);
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Make sure canvas dimensions match its display size
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      
      analyserRef.current.getByteFrequencyData(dataArrayRef.current);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = canvas.width / (dataArrayRef.current.length * 2.5);
      let x = 0;
      
      // Only use a portion of the frequency data to make it visually appealing
      const visibleBars = Math.min(64, dataArrayRef.current.length);
      const frequencyData = Array.from(dataArrayRef.current).slice(0, visibleBars);
      
      // Center the visualization
      const startX = (canvas.width - (visibleBars * (barWidth + 2))) / 2;
      
      frequencyData.forEach((value) => {
        const percent = value / 255;
        const barHeight = (canvas.height * 0.7) * percent;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, canvas.height - barHeight, 0, canvas.height);
        gradient.addColorStop(0, 'rgba(59, 130, 246, 0.8)');
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0.3)');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(
          startX + x,
          canvas.height - barHeight,
          barWidth,
          barHeight
        );
        
        x += barWidth + 2; // Add spacing between bars
      });
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (audioSource) audioSource.disconnect();
      if (audioContext.state !== 'closed') audioContext.close();
    };
  }, [isRecording, audioStream]);

  return (
    <div className="w-full h-40 bg-secondary/50 rounded-xl overflow-hidden border border-border p-4">
      {isRecording ? (
        <canvas ref={canvasRef} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className="h-8 w-1 bg-muted rounded-full opacity-50"
                style={{ height: `${Math.max(15, Math.random() * 100)}px` }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioVisualizer;
