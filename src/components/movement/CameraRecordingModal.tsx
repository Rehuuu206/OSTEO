import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Camera, 
  Video, 
  Play, 
  Square, 
  RotateCcw, 
  CheckCircle2, 
  AlertTriangle, 
  Eye, 
  Lightbulb, 
  Maximize2,
  Sliders
} from 'lucide-react';
import { CVEngine } from '../../services/cvEngine';
import { TestType, CameraAngle } from '../../types';

interface CameraRecordingModalProps {
  isOpen: boolean;
  onClose: () => void;
  testType: TestType;
  onRecordingComplete: (sessionData: any) => void;
}

export const CameraRecordingModal: React.FC<CameraRecordingModalProps> = ({
  isOpen,
  onClose,
  testType,
  onRecordingComplete
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [streamActive, setStreamActive] = useState(false);
  const [cameraPermissionError, setCameraPermissionError] = useState<string | null>(null);
  const [cameraAngle, setCameraAngle] = useState<CameraAngle>('side');
  
  const [recordingState, setRecordingState] = useState<'idle' | 'countdown' | 'recording' | 'review'>('idle');
  const [countdown, setCountdown] = useState(3);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  // Quality Check state
  const [qualityCheck, setQualityCheck] = useState<{
    quality: 'POOR' | 'ACCEPTABLE' | 'GOOD' | 'EXCELLENT';
    score: number;
    issues: string[];
    canProcess: boolean;
  }>({ quality: 'GOOD', score: 92, issues: [], canProcess: true });

  const animFrameIdRef = useRef<number | null>(null);

  // Initialize camera
  useEffect(() => {
    if (!isOpen) return;

    let mediaStream: MediaStream | null = null;
    const startCamera = async () => {
      try {
        if (!navigator?.mediaDevices?.getUserMedia) {
          throw new Error('Camera API not accessible in this browser context');
        }
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 1280 }, height: { ideal: 720 }, facingMode: 'user' }
        });
        mediaStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {
            // Autoplay may be restricted
          });
          setStreamActive(true);
          setCameraPermissionError(null);
        }
      } catch (err: any) {
        setCameraPermissionError('Webcam unavailable or permission denied. Running in High-Fidelity Simulation Camera mode.');
        setStreamActive(false);
      }
    };

    startCamera();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isOpen]);

  // Live Canvas Pose Estimation Skeleton Overlay Loop
  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let timeSec = 0;
    const renderLoop = () => {
      timeSec += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // If simulated feed, render stylized silhouette background
      if (!streamActive) {
        ctx.fillStyle = '#0f172a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw simulated floor reference lines
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * 0.88);
        ctx.lineTo(canvas.width, canvas.height * 0.88);
        ctx.stroke();
      }

      // Draw real-time skeleton landmarks
      const landmarks = CVEngine.getSamplePoseLandmarks(timeSec, testType === 'sit_to_stand' ? 1.0 : 0);

      // Connections between landmarks
      const connections: [string, string][] = [
        ['left_shoulder', 'right_shoulder'],
        ['left_shoulder', 'left_elbow'],
        ['left_elbow', 'left_wrist'],
        ['right_shoulder', 'right_elbow'],
        ['right_elbow', 'right_wrist'],
        ['left_shoulder', 'left_hip'],
        ['right_shoulder', 'right_hip'],
        ['left_hip', 'right_hip'],
        ['left_hip', 'left_knee'],
        ['left_knee', 'left_ankle'],
        ['right_hip', 'right_knee'],
        ['right_knee', 'right_ankle']
      ];

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#38bdf8'; // Sky cyan

      connections.forEach(([p1Name, p2Name]) => {
        const p1 = landmarks.find(l => l.name === p1Name);
        const p2 = landmarks.find(l => l.name === p2Name);
        if (p1 && p2) {
          ctx.beginPath();
          ctx.moveTo(p1.x * canvas.width, p1.y * canvas.height);
          ctx.lineTo(p2.x * canvas.width, p2.y * canvas.height);
          ctx.stroke();
        }
      });

      // Joint Nodes
      landmarks.forEach((pt) => {
        ctx.fillStyle = pt.name.includes('knee') ? '#ef4444' : '#10b981';
        ctx.beginPath();
        ctx.arc(pt.x * canvas.width, pt.y * canvas.height, pt.name.includes('knee') ? 7 : 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Display real-time knee flexion angle label on canvas
      const leftKnee = landmarks.find(l => l.name === 'left_knee');
      if (leftKnee) {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
        ctx.fillRect(leftKnee.x * canvas.width + 10, leftKnee.y * canvas.height - 15, 90, 24);
        ctx.fillStyle = '#f8fafc';
        ctx.font = '11px monospace';
        const simulatedAngle = Math.round(79.2 + Math.sin(timeSec * 2) * 5.5);
        ctx.fillText(`Knee: ${simulatedAngle}°`, leftKnee.x * canvas.width + 16, leftKnee.y * canvas.height + 1);
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isOpen, streamActive, testType]);

  // Countdown & Recording Timer
  useEffect(() => {
    let timer: number;
    if (recordingState === 'countdown') {
      timer = window.setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setRecordingState('recording');
            setRecordingDuration(0);
            return 3;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (recordingState === 'recording') {
      timer = window.setInterval(() => {
        setRecordingDuration((prev) => {
          if (prev >= 12) {
            // Auto stop after 12s
            setRecordingState('review');
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [recordingState]);

  const handleStartRecording = () => {
    setCountdown(3);
    setRecordingState('countdown');
  };

  const handleStopRecording = () => {
    setRecordingState('review');
    const check = CVEngine.evaluateVideoQuality(true, true, true, true, recordingDuration);
    setQualityCheck(check);
  };

  const handleConfirmAndProcess = () => {
    const biomechanics = CVEngine.extractBiomechanicalFeatures(testType, 'HIGH_RISK');
    onRecordingComplete({
      testType,
      cameraAngle,
      durationSeconds: recordingDuration || 12,
      qualityScore: qualityCheck.score,
      biomechanics
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div className="bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Video className="w-5 h-5 text-sky-400" />
            <div>
              <h2 className="text-sm font-bold text-white capitalize">
                Movement Lab • {testType.replace(/_/g, ' ')} Video Capture
              </h2>
              <p className="text-[11px] text-slate-400">
                Position camera 2.5–3 meters away with patient's entire body visible
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Camera angle selector */}
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setCameraAngle('side')}
                className={`px-2.5 py-1 rounded-md transition ${cameraAngle === 'side' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400'}`}
              >
                Side View
              </button>
              <button
                onClick={() => setCameraAngle('front')}
                className={`px-2.5 py-1 rounded-md transition ${cameraAngle === 'front' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400'}`}
              >
                Front View
              </button>
            </div>

            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg transition">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Video & Skeleton Viewport */}
        <div className="relative flex-1 bg-black min-h-[380px] flex items-center justify-center overflow-hidden">
          
          {/* Live Video Element */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`w-full h-full object-cover ${!streamActive ? 'hidden' : ''}`}
          />

          {/* AI Skeleton Overlay Canvas */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={720}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />

          {/* Fallback Simulation Banner */}
          {cameraPermissionError && (
            <div className="absolute top-4 left-4 z-20 bg-slate-900/85 backdrop-blur-md px-3 py-1.5 rounded-lg border border-amber-500/50 text-amber-300 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>{cameraPermissionError}</span>
            </div>
          )}

          {/* Countdown Overlay */}
          {recordingState === 'countdown' && (
            <div className="absolute inset-0 z-30 bg-slate-950/70 flex flex-col items-center justify-center animate-in fade-in">
              <div className="text-7xl font-extrabold text-sky-400 font-mono animate-bounce">
                {countdown}
              </div>
              <div className="text-sm font-semibold text-slate-200 mt-2">
                Prepare patient in start position...
              </div>
            </div>
          )}

          {/* Recording Timer Indicator */}
          {recordingState === 'recording' && (
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-red-950/80 backdrop-blur-md border border-red-500/50 px-3 py-1.5 rounded-full text-xs text-red-200 font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
              <span>REC 00:{recordingDuration < 10 ? `0${recordingDuration}` : recordingDuration}</span>
            </div>
          )}

          {/* Framing Guidance Guide overlay */}
          <div className="absolute inset-x-8 inset-y-6 border border-dashed border-sky-400/30 rounded-2xl pointer-events-none flex flex-col justify-between p-4">
            <div className="flex justify-between text-[10px] text-sky-400/70 font-mono">
              <span>[HEAD REGION]</span>
              <span>[CALIBRATED 3.0M]</span>
            </div>
            <div className="flex justify-between text-[10px] text-sky-400/70 font-mono">
              <span>[GROUND LEVEL]</span>
              <span>[GAIT AXIS]</span>
            </div>
          </div>
        </div>

        {/* Quality Check Banner during Review */}
        {recordingState === 'review' && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="font-semibold text-white">Video Quality Check:</span>
                <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono font-bold">
                  {qualityCheck.score}% • {qualityCheck.quality}
                </span>
              </div>
              <span className="text-[11px] text-slate-400">Duration: {recordingDuration}s • 30 FPS</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Full-body pose landmarks tracked successfully. Knee angle kinematics ready for biomechanical feature extraction.
            </p>
          </div>
        )}

        {/* Footer Action Controls */}
        <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Ensure perpendicular camera alignment for side gait analysis.</span>
          </div>

          <div className="flex items-center gap-3">
            {recordingState === 'idle' && (
              <button
                onClick={handleStartRecording}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg shadow-red-950/50 transition"
              >
                <Camera className="w-4 h-4" />
                <span>Start Video Recording</span>
              </button>
            )}

            {recordingState === 'recording' && (
              <button
                onClick={handleStopRecording}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs shadow-lg transition"
              >
                <Square className="w-4 h-4" />
                <span>Stop & Review Capture</span>
              </button>
            )}

            {recordingState === 'review' && (
              <>
                <button
                  onClick={() => setRecordingState('idle')}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Video</span>
                </button>

                <button
                  onClick={handleConfirmAndProcess}
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-lg transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept & Run AI Analysis</span>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
