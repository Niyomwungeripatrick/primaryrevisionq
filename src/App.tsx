import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Hammer, 
  BrickWall, 
  Lightbulb, 
  Cpu, 
  PenTool, 
  Search, 
  Code, 
  Droplets, 
  Sprout, 
  Trees, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Trophy,
  ChevronRight,
  LayoutGrid,
  Timer,
  User,
  ArrowRight,
  FileText,
  Award,
  Download,
  Printer,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  Brain,
  BarChart3,
  BookOpen,
  Zap,
  Map,
  Users,
  Bath,
  Landmark,
  CloudSun,
  Building2,
  Users2,
  History,
  Book,
  Heart,
  ShieldAlert,
  Home,
  Compass,
  HelpCircle,
  Sun,
  Moon,
  Menu,
  X,
  Settings
} from 'lucide-react';
import { questions, subjects, Question } from './data/questions';
import { notes, Note } from './data/notes';

type QuizState = 'NAME_ENTRY' | 'LEVEL_SELECTION' | 'SUB_LEVEL_SELECTION' | 'SUBJECT_SELECTION' | 'START' | 'INSTRUCTIONS' | 'QUIZ' | 'RESULT' | 'REPORT' | 'CERTIFICATE' | 'STUDY_MODE' | 'PROFILE' | 'HELP';

const subjectIcons: Record<string, any> = {
  "SET": Lightbulb,
  "SST": FileText,
  "MATHS": LayoutGrid,
  "ENGLISH": PenTool,
  "MATHEMATICS": LayoutGrid,
  "KINYARWANDA": GraduationCap,
};

const unitIcons: Record<string, any> = {
  "CARPENTRY TOOLS": Hammer,
  "MASONRY TOOLS": BrickWall,
  "LIGHT": Lightbulb,
  "COMPUTER MEMORY & STORAGE": Cpu,
  "WRITING SKILLS": PenTool,
  "COMPUTER RESEARCH": Search,
  "PROGRAMMING": Code,
  "WATER POLLUTION": Droplets,
  "SOIL & CULTIVATION": Sprout,
  "PLANTS & ENVIRONMENT": Trees,
  "MAP OF OUR PROVINCE AND ITS LOCATION": Map,
  "COMPLEMENTARITY AND SOCIAL COHESION IN THE SOCIETY": Users,
  "HYGIENE AND SANITATION": Bath,
  "ECONOMY": Landmark,
  "ENVIRONMENT AND CLIMATE IN OUR PROVINCE": CloudSun,
  "SOCIAL SERVICES AND IMPORTANT PLACES IN OUR PROVINCE": Building2,
  "POPULATION": Users2,
  "COLONIAL RWANDA": History,
  "NOTION OF THE BIBLE AND QUR’AN": Book,
  "ACTS OF CHARITY IN THE COMMUNITY AND FAITH": Heart,
  "SIN AND ITS CONSEQUENCES": ShieldAlert,
};

const QUESTION_TIME = 30; // seconds per question

interface UserAnswer {
  questionId: string;
  selectedOption: string | null;
  isCorrect: boolean;
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  criteria: (stats: any) => boolean;
}

const BADGES: Badge[] = [
  {
    id: 'first_step',
    name: 'First Step',
    description: 'Finish your first quiz',
    icon: Sparkles,
    color: 'text-blue-500 bg-blue-50',
    criteria: (stats) => stats.totalCompleted >= 1
  },
  {
    id: 'master',
    name: 'Master',
    description: 'Get 100% on any quiz',
    icon: Trophy,
    color: 'text-yellow-500 bg-yellow-50',
    criteria: (stats) => stats.hasPerfectScore
  },
  {
    id: 'high_flyer',
    name: 'High Flyer',
    description: 'Get 80% or more on 5 different units',
    icon: Zap,
    color: 'text-emerald-500 bg-emerald-50',
    criteria: (stats) => stats.masteredCount >= 5
  },
  {
    id: 'subject_expert',
    name: 'Subject Expert',
    description: 'Finish all units in one subject',
    icon: GraduationCap,
    color: 'text-purple-500 bg-purple-50',
    criteria: (stats) => stats.completedSubjects.length > 0
  },
  {
    id: 'streak_starter',
    name: 'Streak Starter',
    description: 'Get 80% or more 3 times in a row',
    icon: Heart,
    color: 'text-rose-500 bg-rose-50',
    criteria: (stats) => stats.currentStreak >= 3
  }
];

