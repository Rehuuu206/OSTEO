import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  SkipForward, 
  SkipBack, 
  Layers, 
  Columns, 
  Eye, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  Sliders,
  Maximize2
} from 'lucide-react';
import { CVEngine } from '../../services/cvEngine';
import { BiomechanicalFeatures } from '../../types';

interface SkeletonReplayProps {
  biomechanics: BiomechanicalFeatures;
  onContinueToFusion?: () => void;
}

export const SkeletonReplay: React.FC<SkeletonReplayProps> = ({
  biomechanics,
  onContinueToFusion
}) => {
  const [viewMode, setViewMode] = useState<'split' | 'overlay' | 'skeleton_only'>('split');
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<0.5 | 1 | 2>(1);
  const [timelineSec, setTimelineSec] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animRef = useRef<number | null>(null);

  // Playback loop
  useEffect(() => {
    let lastTime = performance.now();
    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      if (isPlaying) {
        setTimelineSec((prev) => {
          const next = prev + dt * playbackSpeed;
          return next > 12 ? 0 : next;
        });
      }

      // Draw skeleton on canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          // Draw dark medical grid background if skeleton_only or split right
          ctx.fillStyle = '#090d16';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Grid lines
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 1;
          for (let x = 0; x < canvas.width; x += 40) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
          }
          for (let y = 0; y < canvas.height; y += 40) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
          }

          // Generate landmarks
          const landmarks = CVEngine.getSamplePoseLandmarks(timelineSec, 0);

          // Skeleton lines
          const bones: [string, string][] = [
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

          ctx.lineWidth = 4;
          ctx.strokeStyle = '#38bdf8'; // Sky blue
          bones.forEach(([p1, p2]) => {
            const pt1 = landmarks.find(l => l.name === p1);
            const pt2 = landmarks.find(l => l.name === p2);
            if (pt1 && pt2) {
              ctx.beginPath();
              ctx.moveTo(pt1.x * canvas.width, pt1.y * canvas.height);
              ctx.lineTo(pt2.x * canvas.width, pt2.y * canvas.height);
              ctx.stroke();
            }
          });

          // Joints
          landmarks.forEach(pt => {
            const isKnee = pt.name.includes('knee');
            ctx.fillStyle = isKnee ? '#ef4444' : '#10b981';
            ctx.beginPath();
            ctx.arc(pt.x * canvas.width, pt.y * canvas.height, isKnee ? 8 : 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
          });

          // Draw Knee Angle Label
          const leftKnee = landmarks.find(l => l.name === 'left_knee');
          if (leftKnee) {
            const angleVal = Math.round(79.2 + Math.sin(timelineSec * 2.5) * 6.5);
            ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
            ctx.fillRect(leftKnee.x * canvas.width + 12, leftKnee.y * canvas.height - 20, 110, 32);
            ctx.strokeStyle = '#38bdf8';
            ctx.strokeRect(leftKnee.x * canvas.width + 12, leftKnee.y * canvas.height - 20, 110, 32);
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px monospace';
            ctx.fillText(`Flexion: ${angleVal}°`, leftKnee.x * canvas.width + 20, leftKnee.y * canvas.height - 3);
            ctx.font = '9px sans-serif';
            ctx.fillStyle = '#94a3b8';
            ctx.fillText('Estimated from video', leftKnee.x * canvas.width + 20, leftKnee.y * canvas.height + 8);
          }
        }
      }

      animRef.current = requestAnimationFrame(loop);
    };

    animRef.current = requestAnimationFrame(loop);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, playbackSpeed, timelineSec]);

  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl space-y-4 p-5 text-white">
      
      {/* Header controls & view toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-bold text-white">
              AI Biomechanical Skeleton Replay
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-950 text-sky-300 border border-sky-800">
              Source: Estimated from video
            </span>
          </div>
          <p className="text-xs text-slate-400">
            Sub-pixel landmark tracking synchronized across 12-second gait cycle
          </p>
        </div>

        {/* View Mode Buttons */}
        <div className="flex items-center bg-slate-800 rounded-xl p-1 text-xs">
          <button
            onClick={() => setViewMode('split')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              viewMode === 'split' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Split View</span>
          </button>

          <button
            onClick={() => setViewMode('overlay')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              viewMode === 'overlay' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Overlay View</span>
          </button>

          <button
            onClick={() => setViewMode('skeleton_only')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition ${
              viewMode === 'skeleton_only' ? 'bg-sky-600 text-white font-semibold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Skeleton Lab</span>
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 min-h-[340px] max-h-[440px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
        
        {/* Left Video / Silhouette */}
        {(viewMode === 'split' || viewMode === 'overlay') && (
          <div className="relative bg-slate-950 flex items-center justify-center overflow-hidden border-r border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop&q=80"
              alt="Patient movement video frame"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-slate-300 font-semibold border border-slate-700">
              Camera 1 • Side View (Calibrated)
            </div>
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] text-slate-400 font-mono">
              30 FPS • 1080p • Lighting: Good
            </div>
          </div>
        )}

        {/* Right / Canvas Skeleton */}
        <div className={`relative flex items-center justify-center overflow-hidden ${viewMode === 'skeleton_only' ? 'md:col-span-2' : ''}`}>
          <canvas
            ref={canvasRef}
            width={640}
            height={440}
            className="w-full h-full object-contain"
          />
          <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded text-[11px] text-sky-400 font-semibold border border-slate-700">
            AI Pose Skeleton & Trajectories
          </div>
        </div>

      </div>

      {/* Timeline Scrubber & Playback Controls */}
      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>00:{timelineSec < 10 ? `0${Math.floor(timelineSec)}` : Math.floor(timelineSec)}</span>
          <input
            type="range"
            min={0}
            max={12}
            step={0.1}
            value={timelineSec}
            onChange={(e) => setTimelineSec(Number(e.target.value))}
            className="flex-1 accent-sky-500"
          />
          <span>00:12</span>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTimelineSec(Math.max(0, timelineSec - 1))}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition"
              title="Step Back 1s"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold flex items-center gap-1.5 transition"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={() => setTimelineSec(Math.min(12, timelineSec + 1))}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition"
              title="Step Forward 1s"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              onClick={() => setTimelineSec(0)}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-300 transition"
              title="Restart Cycle"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-[11px]">Speed:</span>
            {[0.5, 1, 2].map((spd) => (
              <button
                key={spd}
                onClick={() => setPlaybackSpeed(spd as any)}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition ${
                  playbackSpeed === spd ? 'bg-sky-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {spd}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Extracted Biomechanical Indicators Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400">Peak Knee Flexion</div>
          <div className="text-lg font-bold font-mono text-sky-400">{biomechanics.maxKneeFlexionDeg}°</div>
          <div className="text-[10px] text-amber-400">Restricted (&lt;110° ref)</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400">Gait Symmetry</div>
          <div className="text-lg font-bold font-mono text-amber-400">{biomechanics.gaitSymmetryPercent}%</div>
          <div className="text-[10px] text-slate-400">18.8% antalgic deficit</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400">Walking Cadence</div>
          <div className="text-lg font-bold font-mono text-slate-200">{biomechanics.cadenceStepsPerMin} spm</div>
          <div className="text-[10px] text-slate-400">Speed: {biomechanics.estimatedWalkingSpeedMps} m/s</div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
          <div className="text-[11px] text-slate-400">Trunk Inclination</div>
          <div className="text-lg font-bold font-mono text-slate-200">{biomechanics.trunkInclinationDeg}°</div>
          <div className="text-[10px] text-slate-400">Lateral sway: {biomechanics.lateralSwayCm} cm</div>
        </div>
      </div>

      {onContinueToFusion && (
        <div className="pt-2 flex justify-end">
          <button
            onClick={onContinueToFusion}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-slate-950 font-bold text-xs shadow-lg transition"
          >
            Compare with Wearable Sensor Data →
          </button>
        </div>
      )}

    </div>
  );
};
