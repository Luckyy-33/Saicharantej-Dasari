import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Code, 
  Briefcase, 
  CheckCircle2, 
  ExternalLink, 
  Clock, 
  Search, 
  Filter, 
  Printer, 
  ChevronRight, 
  AlertCircle,
  Linkedin,
  Github,
  Globe,
  Sparkles,
  RefreshCw,
  Edit2,
  Save,
  X,
  ChevronDown,
  ChevronUp,
  Calendar,
  Layers,
  Activity,
  Star
} from 'lucide-react';
import { ROADMAP_DATA } from './constants';
import { Milestone, Project, ProjectMilestone } from './types';
import { summarizeProject, generateProjectTags, getLatestIndustryUpdates, estimateProjectFeasibility } from './services/geminiService';

export default function App() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('All');

  const calculateTimeline = (baseDurationWeeks: string) => {
    const weeks = parseInt(baseDurationWeeks);
    // Assuming base duration is for 20 hours/week
    const adjustedWeeks = Math.ceil((weeks * 20) / hoursPerWeek);
    if (adjustedWeeks < 1) return "1 week";
    if (adjustedWeeks > 52) return `${(adjustedWeeks / 4.3).toFixed(1)} months`;
    return `${adjustedWeeks} weeks`;
  };

  const filteredProjects = useMemo(() => {
    return ROADMAP_DATA.projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = categoryFilter === 'All' || project.category === categoryFilter;
      const matchesDifficulty = difficultyFilter === 'All' || project.difficulty === difficultyFilter;
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchQuery, categoryFilter, difficultyFilter]);

  const categories = ['All', ...new Set(ROADMAP_DATA.projects.map(p => p.category))];
  const difficulties = ['All', 'Easy', 'Medium', 'Hard', 'Expert'];

  return (
    <div className="min-h-screen font-sans">
      {/* Hero Section */}
      <header className="relative overflow-hidden pt-20 pb-16 px-6 border-b border-slate-800">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-blue-500/10 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium tracking-wider text-blue-400 uppercase bg-blue-400/10 rounded-full border border-blue-400/20">
              2026 Career Transformation
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight text-white">
              GenAI Roadmap for <span className="text-blue-500">B.Com Graduates</span>
            </h1>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Bridge the gap between business context and technical AI. A structured, 
              zero-cost path to becoming a Job-Ready AI Solutions Analyst.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 no-print">
              <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-all border border-slate-700"
              >
                <Printer size={18} />
                Print Roadmap
              </button>
              <a 
                href="#milestones"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all shadow-lg shadow-blue-600/20"
              >
                Start Learning
                <ChevronRight size={18} />
              </a>
            </div>
          </motion.div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-24">
        
        {/* Latest Industry Updates */}
        <LatestUpdates />

        {/* Why Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
              <Briefcase className="text-blue-500" />
              Why B.Com + AI?
            </h2>
            <div className="space-y-4">
              {ROADMAP_DATA.why.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex gap-4"
                >
                  <div className="mt-1 text-blue-500">
                    <CheckCircle2 size={20} />
                  </div>
                  <p className="text-slate-300">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-600/20 to-emerald-600/20 p-8 rounded-3xl border border-slate-800 relative">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertCircle className="text-amber-500" />
              The Retention Rules
            </h3>
            <div className="space-y-6">
              {ROADMAP_DATA.retentionRules.map((rule, i) => (
                <div key={i}>
                  <h4 className="font-bold text-slate-100 mb-1">{rule.title}</h4>
                  <p className="text-slate-400 text-sm">{rule.rule}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Calculator */}
        <section className="bg-slate-900 rounded-3xl p-8 border border-slate-800 no-print">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold mb-2">Personalize Your Timeline</h2>
              <p className="text-slate-400">Adjust your weekly commitment to see how long each stage will take.</p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex justify-between mb-4">
                <span className="text-sm font-medium text-slate-400">Commitment</span>
                <span className="text-sm font-bold text-blue-500">{hoursPerWeek} hours/week</span>
              </div>
              <input 
                type="range" 
                min="5" 
                max="40" 
                step="5"
                value={hoursPerWeek}
                onChange={(e) => setHoursPerWeek(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between mt-2 text-xs text-slate-500">
                <span>Part-time (5h)</span>
                <span>Full-time (40h)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Milestones */}
        <section id="milestones">
          <h2 className="text-4xl font-display font-bold mb-12 text-center">The Learning Path</h2>
          <div className="relative space-y-12">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-800 hidden md:block" />
            
            {ROADMAP_DATA.milestones.map((milestone, i) => (
              <MilestoneCard 
                key={i} 
                milestone={milestone} 
                calculateTimeline={calculateTimeline} 
              />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-display font-bold mb-4">Portfolio Projects</h2>
            <p className="text-slate-400">Build these to prove your skills. Focus on Fintech and Compliance to leverage your B.Com background.</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 no-print">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
              <input 
                type="text"
                placeholder="Search projects or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      categoryFilter === cat 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 border-l border-slate-800 pl-2">
                {difficulties.map(diff => (
                  <button
                    key={diff}
                    onClick={() => setDifficultyFilter(diff)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      difficultyFilter === diff 
                      ? 'bg-amber-600 text-white' 
                      : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center no-print">
            <p className="text-slate-500 text-sm">
              Showing <span className="text-slate-200 font-bold">{filteredProjects.length}</span> projects
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode='popLayout'>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* LinkedIn Strategy */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <h2 className="text-3xl font-display font-bold mb-6 flex items-center gap-3">
              <Linkedin />
              The LinkedIn Strategy
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Don't just post certificates. Post your **struggle**. Show hiring managers 
              how you solve problems.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <h4 className="font-bold mb-2">Post Idea #1</h4>
                <p className="text-sm text-blue-50 text-opacity-80">
                  "Spent 4 hours debugging a Python loop for my RBI RAG project. Here's what I learned about data chunking..."
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
                <h4 className="font-bold mb-2">Post Idea #2</h4>
                <p className="text-sm text-blue-50 text-opacity-80">
                  "Why LLMs fail at interest rate calculations and how I used Chain-of-Thought prompting to fix it."
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 py-12 px-6 bg-slate-950">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-display font-bold mb-2">2026 GenAI Roadmap</h2>
            <p className="text-slate-500 text-sm">Tailored for Indian B.Com Graduates</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Github size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Globe size={20} /></a>
          </div>
          <p className="text-slate-600 text-xs">
            © 2026. Built with passion for the next gen of AI Analysts.
          </p>
        </div>
      </footer>
    </div>
  );
}

interface MilestoneCardProps {
  key?: React.Key;
  milestone: Milestone;
  calculateTimeline: (dur: string) => string;
}

function MilestoneCard({ milestone, calculateTimeline }: MilestoneCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="relative md:pl-24"
    >
      {/* Circle Marker */}
      <div className="absolute left-0 md:left-8 top-0 -translate-x-1/2 w-16 h-16 bg-slate-900 border-4 border-slate-950 rounded-full flex items-center justify-center z-20 shadow-xl">
        <span className="text-2xl font-display font-bold text-blue-500">{milestone.stage}</span>
      </div>

      <div className="roadmap-card bg-slate-900/40 rounded-3xl p-8 border border-slate-800 hover:border-slate-700 transition-all group">
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{milestone.title}</h3>
            <p className="text-slate-400 leading-relaxed">{milestone.description}</p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 rounded-full border border-blue-500/20 text-sm font-bold">
              <Clock size={16} />
              {calculateTimeline(milestone.duration)}
            </div>
            <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-widest">Estimated Duration</span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Code size={16} />
              Core Topics
            </h4>
            <ul className="grid grid-cols-1 gap-2">
              {milestone.topics.map((topic, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-300 text-sm">
                  <div className="w-1 h-1 bg-blue-500 rounded-full" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
              <BookOpen size={16} />
              Top Resources
            </h4>
            <div className="space-y-3">
              {milestone.resources.map((res, i) => (
                <a 
                  key={i}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 bg-slate-800/50 hover:bg-slate-800 rounded-xl border border-slate-700/50 transition-all group/res"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-200 group-hover/res:text-blue-400 transition-colors">{res.title}</span>
                    <span className="text-[10px] text-slate-500 uppercase">{res.provider} • {res.type}</span>
                  </div>
                  <ExternalLink size={14} className="text-slate-600 group-hover/res:text-blue-400" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const DIFFICULTY_TOOLTIPS: Record<string, string> = {
  'Easy': "Suitable for beginners with minimal technical knowledge. Can be completed quickly with standard resources.",
  'Medium': "Requires some experience and moderate technical skills. May need research or guidance.",
  'Hard': "Demands advanced skills and significant experience. Requires careful planning and substantial time investment.",
  'Expert': "Requires specialized expertise and extensive experience. Complex problem-solving and significant resources needed."
};

function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    timeoutRef.current = setTimeout(() => setShowTooltip(true), 250);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowTooltip(false);
  };

  return (
    <div className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <span className={`text-xs font-bold px-2 py-1 rounded cursor-help ${
        difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-400/10' :
        difficulty === 'Medium' ? 'text-blue-400 bg-blue-400/10' :
        difficulty === 'Hard' ? 'text-amber-400 bg-amber-400/10' :
        'text-rose-400 bg-rose-400/10'
      }`}>
        {difficulty}
      </span>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-800 text-slate-200 text-[10px] leading-relaxed rounded-lg shadow-xl border border-slate-700 z-50"
          >
            {DIFFICULTY_TOOLTIPS[difficulty] || "Unknown difficulty"}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ProjectCardProps {
  key?: React.Key;
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [summary, setSummary] = useState(project.summary || '');
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [editedSummary, setEditedSummary] = useState(summary);

  const [tags, setTags] = useState(project.tags);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);

  const [feasibility, setFeasibility] = useState<{score: number, explanation: string} | null>(null);
  const [isCheckingFeasibility, setIsCheckingFeasibility] = useState(false);

  const [isMilestonesExpanded, setIsMilestonesExpanded] = useState(false);

  const handleSummarize = async () => {
    setIsSummarizing(true);
    const result = await summarizeProject(project.title, project.description);
    setSummary(result);
    setEditedSummary(result);
    setIsSummarizing(false);
  };

  const handleGenerateTags = async () => {
    setIsGeneratingTags(true);
    const result = await generateProjectTags(
      project.title, 
      project.description, 
      project.milestones.map(m => m.title)
    );
    setSuggestedTags(result.filter(t => !tags.includes(t)));
    setShowTagSuggestions(true);
    setIsGeneratingTags(false);
  };

  const handleCheckFeasibility = async () => {
    setIsCheckingFeasibility(true);
    const duration = project.milestones.length > 0 ? `${project.milestones.length * 2} weeks` : "Unknown";
    const result = await estimateProjectFeasibility(project.difficulty, duration, tags);
    setFeasibility(result);
    setIsCheckingFeasibility(false);
  };

  const addTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
    setSuggestedTags(suggestedTags.filter(t => t !== tag));
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const completedMilestones = project.milestones.filter(m => m.status === 'completed').length;
  const totalMilestones = project.milestones.length;
  const progressPercentage = Math.round((completedMilestones / totalMilestones) * 100);

  const nextMilestone = project.milestones.find(m => m.status !== 'completed');

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col h-full hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 group"
    >
      {/* Header */}
      <div className="p-6 border-b border-slate-800">
        <div className="flex justify-between items-start mb-4">
          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            project.category === 'Fintech' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
            project.category === 'Compliance' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
          }`}>
            {project.category}
          </span>
          <div className="flex items-center gap-3">
            <DifficultyBadge difficulty={project.difficulty} />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors">{project.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{project.description}</p>
      </div>

      {/* AI Summary Section */}
      <div className="px-6 py-4 bg-slate-950/50 border-b border-slate-800">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Sparkles size={14} className="text-blue-400" />
            AI Summary
          </h4>
          {!summary && !isSummarizing && (
            <button 
              onClick={handleSummarize}
              className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors"
            >
              Generate Summary
            </button>
          )}
          {summary && !isEditingSummary && (
            <div className="flex gap-3">
              <button 
                onClick={handleSummarize}
                disabled={isSummarizing}
                className="text-slate-500 hover:text-blue-400 transition-colors disabled:opacity-50"
                title="Regenerate Summary"
              >
                <RefreshCw size={12} className={isSummarizing ? 'animate-spin' : ''} />
              </button>
              <button 
                onClick={() => setIsEditingSummary(true)}
                className="text-slate-500 hover:text-blue-400 transition-colors"
                title="Edit Summary"
              >
                <Edit2 size={12} />
              </button>
            </div>
          )}
        </div>

        {isSummarizing ? (
          <div className="flex items-center gap-3 py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <span className="text-xs text-slate-500 italic">Thinking...</span>
          </div>
        ) : isEditingSummary ? (
          <div className="space-y-2">
            <textarea 
              value={editedSummary}
              onChange={(e) => setEditedSummary(e.target.value)}
              className="w-full bg-slate-900 border border-blue-500/50 rounded-lg p-2 text-xs text-slate-300 focus:outline-none min-h-[60px]"
            />
            <div className="flex justify-end gap-2">
              <button 
                onClick={() => setIsEditingSummary(false)}
                className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
              >
                <X size={14} />
              </button>
              <button 
                onClick={() => {
                  setSummary(editedSummary);
                  setIsEditingSummary(false);
                }}
                className="p-1 text-slate-500 hover:text-emerald-400 transition-colors"
              >
                <Save size={14} />
              </button>
            </div>
          </div>
        ) : summary ? (
          <p className="text-xs text-slate-300 leading-relaxed italic border-l-2 border-blue-500/30 pl-3">
            "{summary}"
          </p>
        ) : (
          <p className="text-[10px] text-slate-600 italic">No summary generated yet.</p>
        )}
      </div>

      {/* Tags Section */}
      <div className="px-6 py-4 border-b border-slate-800">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Layers size={14} />
            Tags
          </h4>
          <button 
            onClick={handleGenerateTags}
            disabled={isGeneratingTags}
            className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors disabled:opacity-50"
          >
            {isGeneratingTags ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />}
            Suggest Tags
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-slate-800 text-slate-400 text-[10px] rounded-md border border-slate-700">
              #{tag}
              <button onClick={() => removeTag(tag)} className="hover:text-rose-400">
                <X size={10} />
              </button>
            </span>
          ))}
        </div>

        {showTagSuggestions && suggestedTags.length > 0 && (
          <div className="p-3 bg-blue-500/5 rounded-xl border border-blue-500/10">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">AI Suggestions</span>
              <button onClick={() => setShowTagSuggestions(false)} className="text-slate-600 hover:text-slate-400">
                <X size={10} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => addTag(tag)}
                  className="px-2 py-1 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 text-[10px] rounded-md border border-blue-500/20 transition-all"
                >
                  + {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Feasibility Section */}
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/30">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} />
            Feasibility Score
          </h4>
          {!feasibility && (
            <button
              onClick={handleCheckFeasibility}
              disabled={isCheckingFeasibility}
              className="text-[10px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors disabled:opacity-50"
            >
              {isCheckingFeasibility ? <RefreshCw size={10} className="animate-spin" /> : <Sparkles size={10} />}
              Analyze Risk
            </button>
          )}
        </div>
        {isCheckingFeasibility ? (
          <div className="flex items-center gap-3 py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
            <span className="text-xs text-slate-500 italic">Analyzing factors...</span>
          </div>
        ) : feasibility ? (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} size={14} className={star <= feasibility.score ? "text-amber-400 fill-amber-400" : "text-slate-700"} />
                ))}
              </div>
              <span className="text-xs font-bold text-slate-300">{feasibility.score}/5</span>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">{feasibility.explanation}</p>
          </div>
        ) : (
          <p className="text-[10px] text-slate-600 italic">Click to estimate project feasibility and risk.</p>
        )}
      </div>

      {/* Progress Section */}
      <div className="px-6 py-4 flex-grow">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Progress</h4>
            <div className="text-xl font-bold text-white">
              {progressPercentage}% <span className="text-xs font-normal text-slate-500">({completedMilestones}/{totalMilestones})</span>
            </div>
          </div>
          {nextMilestone && (
            <div className="text-right">
              <span className="text-[10px] text-slate-500 uppercase block">Next Up</span>
              <span className="text-xs font-medium text-blue-400">{nextMilestone.title}</span>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden mb-4 relative">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-blue-600 to-emerald-500"
          />
          {/* Milestone Markers */}
          {project.milestones.map((_, idx) => (
            <div 
              key={idx}
              className="absolute top-0 bottom-0 w-px bg-slate-900/50"
              style={{ left: `${(idx + 1) * (100 / totalMilestones)}%` }}
            />
          ))}
        </div>

        {/* Expandable Milestones */}
        <button 
          onClick={() => setIsMilestonesExpanded(!isMilestonesExpanded)}
          className="w-full flex items-center justify-between py-2 text-xs font-bold text-slate-500 hover:text-slate-300 transition-colors"
        >
          View Milestones
          {isMilestonesExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        <AnimatePresence>
          {isMilestonesExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden space-y-3 mt-3"
            >
              {project.milestones.map((m) => (
                <div key={m.id} className="flex items-start gap-3 p-2 rounded-lg bg-slate-950/30 border border-slate-800/50">
                  <div className={`mt-1 rounded-full p-1 ${
                    m.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' :
                    m.status === 'in-progress' ? 'bg-amber-500/20 text-amber-500' :
                    'bg-slate-800 text-slate-600'
                  }`}>
                    <CheckCircle2 size={12} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <span className={`text-xs font-bold ${m.status === 'completed' ? 'text-slate-400 line-through' : 'text-slate-200'}`}>
                        {m.title}
                      </span>
                      {m.dueDate && (
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Calendar size={10} />
                          {m.dueDate}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function LatestUpdates() {
  const [updates, setUpdates] = React.useState<{text: string, sources: any[]}>({ text: '', sources: [] });
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);

  const fetchUpdates = async () => {
    setIsLoading(true);
    const result = await getLatestIndustryUpdates();
    setUpdates(result);
    setHasLoaded(true);
    setIsLoading(false);
  };

  return (
    <section className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6 relative z-10">
        <div>
          <h2 className="text-2xl font-display font-bold flex items-center gap-2">
            <Globe className="text-blue-500" />
            Live Industry Updates
          </h2>
          <p className="text-slate-400 text-sm mt-1">Powered by Google Search Grounding</p>
        </div>
        
        <button 
          onClick={fetchUpdates}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-xl border border-blue-500/30 transition-all disabled:opacity-50"
        >
          {isLoading ? <RefreshCw size={16} className="animate-spin" /> : <Sparkles size={16} />}
          {hasLoaded ? "Refresh Updates" : "Fetch Latest News"}
        </button>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" />
          </div>
          <p className="text-slate-500 text-sm animate-pulse">Searching the web for the latest GenAI trends in Fintech...</p>
        </div>
      ) : hasLoaded ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 relative z-10"
        >
          <div className="prose prose-invert prose-sm max-w-none">
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">{updates.text}</p>
          </div>
          
          {updates.sources && updates.sources.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Sources</h4>
              <div className="flex flex-wrap gap-3">
                {updates.sources.map((source: any, idx: number) => {
                  const url = source.web?.uri;
                  const title = source.web?.title;
                  if (!url) return null;
                  return (
                    <a 
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition-colors text-xs text-slate-300 hover:text-blue-400 group"
                    >
                      <ExternalLink size={12} className="text-slate-500 group-hover:text-blue-400" />
                      <span className="max-w-[200px] truncate">{title || new URL(url).hostname}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      ) : (
        <div className="py-8 text-center border-2 border-dashed border-slate-800 rounded-xl">
          <p className="text-slate-500">Click the button above to fetch real-time updates on Generative AI in the financial sector.</p>
        </div>
      )}
    </section>
  );
}