export default function App() {
  const [quizState, setQuizState] = useState<QuizState>('NAME_ENTRY');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'UPPER' | 'LOWER' | null>(null);
  const [selectedSubLevel, setSelectedSubLevel] = useState<'P5' | 'P6' | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedUnit, setSelectedUnit] = useState<string | 'ALL' | 'GENERAL'>('ALL');
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [targetState, setTargetState] = useState<QuizState | null>(null);
  const [recentBadge, setRecentBadge] = useState<Badge | null>(null);
  const [progress, setProgress] = useState<Record<string, { maxScore: number; masterCount: number }>>(() => {
    const saved = localStorage.getItem('quiz-progress');
    if (!saved) return {};
    const parsed = JSON.parse(saved);
    // Migration: if the value is a number, convert it to the new object format
    const migrated: Record<string, { maxScore: number; masterCount: number }> = {};
    Object.keys(parsed).forEach(key => {
      if (typeof parsed[key] === 'number') {
        migrated[key] = { maxScore: parsed[key], masterCount: parsed[key] >= 80 ? 1 : 0 };
      } else {
        migrated[key] = parsed[key];
      }
    });
    return migrated;
  });
  const [earnedBadges, setEarnedBadges] = useState<string[]>(() => {
    const saved = localStorage.getItem('quiz-badges');
    return saved ? JSON.parse(saved) : [];
  });
  const [streak, setStreak] = useState<number>(() => {
    const saved = localStorage.getItem('quiz-streak');
    return saved ? parseInt(saved) : 0;
  });
  const hasProcessedResult = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    localStorage.setItem('quiz-badges', JSON.stringify(earnedBadges));
  }, [earnedBadges]);

  useEffect(() => {
    localStorage.setItem('quiz-streak', streak.toString());
  }, [streak]);

  const updateProgress = (unit: string, scorePercent: number) => {
    if (hasProcessedResult.current) return;
    hasProcessedResult.current = true;

    // Update Streak
    if (scorePercent >= 80) {
      setStreak(prev => prev + 1);
    } else {
      setStreak(0);
    }

    const key = `${selectedLevel}-${selectedSubLevel || 'NONE'}-${selectedSubject}-${unit}`;
    
    setProgress(prev => {
      const newProgress = {
        ...prev,
        [key]: {
          maxScore: Math.max((prev[key]?.maxScore || 0), scorePercent),
          masterCount: (prev[key]?.masterCount || 0) + (scorePercent >= 80 ? 1 : 0)
        }
      };
      
      localStorage.setItem('quiz-progress', JSON.stringify(newProgress));

      // Check for badges
      const stats = {
        totalCompleted: Object.keys(newProgress).length,
        hasPerfectScore: (Object.values(newProgress) as { maxScore: number; masterCount: number }[]).some(p => p.maxScore === 100),
        masteredCount: (Object.values(newProgress) as { maxScore: number; masterCount: number }[]).filter(p => p.maxScore >= 80).length,
        currentStreak: scorePercent >= 80 ? streak + 1 : 0,
        completedSubjects: Array.from(new Set(Object.keys(newProgress).map(k => k.split('-')[2])))
          .filter(subject => {
            const subjectUnits = questions.filter(q => q.level === selectedLevel && q.subject === subject).map(q => q.unit);
            const completedSubjectUnits = Object.keys(newProgress).filter(k => k.split('-')[2] === subject).map(k => k.split('-')[3]);
            return subjectUnits.every(u => completedSubjectUnits.includes(u));
          })
      };

      const newBadges = BADGES
        .filter(badge => !earnedBadges.includes(badge.id) && badge.criteria(stats));

      if (newBadges.length > 0) {
        setEarnedBadges(prevBadges => [...prevBadges, ...newBadges.map(b => b.id)]);
        setRecentBadge(newBadges[newBadges.length - 1]);
        setTimeout(() => setRecentBadge(null), 5000);
      }

      return newProgress;
    });
  };

  const getUnitProgress = (unit: string) => {
    const key = `${selectedLevel}-${selectedSubLevel || 'NONE'}-${selectedSubject}-${unit}`;
    return progress[key]?.maxScore || 0;
  };

  const getUnitMasterCount = (unit: string) => {
    const key = `${selectedLevel}-${selectedSubLevel || 'NONE'}-${selectedSubject}-${unit}`;
    return progress[key]?.masterCount || 0;
  };

  const getSubjectProgress = (subject: string) => {
    const subjectUnits = Array.from(new Set(questions
      .filter(q => q.level === selectedLevel && q.subject === subject)
      .map(q => q.unit)
    ));
    
    if (subjectUnits.length === 0) return 0;
    
    const totalProgress = subjectUnits.reduce((acc, unit) => {
      const key = `${selectedLevel}-${selectedSubLevel || 'NONE'}-${subject}-${unit}`;
      return acc + (progress[key]?.maxScore || 0);
    }, 0);
    
    return Math.round(totalProgress / subjectUnits.length);
  };

  const isSubjectMastered = (subject: string) => {
    const subjectUnits = Array.from(new Set(questions
      .filter(q => q.level === selectedLevel && q.subject === subject)
      .map(q => q.unit)
    ));
    
    if (subjectUnits.length === 0) return false;
    
    return subjectUnits.every(unit => {
      const key = `${selectedLevel}-${selectedSubLevel || 'NONE'}-${subject}-${unit}`;
      return (progress[key]?.masterCount || 0) >= 3;
    });
  };

  const isSubjectOpen = (subject: string) => {
    if (selectedLevel === 'LOWER') return true;
    if (selectedLevel === 'UPPER') {
      if (selectedSubLevel === 'P5') {
        return ['SET', 'SST'].includes(subject);
      }
      if (selectedSubLevel === 'P6') {
        return ['SET', 'ENGLISH', 'MATHS'].includes(subject);
      }
    }
    return false;
  };

  const getSubjectStatus = (subject: string) => {
    if (isSubjectOpen(subject)) return 'OPEN';
    if (subject === 'SST') return 'OPENING_SOON';
    return 'CLOSED';
  };

  const shuffleArray = <T,>(array: T[]): T[] => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const navigateWithLoading = (newState: QuizState, customMessage?: string, delay = 1000) => {
    const messages: Record<string, string> = {
      'LEVEL_SELECTION': 'Finding your lessons...',
      'SUBJECT_SELECTION': 'Loading subjects...',
      'START': 'Getting your topics ready...',
      'INSTRUCTIONS': 'Setting up your quiz...',
      'QUIZ': 'Making your questions...',
      'RESULT': 'Checking your answers...',
      'CERTIFICATE': 'Making your certificate...',
      'REPORT': 'Writing your report...',
      'STUDY_MODE': 'Getting your notes...',
      'NAME_ENTRY': 'Going back to start...'
    };

    setTargetState(newState);
    setLoadingMessage(customMessage || messages[newState] || 'Loading...');
    setIsLoading(true);
    
    setTimeout(() => {
      setQuizState(newState);
      setIsLoading(false);
      setTargetState(null);
    }, delay);
  };

  const startQuiz = (mode: string | 'ALL' | 'GENERAL') => {
    let filtered: Question[] = [];
    let count = 10;

    const subjectQuestions = questions.filter(q => q.level === selectedLevel && q.subject === selectedSubject);

    if (mode === 'GENERAL') {
      filtered = subjectQuestions;
      count = 60;
    } else if (mode === 'ALL') {
      filtered = subjectQuestions;
      count = 20;
    } else {
      filtered = subjectQuestions.filter(q => q.unit === mode);
      count = 20;
    }
    
    const shuffled = shuffleArray(filtered);
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));
    
    setCurrentQuestions(selected);
    setCurrentIndex(0);
    setScore(0);
    setUserAnswers([]);
    setIsSubmitted(false);
    hasProcessedResult.current = false;
    navigateWithLoading('INSTRUCTIONS', 'Preparing your quiz environment...', 1000);
    setSelectedUnit(mode);
    setIsAnswered(false);
    setSelectedOption(null);
    setTimeLeft(QUESTION_TIME);
  };

  const units = Array.from(new Set(questions
    .filter(q => q.level === selectedLevel && q.subject === selectedSubject)
    .map(q => q.unit)
  ));

  const nextQuestion = useCallback(() => {
    if (currentIndex < currentQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(QUESTION_TIME);
    } else {
      navigateWithLoading('RESULT', 'Analyzing your performance...', 1500);
    }
  }, [currentIndex, currentQuestions.length]);

  const handleAnswer = useCallback((option: string | null) => {
    if (isAnswered) return;
    
    const currentQ = currentQuestions[currentIndex];
    const isCorrect = option === currentQ.correctAnswer;
    
    setIsAnswered(true);
    setSelectedOption(option);
    
    setUserAnswers(prev => [...prev, {
      questionId: currentQ.id,
      selectedOption: option,
      isCorrect
    }]);

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    if (timerRef.current) clearInterval(timerRef.current);

    setTimeout(() => {
      nextQuestion();
    }, 500);
  }, [currentIndex, currentQuestions, isAnswered, nextQuestion]);

  // Timer logic
  useEffect(() => {
    if (quizState === 'QUIZ' && !isAnswered) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            handleAnswer(null); // Time out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [quizState, isAnswered, currentIndex, handleAnswer]);

  // Submit marks logic
  useEffect(() => {
    if (quizState === 'RESULT' && !isSubmitted) {
      const submitMarks = async () => {
        try {
          const response = await fetch('/api/submit-marks', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName,
              score,
              totalQuestions: currentQuestions.length,
              percentage: Math.round((score / currentQuestions.length) * 100),
              selectedUnit,
              selectedLevel,
              selectedSubLevel,
              selectedSubject,
              userAnswers,
              currentQuestions,
            }),
          });
          if (response.ok) {
            setIsSubmitted(true);
            console.log('Marks submitted successfully');
          }
        } catch (error) {
          console.error('Error submitting marks:', error);
        }
      };

      submitMarks();
    }
  }, [quizState, isSubmitted, userName, score, currentQuestions.length, selectedUnit, selectedLevel, selectedSubLevel, selectedSubject]);

  const currentQuestion = currentQuestions[currentIndex];
  const percentage = Math.round((score / currentQuestions.length) * 100);

  const Sidebar = () => (
    <>
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{ x: isSidebarOpen ? 0 : -300 }}
        className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-stone-200 z-50 shadow-2xl lg:shadow-none transition-colors duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="font-black tracking-tighter text-xl">REVISION</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-stone-100 rounded-lg lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            <button
              onClick={() => {
                navigateWithLoading('NAME_ENTRY');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${quizState === 'NAME_ENTRY' ? 'bg-emerald-50 text-emerald-600' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              <Home className="w-5 h-5" />
              <span className="font-bold">Home</span>
            </button>

            <button
              onClick={() => {
                navigateWithLoading('LEVEL_SELECTION');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${['LEVEL_SELECTION', 'SUB_LEVEL_SELECTION', 'SUBJECT_SELECTION', 'START'].includes(quizState) ? 'bg-emerald-50 text-emerald-600' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              <Compass className="w-5 h-5" />
              <span className="font-bold">Explore Subjects</span>
            </button>

            <button
              onClick={() => {
                navigateWithLoading('PROFILE');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${quizState === 'PROFILE' ? 'bg-emerald-50 text-emerald-600' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              <User className="w-5 h-5" />
              <span className="font-bold">My Progress</span>
            </button>

            <button
              onClick={() => {
                navigateWithLoading('HELP');
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${quizState === 'HELP' ? 'bg-emerald-50 text-emerald-600' : 'text-stone-600 hover:bg-stone-50'}`}
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-bold">Help</span>
            </button>
          </nav>

          <div className="p-4 border-t border-stone-100 space-y-4">
            {userName && (
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="font-black text-emerald-600">{userName[0].toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{userName}</p>
                  <p className="text-xs text-stone-500">Student</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );

  useEffect(() => {
    if (quizState === 'RESULT') {
      updateProgress(selectedUnit, percentage);
    }
  }, [quizState]);

  const LoadingOverlay = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress(prev => (prev < 95 ? prev + (95 - prev) * 0.1 : prev));
      }, 100);
      return () => clearInterval(interval);
    }, []);

    const getIcon = () => {
      switch (targetState) {
        case 'QUIZ': return <Brain className="w-10 h-10 text-white" />;
        case 'RESULT': return <BarChart3 className="w-10 h-10 text-white" />;
        case 'CERTIFICATE': return <Award className="w-10 h-10 text-white" />;
        case 'REPORT': return <FileText className="w-10 h-10 text-white" />;
        case 'STUDY_MODE': return <BookOpen className="w-10 h-10 text-white" />;
        case 'LEVEL_SELECTION': return <GraduationCap className="w-10 h-10 text-white" />;
        case 'SUBJECT_SELECTION': return <LayoutGrid className="w-10 h-10 text-white" />;
        default: return <Sparkles className="w-10 h-10 text-white" />;
      }
    };

    const getAnimation = () => {
      switch (targetState) {
        case 'QUIZ':
          return (
            <div className="relative">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl absolute inset-0"
              />
              <div className="flex gap-3 relative z-10">
                {[0, 1, 2].map(i => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 15, -15, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    className="w-12 h-16 bg-white border-2 border-emerald-500 rounded-xl flex items-center justify-center text-emerald-600 font-black shadow-lg"
                  >
                    <Sparkles className="w-6 h-6" />
                  </motion.div>
                ))}
              </div>
            </div>
          );
        case 'RESULT':
          return (
            <div className="relative w-40 h-40 bg-stone-50 rounded-3xl overflow-hidden border-2 border-stone-200 shadow-inner">
              <motion.div
                animate={{ y: [-160, 160] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,1)] z-20"
              />
              <div className="p-6 space-y-4">
                {[0, 1, 2, 3, 4].map(i => (
                  <div key={i} className="h-3 bg-stone-200 rounded-full w-full overflow-hidden">
                    <motion.div
                      animate={{ width: ['0%', '100%', '0%'] }}
                      transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                      className="h-full bg-emerald-400"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-50/10 to-transparent pointer-events-none" />
            </div>
          );
        case 'CERTIFICATE':
          return (
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-40 h-40 border-4 border-dashed border-emerald-500/20 rounded-full"
              />
              <motion.div
                animate={{ 
                  rotate: -360
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {[0, 1, 2, 3, 4, 5].map(i => (
                  <motion.div
                    key={i}
                    style={{ rotate: i * 60 }}
                    className="absolute h-full"
                  >
                    <motion.div 
                      animate={{ y: [0, -10, 0], opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                      className="w-2 h-2 bg-emerald-400 rounded-full mt-2" 
                    />
                  </motion.div>
                ))}
              </motion.div>
              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-20 h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200 border-4 border-white">
                  <Award className="w-10 h-10 text-white" />
                </div>
              </motion.div>
            </div>
          );
        case 'REPORT':
          return (
            <div className="relative w-40 h-48 bg-white rounded-xl border-2 border-stone-200 shadow-xl overflow-hidden">
              <div className="p-4 space-y-3">
                <div className="h-2 w-3/4 bg-stone-100 rounded" />
                <div className="h-2 w-full bg-stone-100 rounded" />
                <div className="h-2 w-5/6 bg-stone-100 rounded" />
                <div className="h-10 w-full bg-emerald-50 rounded flex items-center justify-center">
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-full h-full bg-emerald-200/30"
                  />
                </div>
                <div className="h-2 w-full bg-stone-100 rounded" />
                <div className="h-2 w-2/3 bg-stone-100 rounded" />
              </div>
              <motion.div
                animate={{ y: [-200, 200] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
              />
              <div className="absolute top-2 right-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RotateCcw className="w-4 h-4 text-emerald-500" />
                </motion.div>
              </div>
            </div>
          );
        case 'STUDY_MODE':
          return (
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ 
                  rotateY: [0, 180, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-32 h-40 bg-emerald-600 rounded-r-xl rounded-l-sm border-l-8 border-emerald-800 shadow-2xl flex items-center justify-center"
              >
                <BookOpen className="w-12 h-12 text-white/50" />
                <motion.div
                  animate={{ x: [-5, 5, -5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute right-2 top-4 bottom-4 w-1 bg-white/20 rounded-full"
                />
              </motion.div>
              <div className="absolute -z-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl" />
            </div>
          );
        case 'LEVEL_SELECTION':
        case 'SUBJECT_SELECTION':
          return (
            <div className="grid grid-cols-3 gap-3">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 0.8, 1],
                    opacity: [0.3, 1, 0.3],
                    backgroundColor: i % 2 === 0 ? '#10b981' : '#34d399'
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                  }}
                  className="w-8 h-8 rounded-lg shadow-lg"
                />
              ))}
            </div>
          );
        default:
          return (
            <div className="relative">
              <motion.div
                animate={{ 
                  rotate: 360,
                  borderRadius: ["30%", "50%", "30%"]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                className="w-32 h-32 border-4 border-emerald-100 border-t-emerald-600 shadow-xl"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: 1 
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 0.3 }
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-200">
                  {getIcon()}
                </div>
              </motion.div>
            </div>
          );
      }
    };

    return (
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md"
          >
            <div className="mb-12">
              {getAnimation()}
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-center px-6"
            >
              <motion.h2 
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl font-black text-emerald-900 mb-4 tracking-tight"
              >
                {loadingMessage}
              </motion.h2>
              
              <div className="relative h-2 w-full bg-stone-100 rounded-full overflow-hidden mb-6">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="absolute inset-y-0 left-0 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                />
              </div>

              <div className="flex gap-3 justify-center mb-6">
                {[0, 1, 2, 3, 4].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ 
                      y: [0, -10, 0],
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{ 
                      duration: 1, 
                      repeat: Infinity, 
                      delay: i * 0.15,
                      ease: "easeInOut"
                    }}
                    className="w-2.5 h-2.5 bg-emerald-500 rounded-full"
                  />
                ))}
              </div>

              <p className="text-stone-400 text-sm font-bold uppercase tracking-widest">
                Preparing your session... {Math.round(progress)}%
              </p>
            </motion.div>

            {/* Background Decorative Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.03, 0.08, 0.03],
                  x: [0, 50, 0],
                  y: [0, 30, 0]
                }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-500 rounded-full blur-[100px]"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.02, 0.06, 0.02],
                  x: [0, -40, 0],
                  y: [0, -20, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-600 rounded-full blur-[100px]"
              />
              
              {/* Floating particles */}
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: Math.random() * 1000, 
                    y: Math.random() * 1000,
                    opacity: 0
                  }}
                  animate={{ 
                    y: [null, -100],
                    opacity: [0, 0.2, 0],
                    scale: [0, 1, 0]
                  }}
                  transition={{ 
                    duration: 3 + Math.random() * 4, 
                    repeat: Infinity, 
                    delay: Math.random() * 5 
                  }}
                  className="absolute w-1 h-1 bg-emerald-400 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen transition-colors duration-300 bg-stone-50 text-stone-900">
      <Sidebar />
      
      <AnimatePresence>
        {recentBadge && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[110] bg-white px-6 py-4 rounded-3xl shadow-2xl border border-emerald-100 flex items-center gap-4 min-w-[320px]"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${recentBadge.color}`}>
              <recentBadge.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Well Done!</p>
              <h4 className="font-black text-stone-900">{recentBadge.name}</h4>
              <p className="text-xs text-stone-500">{recentBadge.description}</p>
            </div>
            <button 
              onClick={() => setRecentBadge(null)}
              className="ml-auto p-2 text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="lg:pl-72 min-h-screen flex flex-col">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-3 flex items-center justify-between lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 hover:bg-stone-100 rounded-lg lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <h2 className="font-black text-lg tracking-tight">
                {quizState === 'NAME_ENTRY' ? 'Welcome' : 
                 quizState === 'LEVEL_SELECTION' ? 'Choose your level' :
                 quizState === 'SUBJECT_SELECTION' ? 'Pick a subject' :
                 quizState === 'PROFILE' ? 'My Progress' :
                 quizState === 'HELP' ? 'Help' :
                 selectedSubject || 'Revision'}
              </h2>
              {userName && <p className="text-xs text-stone-500 font-medium">Hello, {userName}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {quizState !== 'NAME_ENTRY' && (
              <button 
                onClick={() => navigateWithLoading('NAME_ENTRY')}
                className="p-2 hover:bg-stone-100 rounded-lg text-stone-500"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            )}
            <div className="w-px h-6 bg-stone-200 mx-1" />
            <button 
              onClick={() => navigateWithLoading('PROFILE')}
              className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-emerald-600/20"
            >
              <User className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 max-w-7xl mx-auto w-full">
          <LoadingOverlay isVisible={isLoading} message={loadingMessage} />
          
          <AnimatePresence mode="wait">
            {quizState === 'NAME_ENTRY' && (
              <motion.div
                key="name-entry"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-stone-100 text-center"
              >
                <div className="mb-6 inline-flex p-4 bg-emerald-100 rounded-2xl">
                  <User className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
                <p className="text-stone-500 mb-2 text-sm">Please enter your full name to begin the revision session.</p>
                <p className="text-emerald-600 mb-8 text-xs font-bold uppercase tracking-widest">Instructor: Niyomwungeri Patrick • {selectedSubLevel || 'Primary 5'}</p>
                
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-6 py-4 bg-stone-50 border-2 border-transparent focus:border-emerald-500 rounded-2xl text-lg font-bold outline-none transition-all"
                  />
                </div>
                
                <button
                  onClick={() => userName.trim() && navigateWithLoading('LEVEL_SELECTION')}
                  disabled={!userName.trim()}
                  className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {quizState === 'PROFILE' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="bg-white p-8 rounded-3xl shadow-xl border border-stone-100">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-5xl font-black text-emerald-600">{userName ? userName[0].toUpperCase() : 'U'}</span>
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <h2 className="text-3xl font-black mb-2">{userName || 'User Profile'}</h2>
                      <p className="text-stone-500 font-medium mb-6">Student • Revision System</p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-4 bg-stone-50 rounded-2xl">
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Total Mastery</p>
                          <p className="text-2xl font-black text-emerald-600">
                            {(Object.values(progress) as { maxScore: number; masterCount: number }[]).reduce((acc, curr) => acc + curr.masterCount, 0)}
                          </p>
                        </div>
                        <div className="p-4 bg-stone-50 rounded-2xl">
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Max Score</p>
                          <p className="text-2xl font-black text-emerald-600">
                            {Math.max(0, ...(Object.values(progress) as { maxScore: number; masterCount: number }[]).map(p => p.maxScore))}%
                          </p>
                        </div>
                        <div className="p-4 bg-stone-50 rounded-2xl">
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Streak</p>
                          <p className="text-2xl font-black text-rose-500 flex items-center gap-2">
                            <Zap className="w-6 h-6 fill-rose-500" />
                            {streak}
                          </p>
                        </div>
                        <div className="p-4 bg-stone-50 rounded-2xl">
                          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1">Badges</p>
                          <p className="text-2xl font-black text-purple-600">
                            {earnedBadges.length}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <Award className="w-6 h-6 text-emerald-600" />
                    Achievements
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {BADGES.map(badge => {
                      const isEarned = earnedBadges.includes(badge.id);
                      const Icon = badge.icon;
                      return (
                        <motion.div
                          key={badge.id}
                          whileHover={isEarned ? { scale: 1.05 } : {}}
                          className={`p-4 rounded-3xl border text-center transition-all ${
                            isEarned 
                              ? 'bg-white border-stone-100 shadow-sm' 
                              : 'bg-stone-50/50 border-dashed border-stone-200 opacity-40'
                          }`}
                        >
                          <div className={`w-12 h-12 mx-auto rounded-2xl flex items-center justify-center mb-3 ${isEarned ? badge.color : 'bg-stone-100 text-stone-400'}`}>
                            <Icon className="w-6 h-6" />
                          </div>
                          <h4 className={`text-xs font-black uppercase tracking-wider mb-1 ${isEarned ? 'text-stone-900' : 'text-stone-400'}`}>
                            {badge.name}
                          </h4>
                          <p className="text-[10px] text-stone-500 leading-tight">
                            {badge.description}
                          </p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-black flex items-center gap-2">
                    <BarChart3 className="w-6 h-6 text-emerald-600" />
                    Unit Progress
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(progress).map(([key, data]) => {
                    const progressData = data as { maxScore: number; masterCount: number };
                    const [level, subLevel, subject, unit] = key.split('-');
                    return (
                      <div key={key} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 rounded-xl">
                          <Award className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">{subject} • {unit}</p>
                          <h4 className="font-bold truncate">{unit}</h4>
                          <div className="mt-2 flex items-center gap-3">
                            <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                              <div className="h-full bg-emerald-500" style={{ width: `${progressData.maxScore}%` }} />
                            </div>
                            <span className="text-xs font-bold text-emerald-600">{progressData.maxScore}%</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                </div>
              </motion.div>
            )}

            {quizState === 'HELP' && (
              <motion.div
                key="help"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-3xl mx-auto space-y-8"
              >
                <div className="text-center mb-12">
                  <div className="inline-flex p-4 bg-emerald-100 rounded-2xl mb-4">
                    <HelpCircle className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h2 className="text-3xl font-black">Help Center</h2>
                  <p className="text-stone-500">Everything you need to know about the revision system</p>
                </div>

                <div className="space-y-4">
                  {[
                    { q: "How do I earn a certificate?", a: "Complete any unit quiz with a score of 80% or higher to unlock the certificate option." },
                    { q: "What is Study Mode?", a: "Study Mode allows you to review notes and key concepts before taking the quiz." },
                    { q: "Can I retake a quiz?", a: "Yes! You can retake any quiz as many times as you like to improve your score." },
                    { q: "How is my progress saved?", a: "Your progress is automatically saved to your browser's local storage." }
                  ].map((faq, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                      <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                      <p className="text-stone-500">{faq.a}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-emerald-600 p-8 rounded-3xl text-white text-center">
                  <h3 className="text-xl font-bold mb-2">Still need help?</h3>
                  <p className="opacity-80 mb-6">Contact your instructor for more detailed guidance.</p>
                  <button className="px-8 py-3 bg-white text-emerald-600 rounded-xl font-bold hover:bg-emerald-50 transition-colors">
                    Contact Support
                  </button>
                </div>
              </motion.div>
            )}

            {quizState === 'LEVEL_SELECTION' && (
            <motion.div
              key="level-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-bold text-stone-700">Choose Primary Level</h2>
                <button 
                  onClick={() => navigateWithLoading('NAME_ENTRY')}
                  className="flex items-center gap-1 text-stone-400 hover:text-stone-600 text-sm font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => { setSelectedLevel('UPPER'); navigateWithLoading('SUB_LEVEL_SELECTION'); }}
                  className="p-8 bg-white border-2 border-emerald-100 rounded-3xl shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left group relative"
                >
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest">
                    Open
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl w-fit mb-6 group-hover:bg-emerald-100 transition-colors">
                    <GraduationCap className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">Upper Primary</h3>
                  <p className="text-stone-500 text-sm">SET, SST, MATH, ENGLISH</p>
                </button>

                <button
                  onClick={() => { setSelectedLevel('LOWER'); setSelectedSubject(null); navigateWithLoading('SUBJECT_SELECTION'); }}
                  className="p-8 bg-white border-2 border-emerald-100 rounded-3xl shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left group relative"
                >
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest">
                    Open
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl w-fit mb-6 group-hover:bg-emerald-100 transition-colors">
                    <Sprout className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">Lower Primary</h3>
                  <p className="text-stone-500 text-sm">MATH, ENGLISH, KINYARWANDA</p>
                </button>
              </div>
            </motion.div>
          )}

          {quizState === 'SUB_LEVEL_SELECTION' && (
            <motion.div
              key="sub-level-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-xl font-bold text-stone-700">Choose Sub-Level</h2>
                <button 
                  onClick={() => navigateWithLoading('LEVEL_SELECTION')}
                  className="flex items-center gap-1 text-stone-400 hover:text-stone-600 text-sm font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button
                  onClick={() => { setSelectedSubLevel('P5'); navigateWithLoading('SUBJECT_SELECTION'); }}
                  className="p-8 bg-white border-2 border-emerald-100 rounded-3xl shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left group relative"
                >
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest">
                    Open
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl w-fit mb-6 group-hover:bg-emerald-100 transition-colors">
                    <GraduationCap className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">Primary 5</h3>
                  <p className="text-stone-500 text-sm">Upper Primary Level</p>
                </button>

                <button
                  onClick={() => { setSelectedSubLevel('P6'); navigateWithLoading('SUBJECT_SELECTION'); }}
                  className="p-8 bg-white border-2 border-emerald-100 rounded-3xl shadow-sm hover:border-emerald-500 hover:shadow-md transition-all text-left group relative"
                >
                  <div className="absolute top-4 right-4 px-3 py-1 bg-emerald-100 text-emerald-600 text-xs font-bold rounded-full uppercase tracking-widest">
                    Open
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-2xl w-fit mb-6 group-hover:bg-emerald-100 transition-colors">
                    <GraduationCap className="w-10 h-10 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-stone-800 mb-2">Primary 6</h3>
                  <p className="text-stone-500 text-sm">Upper Primary Level</p>
                </button>
              </div>
            </motion.div>
          )}

          {quizState === 'SUBJECT_SELECTION' && (
            <motion.div
              key="subject-selection"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-stone-700">Select Subject</h2>
                  <p className="text-stone-400 text-sm">{selectedLevel === 'UPPER' ? `Upper Primary (${selectedSubLevel})` : 'Lower Primary'}</p>
                </div>
                <button 
                  onClick={() => navigateWithLoading(selectedLevel === 'UPPER' ? 'SUB_LEVEL_SELECTION' : 'LEVEL_SELECTION')}
                  className="flex items-center gap-1 text-stone-400 hover:text-stone-600 text-sm font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {selectedLevel && subjects[selectedLevel].map((subject) => {
                  const Icon = subjectIcons[subject] || LayoutGrid;
                  const status = getSubjectStatus(subject);
                  const isOpen = status === 'OPEN';
                  const subjectProgress = getSubjectProgress(subject);
                  const subjectMastered = isSubjectMastered(subject);
                  
                  return (
                    <button
                      key={subject}
                      disabled={!isOpen}
                      onClick={() => { setSelectedSubject(subject); navigateWithLoading('START'); }}
                      className={`p-6 rounded-2xl shadow-sm transition-all text-center group relative flex flex-col items-center border-2 ${
                        isOpen 
                          ? `bg-white ${subjectMastered ? 'border-emerald-200 hover:border-emerald-500' : 'border-emerald-100 hover:border-emerald-500 hover:shadow-md cursor-pointer'}` 
                          : 'bg-stone-50 border-rose-100 opacity-60 cursor-not-allowed grayscale'
                      }`}
                    >
                      {status === 'OPEN' && (
                        <div className={`absolute top-2 right-2 px-2 py-0.5 text-[10px] font-bold rounded-full uppercase tracking-wider ${
                          subjectMastered ? 'bg-emerald-600 text-white' : 'bg-emerald-100 text-emerald-600'
                        }`}>
                          {subjectMastered ? 'Mastered' : 'Open'}
                        </div>
                      )}
                      {status === 'CLOSED' && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-rose-100 text-rose-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          Closed
                        </div>
                      )}
                      {status === 'OPENING_SOON' && (
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-amber-100 text-amber-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                          Opening 22 March
                        </div>
                      )}
                      <div className={`p-3 rounded-xl w-fit mx-auto mb-4 transition-colors ${
                        isOpen ? 'bg-emerald-50 group-hover:bg-emerald-100' : 'bg-rose-50'
                      }`}>
                        <Icon className={`w-6 h-6 ${
                          isOpen ? 'text-emerald-600 group-hover:text-emerald-700' : 'text-rose-400'
                        }`} />
                      </div>
                      <h3 className={`font-bold mb-2 ${isOpen ? 'text-emerald-900' : 'text-rose-400'}`}>{subject}</h3>
                      
                      {isOpen && (
                        <div className="w-full mt-auto">
                          <div className="flex justify-between text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-tighter">
                            <span>Progress</span>
                            <span className={subjectMastered ? 'text-emerald-600' : ''}>{subjectProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${subjectProgress}%` }}
                              className={`h-full ${subjectMastered ? 'bg-emerald-500' : 'bg-emerald-400'}`}
                            />
                          </div>
                        </div>
                      )}

                      {status === 'OPENING_SOON' && (
                        <p className="text-[10px] text-amber-500 mt-1 font-medium">Coming Soon</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {quizState === 'START' && (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-stone-700">Hello, <span className="text-emerald-600">{userName}</span>!</h2>
                  <p className="text-stone-400 text-sm">{selectedLevel} {selectedSubLevel ? `(${selectedSubLevel})` : ''} • {selectedSubject}</p>
                </div>
                <button 
                  onClick={() => navigateWithLoading('SUBJECT_SELECTION')}
                  className="flex items-center gap-1 text-stone-400 hover:text-stone-600 text-sm font-medium transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <button
                  onClick={() => startQuiz('GENERAL')}
                  className="col-span-full p-8 bg-stone-900 text-white rounded-3xl shadow-2xl hover:bg-black transition-all flex items-center justify-between group relative overflow-hidden border border-white/5"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <GraduationCap className="w-32 h-32 rotate-12" />
                  </div>
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="p-4 bg-emerald-500 rounded-2xl">
                      <LayoutGrid className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-2xl font-black tracking-tight">GENERAL QUIZ</h3>
                      <p className="text-stone-400 text-sm font-medium">
                        60 Mixed Questions • All Units
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-8 h-8 group-hover:translate-x-2 transition-transform relative z-10" />
                </button>

                <button
                  onClick={() => startQuiz('ALL')}
                  className="col-span-full p-6 bg-emerald-600 text-white rounded-2xl shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                      <LayoutGrid className="w-6 h-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">Quick Mix</h3>
                      <p className="text-emerald-100 text-sm">20 random questions</p>
                    </div>
                  </div>
                  <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>

                {units.map((unit, idx) => {
                  const Icon = unitIcons[unit] || Sprout;
                  const unitNote = notes.find(n => n.unit === unit && n.level === selectedLevel && n.subject === selectedSubject);
                  const unitProgress = getUnitProgress(unit);
                  const masterCount = getUnitMasterCount(unit);
                  const isMastered = masterCount >= 3;
                  
                  return (
                    <motion.div
                      key={unit}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`bg-white border rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col relative ${
                        isMastered ? 'border-emerald-200' : 'border-stone-200'
                      }`}
                    >
                      {isMastered ? (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-emerald-100 text-emerald-600 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider z-10">
                          <CheckCircle2 className="w-3 h-3" />
                          Mastered
                        </div>
                      ) : masterCount > 0 && (
                        <div className="absolute top-3 right-3 flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider z-10">
                          <Award className="w-3 h-3" />
                          {masterCount}/3 Mastery
                        </div>
                      )}
                      
                      <div className="p-6 flex-1">
                        <div className={`p-3 rounded-xl w-fit mb-4 ${isMastered ? 'bg-emerald-50' : 'bg-stone-100'}`}>
                          <Icon className={`w-6 h-6 ${isMastered ? 'text-emerald-600' : 'text-stone-600'}`} />
                        </div>
                        <h3 className="font-bold text-stone-800 leading-tight mb-4">{unit}</h3>
                        
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-[10px] font-bold text-stone-400 uppercase tracking-tighter">
                            <span>Max Score</span>
                            <span className={isMastered ? 'text-emerald-600' : ''}>{unitProgress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${unitProgress}%` }}
                              className={`h-full ${isMastered ? 'bg-emerald-500' : 'bg-stone-400'}`}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-4 bg-stone-50 border-t border-stone-100 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => startQuiz(unit)}
                          className="py-2 px-3 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-1"
                        >
                          Quiz
                        </button>
                        {unitNote && (
                          <button
                            onClick={() => { setSelectedNote(unitNote); navigateWithLoading('STUDY_MODE'); }}
                            className="py-2 px-3 bg-white border border-stone-200 text-stone-600 rounded-xl text-xs font-bold hover:bg-stone-100 transition-all flex items-center justify-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            Study Mode
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {quizState === 'INSTRUCTIONS' && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-md mx-auto bg-white p-8 rounded-3xl shadow-xl border border-stone-100"
            >
              <div className="mb-6 inline-flex p-4 bg-emerald-100 rounded-2xl">
                <FileText className="w-10 h-10 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold mb-6 text-center">Quiz Instructions</h2>
              
              <div className="space-y-4 mb-8">
                {[
                  "Each question has a 30-second time limit.",
                  "Read the question carefully before selecting an answer.",
                  "You cannot change your answer once selected.",
                  "The quiz will automatically move to the next question after you answer or time runs out.",
                  "You can view your results and download a certificate at the end."
                ].map((instruction, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className="text-stone-600 text-sm leading-relaxed">{instruction}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => navigateWithLoading('QUIZ')}
                  className="w-full p-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 group"
                >
                  Start Quiz
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => navigateWithLoading('START')}
                  className="w-full p-4 bg-stone-100 text-stone-600 rounded-2xl font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Units
                </button>
              </div>
            </motion.div>
          )}

          {quizState === 'QUIZ' && currentQuestion && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="max-w-2xl mx-auto"
            >
              <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-stone-200 text-stone-600 rounded-full text-xs font-bold uppercase tracking-widest">
                    {currentQuestion.unit}
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className={`flex items-center gap-2 font-mono font-bold ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-stone-600'}`}>
                    <Timer className="w-5 h-5" />
                    {timeLeft}s
                  </div>
                  <div className="text-stone-400 font-mono text-sm">
                    {currentIndex + 1} / {currentQuestions.length}
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-stone-100 mb-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-stone-100">
                  <motion.div 
                    className={`h-full ${timeLeft <= 5 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                    initial={{ width: '100%' }}
                    animate={{ width: `${(timeLeft / QUESTION_TIME) * 100}%` }}
                    transition={{ duration: 1, ease: 'linear' }}
                  />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-12 leading-snug">
                  {currentQuestion.question}
                </h2>

                <div className="space-y-4">
                  {currentQuestion.options.map((option) => {
                    const isSelected = option === selectedOption;
                    
                    let buttonClass = "w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between group ";
                    
                    if (!isAnswered) {
                      buttonClass += "border-stone-100 hover:border-emerald-500 hover:bg-emerald-50 bg-white text-stone-800";
                    } else {
                      if (isSelected) {
                        buttonClass += "border-emerald-500 bg-emerald-50 text-emerald-900";
                      } else {
                        buttonClass += "border-stone-50 border-opacity-50 text-stone-300";
                      }
                    }

                    return (
                      <button
                        key={option}
                        disabled={isAnswered}
                        onClick={() => handleAnswer(option)}
                        className={buttonClass}
                      >
                        <span className="font-medium text-lg">{option}</span>
                      </button>
                    );
                  })}
                </div>

                {isAnswered && selectedOption === null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 bg-rose-50 text-rose-700 rounded-xl text-center font-bold"
                  >
                    Time's up! Moving to next question...
                  </motion.div>
                )}
              </div>

              <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-emerald-500 h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
                />
              </div>
            </motion.div>
          )}

          {quizState === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center max-w-md mx-auto"
            >
              <div className="mb-8 inline-flex p-6 bg-emerald-100 rounded-full">
                <Trophy className="w-16 h-16 text-emerald-600" />
              </div>
              <h2 className="text-4xl font-bold mb-2">Great Job, {userName}!</h2>
              <p className="text-stone-500 mb-8">You've finished the {selectedUnit === 'GENERAL' ? 'General' : selectedUnit === 'ALL' ? 'Quick Mix' : selectedUnit} quiz.</p>
              
              <div className="bg-white p-8 rounded-3xl shadow-lg border border-stone-100 mb-8">
                <div className="text-6xl font-black text-emerald-600 mb-2">
                  {percentage}%
                </div>
                <p className="text-stone-400 font-medium">
                  {score} correct out of {currentQuestions.length}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <button
                  onClick={() => navigateWithLoading('REPORT')}
                  className="p-4 bg-stone-100 text-stone-700 rounded-2xl font-bold hover:bg-stone-200 transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5" />
                  Report
                </button>
                <button
                  onClick={() => navigateWithLoading('CERTIFICATE')}
                  className="p-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2 border border-white/5"
                >
                  <Award className="w-5 h-5" />
                  Certificate
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => startQuiz(selectedUnit)}
                  className="w-full p-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Try Again
                </button>
                <button
                  onClick={() => navigateWithLoading('START')}
                  className="w-full p-4 bg-white border border-stone-200 text-stone-600 rounded-2xl font-bold hover:bg-stone-50 transition-all"
                >
                  Back to Units
                </button>
              </div>
            </motion.div>
          )}

          {quizState === 'REPORT' && (
            <motion.div
              key="report"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <button 
                  onClick={() => navigateWithLoading('RESULT')}
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-bold transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Results
                </button>
                <h2 className="text-2xl font-black tracking-tight">QUIZ REPORT</h2>
                <p className="text-emerald-600 font-bold uppercase tracking-widest text-[10px]">Instructor: Niyomwungeri Patrick</p>
              </div>

              <div className="space-y-4">
                {currentQuestions.map((q, idx) => {
                  const answer = userAnswers.find(a => a.questionId === q.id);
                  return (
                    <div key={q.id} className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex-1">
                          <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1 block">Question {idx + 1} • {q.unit}</span>
                          <h3 className="text-lg font-bold text-stone-800">{q.question}</h3>
                        </div>
                        {answer?.isCorrect ? (
                          <div className="p-2 bg-emerald-100 rounded-full">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="p-2 bg-rose-100 rounded-full">
                            <XCircle className="w-5 h-5 text-rose-600" />
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className={`p-3 rounded-xl border ${answer?.isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-rose-50 border-rose-100'}`}>
                          <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 opacity-50">Your Answer</span>
                          <span className={`font-bold ${answer?.isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                            {answer?.selectedOption || "No Answer (Timed Out)"}
                          </span>
                        </div>
                        {!answer?.isCorrect && (
                          <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <span className="text-[10px] font-bold uppercase tracking-wider block mb-1 opacity-50 text-emerald-700">Correct Answer</span>
                            <span className="font-bold text-emerald-700">{q.correctAnswer}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => window.print()}
                className="mt-8 w-full p-4 bg-stone-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                <Printer className="w-5 h-5" />
                Print Full Report
              </button>
            </motion.div>
          )}

          {quizState === 'STUDY_MODE' && selectedNote && (
            <motion.div
              key="study-mode"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-stone-100">
                <div className="bg-emerald-600 p-8 md:p-12 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -mr-48 -mt-48 blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/20 rounded-full -ml-32 -mb-32 blur-2xl" />
                  
                  <button
                    onClick={() => navigateWithLoading('START')}
                    className="mb-8 flex items-center gap-2 text-emerald-100 hover:text-white transition-all hover:-translate-x-1 group"
                  >
                    <ChevronLeft className="w-5 h-5 transition-transform group-hover:scale-110" />
                    <span className="font-medium">Back to Units</span>
                  </button>

                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
                    <div className="flex items-center gap-6">
                      <div className="p-5 bg-white/20 rounded-[1.5rem] backdrop-blur-md shadow-inner border border-white/20">
                        {unitIcons[selectedNote.unit] ? (
                          (() => {
                            const Icon = unitIcons[selectedNote.unit];
                            return <Icon className="w-10 h-10 text-white" />;
                          })()
                        ) : (
                          <GraduationCap className="w-10 h-10 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-bold tracking-widest uppercase backdrop-blur-sm">Study Mode</span>
                          <span className="w-1 h-1 rounded-full bg-white/40" />
                          <span className="text-emerald-100 text-xs font-medium uppercase tracking-wider">{selectedSubject}</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{selectedNote.unit}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-16 bg-stone-50/50">
                  <div className="max-w-3xl mx-auto">
                    <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-sm border border-stone-100 prose prose-stone max-w-none">
                      <div className="text-stone-700 leading-relaxed whitespace-pre-wrap text-lg font-medium">
                        {selectedNote.content.split('\n').map((line, i) => {
                          if (line.startsWith('### ')) {
                            return <h3 key={i} className="text-2xl font-bold text-stone-900 mt-8 mb-4 border-b pb-2 border-stone-100">{line.replace('### ', '')}</h3>;
                          }
                          if (line.startsWith('#### ')) {
                            return <h4 key={i} className="text-xl font-bold text-emerald-700 mt-6 mb-3">{line.replace('#### ', '')}</h4>;
                          }
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return <p key={i} className="font-bold text-stone-900 mt-4 mb-2">{line.replace(/\*\*/g, '')}</p>;
                          }
                          if (line.startsWith('- **')) {
                            const [title, ...rest] = line.replace('- **', '').split('**:');
                            return (
                              <div key={i} className="mb-4 flex gap-4 group">
                                <div className="mt-2.5 w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-sm group-hover:scale-125 transition-transform" />
                                <p>
                                  <span className="font-bold text-stone-900">{title}:</span>
                                  <span className="text-stone-600">{rest.join('**:')}</span>
                                </p>
                              </div>
                            );
                          }
                          if (line.startsWith('- ')) {
                            return (
                              <div key={i} className="mb-3 flex gap-4 group">
                                <div className="mt-2.5 w-2 h-2 rounded-full bg-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                                <p className="text-stone-600 italic">{line.replace('- ', '')}</p>
                              </div>
                            );
                          }
                          if (line.trim() === '') return <div key={i} className="h-4" />;
                          return <p key={i} className="mb-4 text-stone-600">{line}</p>;
                        })}
                      </div>
                    </div>

                    <div className="mt-12 flex flex-col sm:flex-row gap-6">
                      <button
                        onClick={() => startQuiz(selectedNote.unit)}
                        className="flex-[2] p-6 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-emerald-200 hover:-translate-y-1 active:scale-95 group"
                      >
                        <div className="p-2 bg-white/20 rounded-lg group-hover:rotate-12 transition-transform">
                          <Trophy className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <span className="block text-[10px] uppercase tracking-widest opacity-80">Ready to test?</span>
                          <span className="text-lg">Start Unit Quiz</span>
                        </div>
                        <ArrowRight className="w-6 h-6 ml-auto group-hover:translate-x-1 transition-transform" />
                      </button>
                      
                      <button
                        onClick={() => navigateWithLoading('START')}
                        className="flex-1 p-6 bg-white text-stone-600 border-2 border-stone-100 rounded-2xl font-bold hover:bg-stone-50 transition-all flex items-center justify-center gap-2 hover:border-stone-200 active:scale-95"
                      >
                        Other Units
                      </button>
                    </div>
                    
                    <div className="mt-8 p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                      <div className="p-2 bg-emerald-100 rounded-lg">
                        <Lightbulb className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h5 className="font-bold text-emerald-900 text-sm">Study Tip</h5>
                        <p className="text-emerald-700 text-xs leading-relaxed">
                          Review the key terms and diagrams before starting the quiz. 
                          Try to explain the concepts in your own words to ensure deep understanding.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {quizState === 'CERTIFICATE' && (
            <motion.div
              key="certificate"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-between mb-8 no-print">
                <button 
                  onClick={() => navigateWithLoading('RESULT')}
                  className="flex items-center gap-2 text-stone-500 hover:text-stone-900 font-bold transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Back to Results
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => window.print()}
                    className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2 font-bold shadow-lg shadow-emerald-200"
                  >
                    <Download className="w-5 h-5" />
                    Download Certificate (PDF)
                  </button>
                </div>
              </div>

              {/* Certificate Design */}
              <div className="bg-white p-12 md:p-20 rounded-none border-[24px] border-double border-stone-200 shadow-2xl relative overflow-hidden certificate-content">
                {/* Decorative SVG Border Overlay */}
                <div className="absolute inset-0 border-[2px] border-emerald-600/20 m-4 pointer-events-none" />
                <div className="absolute inset-0 border-[1px] border-stone-900/10 m-6 pointer-events-none" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-24 h-24 border-t-4 border-l-4 border-emerald-600/30 m-8" />
                <div className="absolute top-0 right-0 w-24 h-24 border-t-4 border-r-4 border-emerald-600/30 m-8" />
                <div className="absolute bottom-0 left-0 w-24 h-24 border-b-4 border-l-4 border-emerald-600/30 m-8" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b-4 border-r-4 border-emerald-600/30 m-8" />

                {/* Watermark */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] rotate-[-15deg]">
                  <Trophy className="w-[500px] h-[500px] text-stone-900" />
                </div>
                
                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-10">
                    <div className="relative">
                      <div className="absolute inset-0 bg-emerald-500 blur-2xl opacity-20 animate-pulse" />
                      <div className="relative p-5 bg-stone-900 rounded-full shadow-xl">
                        <GraduationCap className="w-14 h-14 text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-12">
                    <h1 className="text-xs font-black tracking-[0.5em] text-emerald-600 uppercase">Official Certification</h1>
                    <div className="h-px w-24 bg-stone-200 mx-auto" />
                  </div>

                  <h2 className="text-6xl md:text-7xl font-serif italic text-stone-900 mb-4 tracking-tight">Certificate of Achievement</h2>
                  <p className="text-stone-400 font-bold uppercase tracking-widest text-[10px] mb-12">Issued by the Revision Quiz System • Instructor: Niyomwungeri Patrick</p>
                  
                  <div className="mb-12">
                    <p className="text-stone-500 text-xl font-serif italic mb-6">This prestigious award is proudly presented to</p>
                    <div className="relative inline-block">
                      <h3 className="text-5xl md:text-7xl font-black text-stone-900 mb-2 px-12 py-4 relative z-10">
                        {userName}
                      </h3>
                      <div className="absolute bottom-4 left-0 w-full h-4 bg-emerald-100 -z-10" />
                    </div>
                  </div>
                  
                  <p className="text-stone-500 text-xl max-w-2xl mx-auto mb-16 leading-relaxed font-serif italic">
                    for demonstrating exceptional knowledge and mastery in the <br/>
                    <span className="font-bold text-stone-900 not-italic uppercase tracking-wider text-lg">
                      {selectedSubject}: {selectedUnit === 'GENERAL' ? 'General Revision' : selectedUnit}
                    </span>
                  </p>
                  
                  <div className="flex items-center justify-center gap-12 mb-20">
                    <div className="w-32 h-px bg-stone-200" />
                    <div className="relative group">
                      <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-10" />
                      <div className="relative p-10 bg-stone-50 rounded-full border-4 border-double border-stone-200 flex flex-col items-center justify-center shadow-inner">
                        <div className="text-5xl font-black text-emerald-600 leading-none">{percentage}%</div>
                        <div className="text-[9px] font-black text-stone-400 uppercase tracking-widest mt-2">Final Grade</div>
                      </div>
                    </div>
                    <div className="w-32 h-px bg-stone-200" />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-12 max-w-3xl mx-auto pt-12 border-t border-stone-100 items-end">
                    <div className="text-center">
                      <p className="font-serif italic text-stone-900 text-lg mb-1">{new Date().toLocaleDateString()}</p>
                      <div className="h-px bg-stone-300 mb-2" />
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Date of Issue</p>
                    </div>

                    <div className="flex justify-center pb-2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-20" />
                        <div className="relative w-24 h-24 bg-yellow-500 rounded-full border-4 border-yellow-600 flex items-center justify-center shadow-lg rotate-12">
                          <Trophy className="w-12 h-12 text-yellow-100" />
                          <div className="absolute inset-0 border-4 border-dashed border-yellow-400 rounded-full animate-[spin_10s_linear_infinite]" />
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="font-serif italic text-stone-900 text-2xl mb-1 signature-font">N. Patrick</p>
                      <div className="h-px bg-stone-300 mb-2" />
                      <p className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Instructor Signature</p>
                    </div>
                  </div>
                </div>
                
                {/* Bottom Decorative Pattern */}
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-stone-900 via-emerald-600 to-stone-900" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400&display=swap');
        
        .font-serif {
          font-family: 'Playfair Display', serif;
        }

        .signature-font {
          font-family: 'Playfair Display', serif;
          letter-spacing: -1px;
        }

        @media print {
          .no-print { display: none !important; }
          body { background: white !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; padding: 0 !important; }
          .max-w-4xl { max-width: 100% !important; margin: 0 !important; }
          .certificate-content { 
            box-shadow: none !important; 
            border-width: 20px !important;
            padding: 60px !important;
            height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
