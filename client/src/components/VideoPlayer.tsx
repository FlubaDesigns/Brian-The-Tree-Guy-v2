import { useState, useRef } from "react";
import { Play, Maximize2, Pause, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  title?: string;
}

export function VideoPlayer({ 
  src = "/videos/tree-service-demo.mp4",
  poster = "/images/video-placeholder.jpg",
  title = "See Our Work in Action"
}: VideoPlayerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullscreenVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const openFullscreen = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIsFullscreen(true);
    setIsPlaying(false);
  };

  const closeFullscreen = () => {
    if (fullscreenVideoRef.current) {
      fullscreenVideoRef.current.pause();
    }
    setIsFullscreen(false);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
  };

  return (
    <>
      <Card className="overflow-hidden" data-testid="video-player-card">
        <div className="relative aspect-video bg-muted">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            playsInline
            data-testid="video-player"
          />
          
          <div 
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}
          >
            <div className="absolute inset-0 bg-black/30" />
            
            <Button
              size="lg"
              variant="secondary"
              className="relative z-10 rounded-full w-16 h-16 p-0"
              onClick={togglePlay}
              data-testid="button-video-play"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </Button>
          </div>

          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-4 right-4 z-10"
            onClick={openFullscreen}
            data-testid="button-video-fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
        
        {title && (
          <div className="p-4">
            <h3 className="font-semibold text-foreground text-lg">{title}</h3>
          </div>
        )}
      </Card>

      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-6xl w-[95vw] p-0 bg-black border-none">
          <VisuallyHidden>
            <DialogTitle>Video Player</DialogTitle>
          </VisuallyHidden>
          <div className="relative">
            <Button
              size="icon"
              variant="ghost"
              className="absolute top-2 right-2 z-20 text-white hover:bg-white/20"
              onClick={closeFullscreen}
              data-testid="button-video-close-fullscreen"
            >
              <X className="w-5 h-5" />
            </Button>
            
            <video
              ref={fullscreenVideoRef}
              src={src}
              poster={poster}
              className="w-full aspect-video"
              controls
              autoPlay
              playsInline
              data-testid="video-player-fullscreen"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
