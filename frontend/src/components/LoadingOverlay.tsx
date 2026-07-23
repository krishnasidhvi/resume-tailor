"use client";
import { useEffect, useState } from "react";
import { API_URL } from "../lib/api";

export function LoadingOverlay({ isVisible }: { isVisible: boolean }) {
  const [statusMsg, setStatusMsg] = useState("Starting AI engine...");
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setElapsed(0);
      setStatusMsg("Starting AI engine...");
      return;
    }

    const interval = setInterval(() => {
      setElapsed(e => e + 1);
    }, 1000);
    
    const statusInterval = setInterval(async () => {
      try {
        const res = await fetch(`${API_URL}/tailor/status`);
        if (res.ok) {
          const data = await res.json();
          if (data.status) {
            // Keep the message reasonably short for the UI
            let msg = data.status;
            if (msg.length > 80) msg = msg.substring(0, 80) + "...";
            setStatusMsg(msg);
          }
        }
      } catch (e) {
        // Ignore fetch errors during polling
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(statusInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="liquid-glass p-10 flex flex-col items-center max-w-xl w-full">
        <div className="w-16 h-16 border-4 rounded-full animate-spin mb-6" style={{ borderColor: 'var(--separator)', borderTopColor: 'var(--accent-blue)' }}></div>
        <h3 className="title-2 mb-2 text-center overflow-hidden text-ellipsis whitespace-nowrap w-full" style={{ color: 'var(--label-primary)' }}>
          {statusMsg}
        </h3>
        <p className="caption-text mt-4">Elapsed time: {elapsed}s</p>
      </div>
    </div>
  );
}
