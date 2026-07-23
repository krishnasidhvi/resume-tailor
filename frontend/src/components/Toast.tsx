"use client";

import { createRoot } from "react-dom/client";
import { useEffect, useState } from "react";

const ToastMessage = ({ title, message, onClose }: { title: string, message: string, onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="liquid-glass p-4 flex flex-col gap-1 shadow-2xl relative w-80 mb-2" style={{ borderLeft: '4px solid var(--accent-red)' }}>
      <button onClick={onClose} className="absolute top-2 right-2 hover:text-white" style={{ color: 'var(--label-secondary)' }}>&times;</button>
      <h4 className="font-bold" style={{ color: 'var(--accent-red)' }}>{title}</h4>
      <p className="caption-text">{message}</p>
    </div>
  );
};

export const showToast = (title: string, message: string) => {
  const rootEl = document.getElementById("toast-root");
  if (!rootEl) return;
  
  const container = document.createElement("div");
  rootEl.appendChild(container);
  
  const root = createRoot(container);
  
  const close = () => {
    root.unmount();
    container.remove();
  };
  
  root.render(<ToastMessage title={title} message={message} onClose={close} />);
};
