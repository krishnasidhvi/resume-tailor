"use client";

import { useState } from "react";

export function DiffView({ changes }: { changes: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!changes || changes.length === 0) return null;

  return (
    <div className="surface-panel mt-6 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex justify-between items-center transition-colors text-left"
      >
        <span className="font-semibold flex items-center gap-2" style={{ color: 'var(--accent-teal)' }}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          What Changed
        </span>
        <span style={{ color: 'var(--label-secondary)' }}>{isOpen ? "▲" : "▼"}</span>
      </button>
      
      {isOpen && (
        <div className="p-4 border-t text-sm" style={{ borderColor: 'var(--separator)' }}>
          <ul className="space-y-2">
            {changes.map((change, i) => (
              <li key={i} className="flex gap-2" style={{ color: 'var(--label-primary)' }}>
                <span className="mt-0.5" style={{ color: 'var(--accent-teal)' }}>•</span>
                <span>{change}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
