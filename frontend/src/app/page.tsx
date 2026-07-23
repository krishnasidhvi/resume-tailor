"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GlassCard } from "@/components/GlassCard";
import { tailorResume } from "@/lib/api";
import { showToast } from "@/components/Toast";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function Home() {
  const [jd, setJd] = useState("");
  const [customInstructions, setCustomInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTailor = async () => {
    if (!jd.trim()) {
      showToast("Error", "Please paste a job description.");
      return;
    }
    
    setLoading(true);
    try {
      const result = await tailorResume(jd, customInstructions);
      sessionStorage.setItem("tailor_result", JSON.stringify(result));
      router.push("/result");
    } catch (err: any) {
      setLoading(false);
      showToast(err.error || "Error", err.hint || "Something went wrong.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 flex flex-col gap-8">
      <LoadingOverlay isVisible={loading} />
      
      <div className="text-center mb-8">
        <h1 className="display-title mb-4">
          Land your dream job.
        </h1>
        <p className="body-text" style={{ color: 'var(--label-secondary)' }}>
          Paste the job description below. We'll cross-reference it with your Master Resume and generate a perfectly tailored version without making anything up.
        </p>
      </div>

      <GlassCard className="flex flex-col gap-4">
        <textarea
          className="w-full h-64 p-4 text-sm"
          placeholder="Paste Job Description here..."
          value={jd}
          onChange={e => setJd(e.target.value)}
        />
        <textarea
          className="w-full h-24 p-4 text-sm"
          placeholder="Optional: Custom instructions on how to edit the resume (e.g., 'Focus heavily on React, ignore backend skills, keep it under 1 page')"
          value={customInstructions}
          onChange={e => setCustomInstructions(e.target.value)}
        />
        <div className="flex justify-end">
          <button onClick={handleTailor} className="btn-primary" disabled={loading}>
            Tailor My Resume
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
