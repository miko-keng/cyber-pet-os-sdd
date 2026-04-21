import { useState, useEffect, useCallback } from 'react';
import { Terminal, Cpu, Zap, Smile, Utensils, Settings } from 'lucide-react';
import './App.css';

// Asset Imports
import petNormal from './assets/pet_normal.png';
import petSick from './assets/pet_sick.png';
import petEvolved from './assets/pet_evolved.png';

const PET_STATES = {
  NORMAL: 'NORMAL',
  SICK: 'SICK',
  EVOLVED: 'EVOLVED'
};

const TICK_RATE = 5000;

function App() {
  const [vitals, setVitals] = useState({
    hunger: 100,
    happiness: 80,
    energy: 100
  });

  const [status, setStatus] = useState(PET_STATES.NORMAL);
  const [pulseKey, setPulseKey] = useState(0);
  const [isDebug, setIsDebug] = useState(false);
  const [events, setEvents] = useState([]);

  // Toggle debug with Shift+D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.shiftKey && e.key === 'D') {
        setIsDebug(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const addEvent = useCallback((text, type = 'NORMAL') => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    const prefix = '[SYSTEM_INFO]';
    setEvents(prev => [{ text: `${prefix} ${text}`, type, timestamp }, ...prev].slice(0, 5));
  }, []);

  // Vitals decay loop (Requirement V-01: Every 5s, -3 hunger, -2 happiness, -1 energy)
  useEffect(() => {
    const tick = setInterval(() => {
      setVitals(prev => {
        const isEvolved = status === PET_STATES.EVOLVED;
        const decayModifier = isEvolved ? 0.5 : 1;

        return {
          hunger: Math.min(100, Math.max(0, prev.hunger - (3 * decayModifier))),
          happiness: Math.min(100, Math.max(0, prev.happiness - (2 * decayModifier))),
          energy: Math.min(100, Math.max(0, prev.energy - (1 * decayModifier)))
        };
      });
    }, TICK_RATE);

    return () => clearInterval(tick);
  }, [status]);

  // Handle state transitions
  useEffect(() => {
    let nextStatus = PET_STATES.NORMAL;
    let reason = '';

    if (vitals.hunger < 10 || vitals.energy < 10) {
      nextStatus = PET_STATES.SICK;
      reason = vitals.energy < 10 ? '(Low Energy)' : '(Low Hunger)';
    } else if (vitals.hunger > 90 && vitals.energy > 90 && vitals.happiness > 90) {
      nextStatus = PET_STATES.EVOLVED;
      reason = '(System Peak)';
    }

    if (nextStatus !== status) {
      const logMsg = `STATUS_CHANGE: ${nextStatus} ${reason}`.trim();
      console.log(`[SYSTEM_INFO] ${logMsg}`);
      setStatus(nextStatus);
      setPulseKey(prev => prev + 1);
      addEvent(logMsg, nextStatus);
    }
  }, [vitals, status, addEvent]);

  const currentPetView = {
    [PET_STATES.NORMAL]: { 
      src: petNormal, 
      label: 'SYSTEM_OPTIMAL',
      filter: 'drop-shadow(0 0 10px #00ff41)'
    },
    [PET_STATES.SICK]: { 
      src: petSick, 
      label: 'CRITICAL_FAILURE',
      filter: 'drop-shadow(0 0 10px #ffb000)'
    },
    [PET_STATES.EVOLVED]: { 
      src: petEvolved, 
      label: 'ULTRA_STABLE',
      filter: 'drop-shadow(0 0 10px #ffcc00)'
    }
  };

  const handleAction = useCallback((type) => {
    let actionTaken = false;
    setVitals(prev => {
      let next = { ...prev };
      
      switch (type) {
        case 'FEED':
          if (prev.hunger >= 100) return prev;
          next.hunger = Math.min(100, prev.hunger + 20);
          next.energy = Math.max(0, prev.energy - 5);
          actionTaken = true;
          break;
        case 'PLAY':
          if (prev.energy < 20 || status === PET_STATES.SICK) return prev;
          next.happiness = Math.min(100, prev.happiness + 15);
          next.energy = Math.max(0, prev.energy - 15);
          next.hunger = Math.max(0, prev.hunger - 5);
          actionTaken = true;
          break;
        case 'REST':
          next.energy = Math.min(100, prev.energy + 30);
          next.hunger = Math.max(0, prev.hunger - 10);
          actionTaken = true;
          break;
        default:
          break;
      }
      
      if (actionTaken) {
        setPulseKey(prevKey => prevKey + 1);
        addEvent(`CMD_EXECUTED: ${type}`);
      }
      return next;
    });
  }, [status, addEvent]);

  const runAssertions = useCallback((v, s) => {
    const results = [
      { test: 'Vitals Clamping (0-100)', pass: v.hunger >= 0 && v.hunger <= 100 && v.energy >= 0 && v.energy <= 100 },
      { test: 'SICK Transition Logic', pass: (v.hunger < 10 || v.energy < 10) ? s === PET_STATES.SICK : true },
      { test: 'EVOLVED Logic Check', pass: (v.hunger > 90 && v.energy > 90 && v.happiness > 90) ? s === PET_STATES.EVOLVED : true }
    ];
    
    console.group('DEV_TEST_SUITE: Automated Assertions');
    results.forEach(r => console.log(`${r.pass ? '✅' : '❌'} ${r.test}`));
    console.groupEnd();
    addEvent(`DEBUG: Tests executed. Results logged to console.`);
  }, [addEvent]);

  const setVitalsTo = (val) => {
    const next = { hunger: val, happiness: val, energy: val };
    setVitals(next);
    addEvent(`DEBUG: Vitals force-set to ${val}.`);
    setTimeout(() => runAssertions(next, status), 200);
  };

  return (
    <div className="min-h-screen bg-black text-[#00ff41] p-4 flex flex-col items-center justify-center font-mono relative">
      <div className="scanline" />
      
      <div className="max-w-md w-full border border-[#00ff41] p-6 space-y-6 relative phosphor-glow bg-black/90">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#00ff41]/30 pb-4">
          <div>
            <h1 className="text-xl font-bold tracking-widest phosphor-glow flex items-center gap-2">
              <Cpu className="w-5 h-5" /> CYBER_PET_OS
            </h1>
            <p className="text-[10px] opacity-50">REL_4.0.1 | ADDR: 0x00FF41</p>
          </div>
          <button 
            onClick={() => setIsDebug(!isDebug)}
            className="p-1 hover:bg-[#00ff41] hover:text-black transition-colors"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* ASCII Viewport */}
        <div className="relative p-4 border border-[#00ff41]/20">
          <div className="text-[14px] leading-none mb-2 opacity-40">
            ┌────────────────────────────────────┐
          </div>
          <div className="flex justify-center py-6">
            <div key={pulseKey} className={`animate-flicker ${pulseKey > 0 ? 'animate-pulse-once' : ''}`}>
              <img 
                src={currentPetView[status].src} 
                alt={status} 
                className="w-48 h-48 object-contain mx-auto" 
                style={{ filter: currentPetView[status].filter }}
              />
            </div>
          </div>
          <div className="text-[14px] leading-none mt-2 opacity-40">
            └────────────────────────────────────┘
          </div>
          <div className="absolute top-2 right-4 text-[10px] opacity-60">
            STATUS: {currentPetView[status].label}
          </div>
        </div>

        {/* Stat Meters */}
        <div className="space-y-4">
          <VitalBar label="HUNGER" value={vitals.hunger} icon={<Utensils className="w-3 h-3" />} />
          <VitalBar label="HAPPINESS" value={vitals.happiness} icon={<Smile className="w-3 h-3" />} />
          <VitalBar label="ENERGY" value={vitals.energy} icon={<Zap className="w-3 h-3" />} />
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-3 pt-4">
          <ActionButton 
            label="EXECUTE_FEED" 
            onClick={() => handleAction('FEED')} 
            disabled={vitals.hunger >= 100} 
          />
          <ActionButton 
            label="INITIATE_PLAY" 
            onClick={() => handleAction('PLAY')} 
            disabled={vitals.energy < 20 || status === PET_STATES.SICK} 
          />
          <ActionButton 
            label="SYSTEM_REST" 
            onClick={() => handleAction('REST')} 
          />
        </div>

        {/* Terminal Log */}
        <div className="bg-black border border-[#00ff41]/10 p-3">
          <div className="flex items-center gap-2 text-[#00ff41]/40 text-[10px] mb-2 font-bold uppercase tracking-tighter">
            <Terminal className="w-3 h-3" />
            <span>TERMINAL_LOG</span>
          </div>
          <div className="space-y-1 h-[90px] overflow-y-auto terminal-log">
            {events.length === 0 ? (
              <div className="text-[10px] text-[#00ff41]/20">LISTENING FOR SYSTEM EVENTS...</div>
            ) : (
              events.map((event, i) => (
                <div key={i} className={`text-[10px] flex gap-2 animate-in fade-in ${
                  event.type === 'SICK' ? 'text-red-500 red-glow' : 
                  event.type === 'EVOLVED' ? 'text-amber-warning amber-glow' : 
                  'text-[#00ff41]/80'
                }`}>
                  <span className="opacity-30">[{event.timestamp}]</span>
                  <span>{event.text}</span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Debug Controls */}
        {isDebug && (
          <div className="flex gap-2 justify-center border-t border-[#00ff41]/10 pt-4 flex-wrap">
            <button onClick={() => setVitalsTo(0)} className="text-[10px] px-2 py-1 border border-red-500 text-red-500 hover:bg-red-500 hover:text-black">FORCE_0</button>
            <button onClick={() => setVitalsTo(10)} className="text-[10px] px-2 py-1 border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black">FORCE_10</button>
            <button onClick={() => setVitalsTo(100)} className="text-[10px] px-2 py-1 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black">FORCE_100</button>
            <button onClick={() => { setStatus(PET_STATES.NORMAL); addEvent('[STATUS] Debug reset to NORMAL'); }} className="text-[10px] px-2 py-1 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black">FORCE_RST</button>
          </div>
        )}
      </div>
    </div>
  );
}

function VitalBar({ label, value, icon }) {
  const getStyle = () => {
    if (value <= 20) return { bar: 'bg-red-500', text: 'text-red-500', glow: 'red-glow' };
    if (value <= 70) return { bar: 'bg-[#ffb000]', text: 'text-[#ffb000]', glow: 'amber-glow' };
    return { bar: 'bg-[#00ff41]', text: 'text-[#00ff41]', glow: 'phosphor-glow' };
  };

  const style = getStyle();

  return (
    <div className="space-y-1">
      <div className={`flex justify-between items-center text-[10px] font-bold ${style.text} ${style.glow}`}>
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="h-2 w-full border border-[#00ff41]/20 bg-black overflow-hidden relative">
        <div 
          className={`h-full vitals-bar ${style.bar}`} 
          style={{ width: `${value}%` }} 
        />
      </div>
    </div>
  );
}

function ActionButton({ label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`text-left p-3 border border-[#00ff41] transition-all relative
        ${disabled 
          ? 'opacity-20 cursor-not-allowed' 
          : 'hover:bg-[#00ff41] hover:text-black active:translate-x-1'
        }`}
    >
      <span className="text-xs font-bold tracking-tight phosphor-glow group-hover:text-black">
        {`> ${label}`}
      </span>
    </button>
  );
}

export default App;
