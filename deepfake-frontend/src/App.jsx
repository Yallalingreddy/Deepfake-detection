import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  History,
  Settings,
  Info,
  ShieldCheck,
  Activity,
  UploadCloud,
  XCircle,
  CheckCircle,
  Brain,
  BarChart3,
  Github,
  PieChart,
  X,
  LogOut,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  Trash2,
  Search,
  Filter,
  Download,
  Bell,         // New
  Moon,         // New
  Smartphone,   // New
  Save,         // New
  Sliders       // New
} from "lucide-react";

// --- IMPORT IMAGES (Must match your folder structure exactly) ---
import chart1 from './datavisual_pics/chart1.jpeg';
import chart2 from './datavisual_pics/chart2.jpeg';
import chart3 from './datavisual_pics/chart3.jpeg';
import chart4 from './datavisual_pics/chart4.jpeg';
import chart5 from './datavisual_pics/chart5.jpeg';
import predictionGrid from './datavisual_pics/prediction_grid.jpeg';
import srmAnaly from './datavisual_pics/srm_analy.jpeg';

// ==================================================================================
//  1. AUTHENTICATION COMPONENT
// ==================================================================================

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill in all fields");
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ email, name: email.split("@")[0] });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0f172a]/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-500/10 p-3 rounded-2xl border border-indigo-500/20">
              <ShieldCheck className="text-indigo-400 w-10 h-10" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">DeepScan.AI</h1>
          <p className="text-slate-400">
            {isLogin ? "Welcome back! Please enter your details." : "Create an account to start detecting."}
          </p>
        </div>

        {/* FIXED: Removed duplicate 'fill' attributes to fix VS Code error */}
        <button 
          onClick={() => alert("Google Auth integration requires Firebase/Backend setup.")}
          className="w-full bg-white text-slate-900 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-3 hover:bg-slate-100 transition-colors mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <div className="relative flex items-center gap-4 mb-6">
          <div className="h-px bg-white/10 flex-1" />
          <span className="text-slate-500 text-sm font-medium">OR</span>
          <div className="h-px bg-white/10 flex-1" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="John Doe"
                  className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1.5 ml-1">Password</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#020617] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
              <input type="checkbox" className="rounded border-white/10 bg-[#020617] text-indigo-500 focus:ring-indigo-500/20" />
              Remember me
            </label>
            {isLogin && <a href="#" className="text-indigo-400 hover:text-indigo-300">Forgot password?</a>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : (
              <>
                {isLogin ? "Sign In" : "Create Account"}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"} 
          <button 
            onClick={() => setIsLogin(!isLogin)} 
            className="text-indigo-400 font-semibold ml-2 hover:underline"
          >
            {isLogin ? "Sign up" : "Log in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

// ==================================================================================
//  2. CORE APP COMPONENTS
// ==================================================================================

const VisualizationsModal = ({ onClose }) => {
  const visualData = {
    charts: [
      { title: "ROC Curve", src: chart1 },
      { title: "Calibration Curve",       src: chart2 },
      { title: "Confusion Matrix",   src: chart3 },
      { title: "Precision_Recall Curve ",        src: chart4 },
      { title: "Prediction-Distribution",   src: chart5 },
    ],
    prediction: {
      title: "Prediction Confidence Grid",
      src: predictionGrid
    },
    srm: {
      title: "SRM Noise Residual Analysis",
      src: srmAnaly
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 20 }}
        className="bg-[#0f172a] border border-white/10 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 border-b border-white/10 pb-4">
          <PieChart className="text-pink-500" /> Data Visualizations
        </h3>

        <div className="mb-10">
          <h4 className="text-xl font-semibold text-indigo-400 mb-4 flex items-center gap-2">
            <span className="bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded text-sm">01</span>
            Analysis Charts & Graphs
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visualData.charts.map((img, index) => (
              <div key={index} className="space-y-2 group">
                <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 relative h-56 flex items-center justify-center p-2">
                  <img 
                    src={img.src} 
                    alt={img.title} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-center text-xs text-slate-400 font-mono mt-2">{img.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h4 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
            <span className="bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded text-sm">02</span>
            Prediction Grid
          </h4>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2">
            <img 
              src={visualData.prediction.src} 
              alt={visualData.prediction.title} 
              className="w-full h-auto max-h-[400px] object-contain mx-auto"
            />
          </div>
          <p className="mt-2 text-sm text-slate-400 text-center">{visualData.prediction.title}</p>
        </div>

        <div className="mb-4">
          <h4 className="text-xl font-semibold text-emerald-400 mb-4 flex items-center gap-2">
             <span className="bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-sm">03</span>
             SRM Noise Residual
          </h4>
          <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40 p-2">
            <img 
              src={visualData.srm.src} 
              alt={visualData.srm.title} 
              className="w-full h-auto max-h-[400px] object-contain mx-auto"
            />
          </div>
          <p className="mt-2 text-sm text-slate-400 text-center">{visualData.srm.title}</p>
        </div>

      </motion.div>
    </motion.div>
  );
};

const SidebarButton = ({ icon: Icon, label, value, activePage, setPage, isLogout, onClick }) => (
  <button
    onClick={isLogout ? onClick : () => setPage(value)}
    className={`relative flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-300 w-full text-left font-medium 
      ${isLogout ? "text-red-400 hover:bg-red-500/10 mt-auto" : 
      activePage === value ? "text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}
  >
    <Icon size={20} />
    <span className="text-base">{label}</span>
    
    {!isLogout && activePage === value && (
      <motion.div
        layoutId="active-pill"
        className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-cyan-500/20 border border-indigo-500/30 rounded-xl -z-10"
        initial={false}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      />
    )}
  </button>
);

const ResultCard = ({ result }) => {
  const isHighConfidence = result.confidence > 80;
  const barColor = isHighConfidence ? "bg-green-500" : "bg-red-500";
  const textColor = isHighConfidence ? "text-green-400" : "text-red-400";
  const isReal = result.prediction === "REAL";
  const badgeColor = isReal ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-red-500/20 text-red-400 border-red-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card h-full flex flex-col"
    >
      <h3 className="card-title flex items-center gap-2">
        <Activity size={20} className="text-indigo-400"/> Analysis Result
      </h3>

      <div className="space-y-6 mt-6">
        <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
          <span className="text-slate-400">Verdict</span>
          <span className={`px-4 py-1.5 rounded-full text-sm font-bold border ${badgeColor} flex items-center gap-2`}>
            {isReal ? <CheckCircle size={14}/> : <XCircle size={14}/>}
            {result.prediction}
          </span>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Confidence Score</span>
            <span className={`font-mono font-bold ${textColor}`}>
              {result.confidence.toFixed(2)}%
            </span>
          </div>
          
          <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 p-[2px]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${result.confidence}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className={`h-full rounded-full shadow-[0_0_12px_rgba(0,0,0,0.5)] ${barColor}`}
            />
          </div>
          
          <p className="text-xs text-slate-500 mt-2 text-right">
            {isHighConfidence 
              ? "AI is highly certain of this result." 
              : "Low confidence. Please verify manually."}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// --- SETTINGS PAGE (NEWLY ADDED) ---
const SettingsPage = ({ user, onDeleteAccount }) => {
  const [sensitivity, setSensitivity] = useState(80);
  const [notifications, setNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      <div className="flex items-center gap-4 mb-2">
        <Settings className="text-indigo-400" size={32} />
        <h2 className="text-3xl font-bold text-white">Settings & Preferences</h2>
      </div>

      {/* Account Section */}
      <div className="card p-6 md:p-8 bg-[#0f172a]/50 backdrop-blur-md border border-white/10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <User size={20} className="text-slate-400" /> Account Information
        </h3>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-2xl text-white shadow-lg">
            {user.email[0].toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">{user.name || "User"}</p>
            <p className="text-slate-400">{user.email}</p>
            <button className="text-xs text-indigo-400 hover:text-indigo-300 mt-1 font-medium">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Detection Settings */}
      <div className="card p-6 md:p-8 bg-[#0f172a]/50 backdrop-blur-md border border-white/10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Sliders size={20} className="text-slate-400" /> Detection Configuration
        </h3>
        <div className="space-y-6">
           <div>
             <div className="flex justify-between mb-2">
                <label className="text-slate-300 font-medium">Confidence Threshold</label>
                <span className="text-indigo-400 font-bold">{sensitivity}%</span>
             </div>
             <input 
               type="range" 
               min="50" max="99" 
               value={sensitivity} 
               onChange={(e) => setSensitivity(e.target.value)}
               className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
             />
             <p className="text-xs text-slate-500 mt-2">Adjusting this changes how strict the "Fake" detection logic applies.</p>
           </div>
           
           <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
             <div className="flex items-center gap-3">
                <Save className="text-slate-400" size={20} />
                <div>
                  <p className="text-white font-medium">Auto-save History</p>
                  <p className="text-xs text-slate-500">Automatically save detection results locally.</p>
                </div>
             </div>
             <div 
               onClick={() => setAutoSave(!autoSave)}
               className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${autoSave ? 'bg-green-500' : 'bg-slate-700'}`}
             >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${autoSave ? 'translate-x-6' : 'translate-x-0'}`} />
             </div>
           </div>
        </div>
      </div>

      {/* App Preferences */}
      <div className="card p-6 md:p-8 bg-[#0f172a]/50 backdrop-blur-md border border-white/10">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Smartphone size={20} className="text-slate-400" /> Application Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
             <div className="flex items-center gap-3">
                <Bell className="text-slate-400" size={20} />
                <span className="text-white font-medium">Notifications</span>
             </div>
             <div 
               onClick={() => setNotifications(!notifications)}
               className={`w-12 h-6 rounded-full cursor-pointer p-1 transition-colors ${notifications ? 'bg-indigo-500' : 'bg-slate-700'}`}
             >
                <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${notifications ? 'translate-x-6' : 'translate-x-0'}`} />
             </div>
           </div>

           <div className="flex items-center justify-between p-4 bg-black/20 rounded-xl border border-white/5">
             <div className="flex items-center gap-3">
                <Moon className="text-slate-400" size={20} />
                <span className="text-white font-medium">Dark Mode</span>
             </div>
             <span className="text-xs text-slate-500 bg-white/10 px-2 py-1 rounded">Always On</span>
           </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card p-6 md:p-8 border border-red-500/20 bg-red-500/5 backdrop-blur-md">
         <h3 className="text-xl font-bold mb-4 text-red-400 flex items-center gap-2">Danger Zone</h3>
         <div className="flex justify-between items-center">
            <div>
              <p className="text-white font-medium">Delete Account</p>
              <p className="text-xs text-slate-500">Permanently remove all data and history.</p>
            </div>
            <button 
              onClick={onDeleteAccount}
              className="px-4 py-2 border border-red-500/50 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors text-sm font-bold"
            >
              Delete Account
            </button>
         </div>
      </div>
    </div>
  );
};

const Dashboard = ({ file, setFile, preview, setPreview, handleUpload, loading, result }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
    <div className="card flex flex-col">
      <h3 className="card-title flex items-center gap-2 mb-4">
        <UploadCloud size={20} className="text-indigo-400"/> Upload Image
      </h3>

      <div className="h-64 flex flex-col justify-center items-center bg-black/20 border-2 border-dashed border-slate-700 rounded-xl p-2 relative hover:border-indigo-500/50 transition-colors">
        {preview ? (
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-full object-contain rounded-lg" 
          />
        ) : (
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-500">
              <UploadCloud size={24} />
            </div>
            <p className="text-slate-400 font-medium text-sm">Drag & drop or click to upload</p>
            <p className="text-slate-600 text-xs mt-1">Supports JPG, PNG</p>
          </div>
        )}
        
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => {
            const selected = e.target.files[0];
            if (selected) {
              setFile(selected);
              setPreview(URL.createObjectURL(selected));
            }
          }}
        />
      </div>

      <button
        onClick={handleUpload}
        disabled={loading || !file}
        className={`primary-btn w-full mt-6 py-3 text-base flex justify-center items-center gap-3
          ${!file ? 'opacity-50 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
      >
        {loading ? <div className="loader" /> : "Run Detection"}
      </button>
    </div>

    {result ? (
      <ResultCard result={result} />
    ) : (
      <div className="card h-full min-h-[300px] flex flex-col justify-center items-center text-center p-12 opacity-50 border-dashed">
        <Activity size={48} className="text-slate-700 mb-4"/>
        <p className="text-slate-500 font-medium">Run a detection to see analysis results here.</p>
      </div>
    )}
  </div>
);

const HistoryList = ({ history, onDeleteItem, onClearHistory }) => {
  const [filter, setFilter] = useState("all"); 
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter(item => {
    const matchesFilter = filter === "all" || item.prediction === filter;
    const matchesSearch = item.prediction.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          new Date(item.id).toLocaleDateString().includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-10">
      
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <History className="text-indigo-400"/> Recent Analysis
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {history.length} total items • {filteredHistory.length} shown
          </p>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {history.length > 0 && (
            <button 
              onClick={onClearHistory}
              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Clear All History"
            >
              <Trash2 size={20} />
            </button>
          )}

          <div className="relative group">
            <Search className="absolute left-3 top-2.5 text-slate-500 group-focus-within:text-indigo-400" size={16}/>
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#0f172a] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 w-full md:w-40"
            />
          </div>

          <div className="relative">
            <div className="absolute left-3 top-2.5 pointer-events-none">
              <Filter className="text-slate-500" size={16}/>
            </div>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-[#0f172a] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:border-indigo-500 appearance-none cursor-pointer"
            >
              <option value="all">All</option>
              <option value="REAL">Real</option>
              <option value="FAKE">Fake</option>
            </select>
          </div>
        </div>
      </div>

      {history.length === 0 ? (
        <div className="text-center py-20 text-slate-500 bg-black/20 rounded-2xl border border-white/5 border-dashed">
          <History size={48} className="mx-auto mb-4 opacity-20"/>
          <p>No history available yet.</p>
          <p className="text-xs text-slate-600 mt-2">Run a detection to see results here.</p>
        </div>
      ) : filteredHistory.length === 0 ? (
        <div className="text-center py-10 text-slate-500">
           <p>No matches found for your search.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredHistory.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="history-card group hover:bg-slate-800/50 transition-colors flex items-center justify-between"
            >
              <div className="flex items-center gap-4 flex-1">
                <img src={item.image} alt="Thumbnail" className="border border-white/10 w-12 h-12 rounded-lg object-cover" />
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${item.prediction === 'REAL' ? 'text-green-400 bg-green-500/10' : 'text-red-400 bg-red-500/10'}`}>
                      {item.prediction}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {new Date(item.id).toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full max-w-[150px] bg-slate-900 h-1.5 mt-2 rounded-full overflow-hidden opacity-50 group-hover:opacity-100 transition-opacity">
                     <div className={`h-full ${item.confidence > 80 ? 'bg-green-500' : 'bg-red-500'}`} style={{width: `${item.confidence}%`}} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 pr-4">
                 <span className="font-mono text-slate-400 font-bold hidden sm:block">{item.confidence.toFixed(1)}%</span>
                 
                 <button 
                    onClick={() => alert(`Downloading Report for ID: ${item.id}...`)}
                    className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-colors"
                    title="Download Report"
                 >
                   <Download size={18} />
                 </button>

                 <button 
                    onClick={() => onDeleteItem(item.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    title="Delete"
                 >
                   <X size={18} />
                 </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const AboutPage = () => {
  const [showVisuals, setShowVisuals] = useState(false);

  return (
    <div className="max-w-5xl mx-auto pb-10">
      
      <AnimatePresence>
        {showVisuals && <VisualizationsModal onClose={() => setShowVisuals(false)} />}
      </AnimatePresence>

      <div className="card p-8 md:p-10 border border-white/10 bg-[#0f172a]/50 backdrop-blur-md">
        
        <div className="flex items-center gap-4 mb-2">
          <Brain className="text-pink-500" size={32} />
          <h2 className="text-3xl font-bold text-white">Deepfake Detector</h2>
        </div>
        
        <div className="text-xs font-mono text-slate-500 mb-8 pl-1">
          Version 3.0.0 • Stable • State-of-the-Art
        </div>

        <p className="text-slate-300 leading-relaxed mb-10 text-lg max-w-3xl">
          This system detects AI-generated deepfake images using a dual-stream deep learning architecture optimized for real-time inference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-[#020617] border border-white/5 hover:border-indigo-500/30 transition-colors">
            <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Model</h4>
            <p className="text-white font-medium text-lg">Deepfake Detector V3</p>
          </div>
          <div className="p-6 rounded-xl bg-[#020617] border border-white/5 hover:border-indigo-500/30 transition-colors">
            <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Architecture</h4>
            <p className="text-white font-medium text-lg">MobileNetV2 + SRM + Gated Fusion</p>
          </div>
          <div className="p-6 rounded-xl bg-[#020617] border border-white/5 hover:border-indigo-500/30 transition-colors">
            <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Datasets</h4>
            <p className="text-slate-300">CIFAKE, FaceForensics++, Celeb-DF</p>
          </div>
          <div className="p-6 rounded-xl bg-[#020617] border border-white/5 hover:border-indigo-500/30 transition-colors">
            <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider mb-2">Inference</h4>
            <p className="text-slate-300">TensorFlow Lite</p>
          </div>
        </div>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <BarChart3 className="text-indigo-400" size={24} />
            <h3 className="text-xl font-bold text-white">Performance Metrics</h3>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-4 rounded-lg bg-[#020617] border border-white/5">
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">AUC</p>
              <p className="text-green-400 font-bold text-xl">99.13%</p>
            </div>
            <div className="p-4 rounded-lg bg-[#020617] border border-white/5">
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Accuracy</p>
              <p className="text-white font-bold text-xl">94.78%</p>
            </div>
            <div className="p-4 rounded-lg bg-[#020617] border border-white/5">
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Precision</p>
              <p className="text-white font-bold text-xl">93.46%</p>
            </div>
            <div className="p-4 rounded-lg bg-[#020617] border border-white/5">
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">Recall</p>
              <p className="text-white font-bold text-xl">96.21%</p>
            </div>
            <div className="p-4 rounded-lg bg-[#020617] border border-white/5">
              <p className="text-slate-500 text-xs font-bold uppercase mb-1">F1 Score</p>
              <p className="text-white font-bold text-xl">94.81%</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/5">
          <a 
            href="https://github.com/shovan-mondal/Deepfake-detection/releases/tag/v3.0.0" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 text-sm transition-colors"
          >
            <Github size={16} />
            <span className="hover:underline">View Full Release Notes on GitHub</span>
          </a>

          <button 
            onClick={() => setShowVisuals(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-300 border border-indigo-500/20 text-sm font-medium transition-all"
          >
            <PieChart size={16} />
            Data Visualizations
          </button>
        </div>

      </div>
    </div>
  );
};

// ==================================================================================
//  3. MAIN APP STRUCTURE (FIXED: HISTORY PERSISTENCE)
// ==================================================================================

export default function App() {
  // 1. Initialize USER from LocalStorage immediately
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("deepscan_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState("dashboard");

  // 2. Initialize HISTORY from LocalStorage immediately (The Fix!)
  // This prevents the empty [] from overwriting your data on refresh
  const [history, setHistory] = useState(() => {
    if (user?.email) {
      const savedHistory = localStorage.getItem(`deepscan_history_${user.email}`);
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });

  // --- EFFECT 1: Handle User Switching (Logout/Login) ---
  // If the user changes while the app is open, load their specific history
  useEffect(() => {
    if (user?.email) {
      const savedHistory = localStorage.getItem(`deepscan_history_${user.email}`);
      setHistory(savedHistory ? JSON.parse(savedHistory) : []);
    } else {
      setHistory([]); // Clear history from view on logout
    }
  }, [user]); // Only runs when 'user' changes, NOT on simple refresh

  // --- EFFECT 2: Auto-Save History ---
  // Whenever 'history' or 'user' changes, save it to storage
  useEffect(() => {
    if (user?.email) {
      localStorage.setItem(`deepscan_history_${user.email}`, JSON.stringify(history));
    }
  }, [history, user]);


  // Handle Login Logic
  const handleLogin = (userData) => {
    localStorage.setItem("deepscan_user", JSON.stringify(userData));
    setUser(userData);
  };

  // Handle Logout Logic
  const handleLogout = () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("deepscan_user");
      setUser(null);
      setPage("dashboard");
      setFile(null);
      setPreview(null);
      setResult(null);
    }
  };

  const handleDeleteItem = (id) => {
    if(confirm("Delete this scan result?")) {
      const updatedHistory = history.filter(item => item.id !== id);
      setHistory(updatedHistory);
    }
  };

  const handleClearHistory = () => {
    if(confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      setHistory([]);
    }
  };

  const handleDeleteAccount = () => {
    if(confirm("DANGER: Are you sure you want to delete your account? All history will be lost.")) {
       localStorage.removeItem(`deepscan_history_${user.email}`);
       handleLogout();
    }
  }

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Server Error");
      const data = await response.json();
      setResult(data);

      setHistory((prev) => [
        {
          id: Date.now(),
          prediction: data.prediction,
          confidence: data.confidence,
          image: preview,
        },
        ...prev.slice(0, 50), 
      ]);
    } catch (e) {
      alert("Backend not reachable or Error occurred 😢");
    } finally {
      setLoading(false);
    }
  };

  // RENDER: If no user, show Auth Page
  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  // RENDER: If user exists, show Dashboard
  return (
    <div className="min-h-screen bg-[#020617] text-white flex font-sans selection:bg-indigo-500/30">
      
      {/* Sidebar */}
      <aside className="sidebar fixed h-screen z-10 hidden md:flex w-[280px] flex-col justify-between">
        <div>
          <div className="logo">
            <ShieldCheck className="text-indigo-500" size={32} />
            <span className="tracking-tight">DeepScan<span className="text-indigo-500">.AI</span></span>
          </div>

          <nav className="sidebar-nav mt-8">
            <SidebarButton icon={LayoutDashboard} label="Dashboard" value="dashboard" activePage={page} setPage={setPage} />
            <SidebarButton icon={History} label="History" value="history" activePage={page} setPage={setPage} />
            <SidebarButton icon={Settings} label="Settings" value="settings" activePage={page} setPage={setPage} />
            <SidebarButton icon={Info} label="About" value="about" activePage={page} setPage={setPage} />
          </nav>
        </div>

        <div className="space-y-4">
          <SidebarButton icon={LogOut} label="Sign Out" isLogout onClick={handleLogout} />

          <div className="sidebar-footer">
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900/50 border border-white/5 w-full">
              <div className="relative">
                <Activity size={18} className="text-green-400" />
                <span className="absolute inset-0 bg-green-400 blur-[8px] opacity-40 animate-pulse"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white">System Online</span>
                <span className="text-[10px] text-slate-400">v3.0.0 Stable</span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-[280px] p-6 md:p-10 relative">
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-indigo-900/10 to-transparent -z-10 pointer-events-none" />

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </h1>
            <p className="text-slate-400 text-sm mt-1">Real-time deepfake detection engine</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-slate-300 hidden sm:block">
              {user.email}
            </span>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg">
              {user.email[0].toUpperCase()}
            </div>
          </div>
        </div>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="min-h-[calc(100vh-140px)]"
          >
            {page === "dashboard" && (
              <Dashboard 
                file={file} 
                setFile={setFile} 
                preview={preview} 
                setPreview={setPreview}
                handleUpload={handleUpload}
                loading={loading}
                result={result}
              />
            )}
            
            {page === "history" && (
              <HistoryList 
                history={history} 
                onDeleteItem={handleDeleteItem} 
                onClearHistory={handleClearHistory} 
              />
            )}
            
            {page === "settings" && (
               <SettingsPage 
                  user={user} 
                  onDeleteAccount={handleDeleteAccount}
               />
            )}
            
            {page === "about" && <AboutPage />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}