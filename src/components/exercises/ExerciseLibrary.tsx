import React, { useState } from 'react';
import { 
  Dumbbell, 
  Play, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  ChevronRight, 
  RotateCcw, 
  Sparkles,
  Heart,
  Scale,
  ShieldCheck,
  Check
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface Exercise {
  id: string;
  title: string;
  category: string;
  targetMuscles: string;
  repsAndSets: string;
  difficulty: 'Gentle' | 'Moderate';
  instructions: string[];
  precautions: string;
  avoidNotes: string;
  imageUrl: string;
}

export const ExerciseLibrary: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Quadriceps' | 'Mobility' | 'Functional'>('All');
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>(['ex-1']);

  const exercises: Exercise[] = [
    {
      id: 'ex-1',
      title: 'Seated Isometric Quadriceps Set',
      category: 'Quadriceps',
      targetMuscles: 'Vastus Medialis & Rectus Femoris',
      repsAndSets: '10 repetitions × 5-second hold, 2 sets daily',
      difficulty: 'Gentle',
      instructions: [
        'Sit upright on a stable chair with feet resting flat on the floor.',
        'Slowly straighten your affected leg out in front of you until your knee is fully extended.',
        'Tighten your thigh muscles firmly and hold the position for 5 seconds.',
        'Slowly lower the foot back to the floor with controlled movement. Relax for 3 seconds, then repeat.'
      ],
      precautions: 'Do not lock knee aggressively or hold breath. Stop if sharp anterior pinching occurs.',
      avoidNotes: 'Avoid swinging the leg rapidly or leaning torso backward to compensate.',
      imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'ex-2',
      title: 'Supine Straight Leg Raise',
      category: 'Quadriceps',
      targetMuscles: 'Quadriceps & Hip Flexors',
      repsAndSets: '8–10 repetitions, 2 sets each leg',
      difficulty: 'Moderate',
      instructions: [
        'Lie flat on your back on a firm mat or bed. Bend one knee with foot flat, keep the other leg straight.',
        'Pull your toes toward your shin, tighten your thigh muscle, and lift the straight leg about 12 inches (30 cm) off the ground.',
        'Hold steady for 3–5 seconds at the top.',
        'Lower slowly and repeat.'
      ],
      precautions: 'Keep lower back pressed lightly into the surface. Do not arch your spine.',
      avoidNotes: 'Avoid jerky lifting motions or letting the leg drop down quickly.',
      imageUrl: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'ex-3',
      title: 'Heel Slides for Range of Motion',
      category: 'Mobility',
      targetMuscles: 'Hamstrings & Knee Synovial Joint Capsule',
      repsAndSets: '10 repetitions, twice daily',
      difficulty: 'Gentle',
      instructions: [
        'Lie flat or sit with legs straight out.',
        'Slowly slide your heel toward your buttocks, bending your knee as far as comfortably tolerated.',
        'Hold for 5 seconds at your maximum comfortable flexion.',
        'Slowly slide the heel back out straight to relax.'
      ],
      precautions: 'Move within a comfortable range of motion. Do not force past moderate stiffness.',
      avoidNotes: 'Avoid letting your knee collapse inward toward the opposite leg.',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=700&auto=format&fit=crop&q=80'
    },
    {
      id: 'ex-4',
      title: 'Chair Mini-Squat with Arm Support',
      category: 'Functional',
      targetMuscles: 'Gluteus Maximus, Quadriceps & Core',
      repsAndSets: '8 repetitions, 2 sets daily',
      difficulty: 'Moderate',
      instructions: [
        'Stand in front of a sturdy chair with feet shoulder-width apart.',
        'Hold the back of another chair or table lightly for balance.',
        'Push hips backward and bend knees slightly (around 30–45°), keeping weight in your heels.',
        'Push through your heels to return to standing tall.'
      ],
      precautions: 'Never squat deeper than 45° if you experience knee crepitus or patellar pain.',
      avoidNotes: 'Avoid letting knees drift forward over your toes or caving inward.',
      imageUrl: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=700&auto=format&fit=crop&q=80'
    }
  ];

  const filteredExercises = exercises.filter(
    e => selectedCategory === 'All' || e.category === selectedCategory
  );

  const currentExercise = filteredExercises[activeExerciseIndex] || exercises[0];

  const toggleComplete = (id: string) => {
    if (completedExercises.includes(id)) {
      setCompletedExercises(completedExercises.filter(item => item !== id));
    } else {
      setCompletedExercises([...completedExercises, id]);
    }
  };

  const handleAudioToggle = () => {
    setIsAudioPlaying(!isAudioPlaying);
    try {
      if (!isAudioPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window && typeof SpeechSynthesisUtterance !== 'undefined') {
        const utterance = new SpeechSynthesisUtterance(
          `${currentExercise.title}. ${currentExercise.instructions.join(' ')}`
        );
        utterance.rate = 0.9;
        window.speechSynthesis.speak(utterance);
      } else if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // Audio speech synthesis not supported in iframe environment
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Evidence-Based Non-Invasive Care
            </span>
            <span className="text-xs text-slate-500">
              Community Knee Rehabilitation
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 font-display mt-1">
            Preventive Exercises & Joint Care Library
          </h1>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Safe closed-chain quadriceps strengthening and mobility routines tailored for rural and agrarian knee protection.
          </p>
        </div>

        {/* Audio narration toggle */}
        <button
          onClick={handleAudioToggle}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition shadow-xs ${
            isAudioPlaying
              ? 'bg-emerald-600 text-white border-emerald-600'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {isAudioPlaying ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
          <span>{isAudioPlaying ? 'Voice Guidance: Playing' : 'Play Voice Instructions'}</span>
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {(['All', 'Quadriceps', 'Mobility', 'Functional'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setActiveExerciseIndex(0);
            }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat} Exercises
          </button>
        ))}
      </div>

      {/* Main Exercise Interactive Display Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left 7 Cols: Video & Step Instructions */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                {currentExercise.category} • {currentExercise.difficulty} Intensity
              </span>
              <h2 className="text-lg font-bold text-slate-900">
                {currentExercise.title}
              </h2>
            </div>
            <button
              onClick={() => toggleComplete(currentExercise.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                completedExercises.includes(currentExercise.id)
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              <span>{completedExercises.includes(currentExercise.id) ? 'Completed Today' : 'Mark Done'}</span>
            </button>
          </div>

          {/* Exercise Visual Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 flex items-center justify-center">
            <img
              src={currentExercise.imageUrl}
              alt={currentExercise.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded text-xs text-white">
              Target: {currentExercise.targetMuscles}
            </div>
          </div>

          {/* Dosage / Reps */}
          <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-semibold">Prescribed Routine Dosage:</span>
            <span className="font-bold">{currentExercise.repsAndSets}</span>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Step-by-Step Execution Guide:
            </h3>
            <div className="space-y-2">
              {currentExercise.instructions.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-800 font-bold flex items-center justify-center flex-shrink-0 mt-0.5 text-[11px]">
                    {idx + 1}
                  </span>
                  <p className="leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & What NOT to do */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <span>Safety Precaution</span>
              </div>
              <p className="text-[11px] text-amber-800">{currentExercise.precautions}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-1">
              <div className="font-bold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
                <span>What to Avoid</span>
              </div>
              <p className="text-[11px] text-red-800">{currentExercise.avoidNotes}</p>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Exercise List Selector & Regional Lifestyle Tips */}
        <div className="lg:col-span-5 space-y-5">
          
          {/* Exercise Queue */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-4 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Exercise Protocols ({filteredExercises.length})
              </h3>
              <span className="text-[11px] text-emerald-600 font-semibold">
                {completedExercises.length} / {exercises.length} Complete
              </span>
            </div>

            <div className="space-y-2">
              {filteredExercises.map((ex, index) => {
                const isCurrent = currentExercise.id === ex.id;
                const isDone = completedExercises.includes(ex.id);
                return (
                  <div
                    key={ex.id}
                    onClick={() => setActiveExerciseIndex(index)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition ${
                      isCurrent
                        ? 'bg-emerald-50 border-emerald-500 shadow-xs'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-slate-900">{ex.title}</div>
                      <div className="text-[10px] text-slate-500">{ex.category} • {ex.repsAndSets}</div>
                    </div>
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Regional Rural Joint Care Tips Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl border border-slate-800 p-5 space-y-3.5 shadow-xl">
            <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
              <Sparkles className="w-4 h-4" />
              <span>Agrarian & Tea Garden Joint Adaptations</span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-white">Use a Low Stool (Pirha):</strong> Replace full deep floor squats with a 6-inch wooden pirha when cleaning, plucking, or domestic cooking.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-white">Contralateral Cane on Slopes:</strong> Hold a walking stick in the hand opposite to your painful knee when climbing tea garden slopes.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 flex-shrink-0" />
                <p>
                  <strong className="text-white">Cushioned Flat Footwear:</strong> Avoid thin rigid rubber flip-flops on stone paths; wear soft rubber soles to absorb step impacts.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
