import React from "react";

export function SimpleMarkdown({ content }: { content: string }) {
  const lines = content.split('\n');
  
  return (
    <div className="space-y-2 text-white/90">
      {lines.map((line, idx) => {
        if (line.startsWith('# ')) {
          return <h1 key={idx} className="text-3xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
        } else if (line.startsWith('## ')) {
          return <h2 key={idx} className="text-2xl font-bold mt-5 mb-3 border-b border-white/10 pb-2">{line.substring(3)}</h2>;
        } else if (line.startsWith('### ')) {
          return <h3 key={idx} className="text-xl font-bold mt-4 mb-2 text-cyan-300">{line.substring(4)}</h3>;
        } else if (line.startsWith('- ') || line.startsWith('* ')) {
          return <li key={idx} className="ml-4 list-disc marker:text-violet-400">{line.substring(2)}</li>;
        } else if (line.trim() === '') {
          return <div key={idx} className="h-2"></div>;
        } else {
          return <p key={idx} className="leading-relaxed">{line}</p>;
        }
      })}
    </div>
  );
}
