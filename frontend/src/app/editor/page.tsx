"use client";

import { useState, useEffect, useRef } from "react";
import { getMasterResume, updateMasterResume, importResume } from "@/lib/api";
import { showToast } from "@/components/Toast";
import { GlassCard } from "@/components/GlassCard";

export default function EditorPage() {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    getMasterResume().then(c => {
      setContent(c);
      setLoading(false);
    }).catch(err => {
      showToast("Error", "Failed to load master resume");
      setLoading(false);
    });
  }, []);

  const handleChange = (val: string) => {
    setContent(val);
    setSaving(true);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateMasterResume(val).then(() => {
        setSaving(false);
      }).catch(err => {
        showToast("Error", "Failed to auto-save");
        setSaving(false);
      });
    }, 800);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setLoading(true);
      const md = await importResume(file);
      setContent(md);
      handleChange(md);
      showToast("Success", "Resume imported successfully. Please review the markdown below.");
    } catch (err: any) {
      showToast(err.error || "Import Failed", err.hint || err.message || "An unknown error occurred.");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  };

  if (loading && !content) {
    return <div className="text-center mt-20">Loading master resume...</div>;
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="display-title mb-2">Master Resume</h1>
          <p className="body-text" style={{ color: 'var(--label-secondary)' }}>This is the ONLY source of truth. Keep it comprehensive.</p>
        </div>
        <div className="flex items-center gap-4">
          {saving ? <span className="caption-text">Saving...</span> : <span className="caption-text" style={{ color: 'var(--accent-green)' }}>Saved</span>}
          <label className="btn-primary cursor-pointer text-sm">
            Import PDF/DOCX
            <input type="file" accept=".pdf,.docx" className="hidden" onChange={handleFileUpload} />
          </label>
        </div>
      </div>
      
      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative">
        <textarea
          className="w-full h-full bg-transparent p-6 outline-none resize-none font-mono text-sm"
          value={content}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Paste or write your full resume in Markdown here..."
        />
        {loading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">
            Processing...
          </div>
        )}
      </GlassCard>
    </div>
  );
}
