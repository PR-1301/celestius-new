import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AlertOctagon, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

const ToastContext = createContext(null);

export const queuePersistentToast = (message, type = 'error', duration = 12000) => {
  try {
    const existing = JSON.parse(sessionStorage.getItem('celestius_toast_queue') || '[]');
    existing.push({
      id: 'persisted_' + Date.now() + Math.random().toString(36).substring(2, 6),
      message,
      type,
      duration,
      created: Date.now(),
    });
    sessionStorage.setItem('celestius_toast_queue', JSON.stringify(existing));
  } catch (err) {
    console.error('Failed to queue persistent toast:', err);
  }
};

// Individual Toast Item with pause-on-hover auto-dismiss logic
const ToastItem = ({ toast, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = React.useRef(null);
  const startTimeRef = React.useRef(Date.now());
  const remainingRef = React.useRef(toast.duration || 10000);

  const startTimer = useCallback(() => {
    if (toast.duration <= 0) return;
    startTimeRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onRemove(toast.id);
    }, remainingRef.current);
  }, [toast.id, toast.duration, onRemove]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      // While user cursor is on toast, pause countdown and preserve remaining time
      const elapsed = Date.now() - startTimeRef.current;
      remainingRef.current = Math.max(remainingRef.current - elapsed, 4000);
      clearTimer();
    }

    return () => clearTimer();
  }, [isHovered, startTimer, clearTimer]);

  let theme = {
    border: 'border-red-500/50',
    bg: 'bg-black/95',
    glow: 'shadow-[0_0_25px_rgba(239,68,68,0.3)]',
    icon: <AlertOctagon className="w-5 h-5 text-red-400 shrink-0 mt-0.5 animate-pulse" />,
    badge: 'bg-red-500/10 text-red-400 border-red-500/30',
    tag: 'SECURITY / DENIED',
  };

  if (toast.type === 'success') {
    theme = {
      border: 'border-emerald-500/50',
      bg: 'bg-black/95',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.3)]',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />,
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      tag: 'SYSTEM / VERIFIED',
    };
  } else if (toast.type === 'info' || toast.type === 'warning') {
    theme = {
      border: 'border-[#FFCC00]/50',
      bg: 'bg-black/95',
      glow: 'shadow-[0_0_25px_rgba(255,204,0,0.3)]',
      icon: toast.type === 'warning' ? (
        <AlertTriangle className="w-5 h-5 text-[#FFCC00] shrink-0 mt-0.5" />
      ) : (
        <Info className="w-5 h-5 text-[#FFCC00] shrink-0 mt-0.5" />
      ),
      badge: 'bg-[#FFCC00]/10 text-[#FFCC00] border-[#FFCC00]/30',
      tag: 'SYSTEM / NOTICE',
    };
  }

  return (
    <div
      role="alert"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border ${theme.border} ${theme.bg} ${theme.glow} backdrop-blur-xl transition-all duration-300 transform translate-y-0 opacity-100 shadow-2xl cursor-default select-text`}
    >
      {theme.icon}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded border ${theme.badge}`}>
            {theme.tag}
          </span>
          {isHovered && (
            <span className="text-[9px] font-mono text-zinc-500 tracking-wider">
              [PAUSED ON HOVER]
            </span>
          )}
        </div>
        <p className="text-sm font-sans text-white/90 leading-relaxed font-normal break-words">
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onRemove(toast.id)}
        className="p-1 text-white/40 hover:text-white rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
        aria-label="Dismiss notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = 'error', duration = 10000) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 7);
    setToasts((prev) => [...prev, { id, message, type, duration }]);
    return id;
  }, []);

  // Load any persistent queued toasts on mount (e.g. across OAuth redirects)
  useEffect(() => {
    try {
      const queued = JSON.parse(sessionStorage.getItem('celestius_toast_queue') || '[]');
      if (queued.length > 0) {
        sessionStorage.removeItem('celestius_toast_queue');
        queued.forEach((item) => {
          showToast(item.message, item.type, item.duration || 12000);
        });
      }
    } catch {
      // ignore JSON parse error
    }
  }, [showToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Toast Render Overlay */}
      <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-3 pointer-events-none max-w-md w-full px-4 sm:px-0">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
