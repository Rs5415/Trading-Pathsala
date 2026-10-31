import React, { useState } from 'react';
import { X, Shield, Lock, AlertTriangle, ArrowRight } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === 'zxcvbnm') {
      setError('');
      setCode('');
      onSuccess();
    } else {
      setError('Incorrect access code. Expected: zxcvbnm');
    }
  };

  const handleQuickDemo = () => {
    setCode('zxcvbnm');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090909]/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#121212] border border-[#2E2E2E] rounded-lg w-full max-w-md shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="px-6 py-5 border-b border-[#222222] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#C5A34A]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#C5A34A] uppercase tracking-wider">
                Management Console
              </span>
              <h3 className="text-base font-bold text-white uppercase tracking-tight">
                Admin Authentication
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#737373] hover:text-white hover:bg-[#1C1C1C]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          <div className="p-3.5 rounded bg-[#171717] border border-[#262626] text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-semibold text-[#E2C878]">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#C5A34A]" />
              <span>Static Client-Side Security Notice</span>
            </div>
            <p className="leading-relaxed text-[11px] text-[#A0A0A0]">
              This passkey is verified client-side for static GitHub Pages compatibility. It can be inspected in the browser source. Never store confidential bank accounts or private client credentials here.
            </p>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono uppercase text-[#A0A0A0]">Access Passkey</label>
              <button
                type="button"
                onClick={handleQuickDemo}
                className="text-[11px] text-[#C5A34A] hover:underline cursor-pointer"
              >
                Auto-fill (zxcvbnm)
              </button>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#555555] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter access code"
                autoFocus
                className="w-full bg-[#090909] border border-[#262626] focus:border-[#C5A34A] rounded pl-10 pr-4 py-2.5 text-sm text-white placeholder-[#555555] focus:outline-none"
              />
            </div>
            {error && <span className="text-xs text-rose-400 mt-1.5 block font-mono">{error}</span>}
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#737373] hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#090909] bg-[#C5A34A] hover:bg-[#E2C878] rounded transition-all shadow-md shadow-[#C5A34A]/20 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Unlock Admin Panel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
