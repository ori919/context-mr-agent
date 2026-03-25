"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

const SECTION_OPTIONS = [
  { id: "what", label: "What changed" },
  { id: "why", label: "Why this matters" },
  { id: "affected", label: "Affected areas" },
  { id: "hidden", label: "Hidden assumptions" },
  { id: "risk", label: "Risk level" },
  { id: "checklist", label: "Reviewer checklist" },
  { id: "docs", label: "Docs follow-up" },
];

const RISK_LEVELS = ["Low", "Medium", "High"];

export function ConfigPanel() {
  const [sections, setSections] = useState<Record<string, boolean>>(
    Object.fromEntries(SECTION_OPTIONS.map((s) => [s.id, true]))
  );
  const [riskSensitivity, setRiskSensitivity] = useState(1);
  const [postingMode, setPostingMode] = useState<"auto" | "manual">("auto");

  const activeCount = Object.values(sections).filter(Boolean).length;
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
            CUSTOMIZATION
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            Configure per project
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-muted-light">
            Tune agent behavior through the flow prompt and AGENTS.md.
            Every setting is optional.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {/* Sections toggle */}
          <div className="rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a] p-7 card-hover">
            <p className="text-[14px] font-semibold">Sections</p>
            <p className="mt-1.5 text-[12px] text-muted">Toggle brief sections on or off</p>
            <div className="mt-6 space-y-3">
              {SECTION_OPTIONS.map((option) => {
                const active = sections[option.id];
                return (
                  <button
                    key={option.id}
                    onClick={() => setSections((p) => ({ ...p, [option.id]: !p[option.id] }))}
                    className="flex w-full items-center gap-3.5 text-[13px] text-left group"
                  >
                    <span
                      className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border transition-all duration-200 ${
                        active ? "border-accent bg-accent/20 text-accent" : "border-[rgb(50,50,50)] bg-white/[0.02]"
                      }`}
                    >
                      {active && (
                        <svg width="10" height="10" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8l4 4 6-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </span>
                    <span className={`transition-colors ${active ? "text-foreground" : "text-muted group-hover:text-muted-light"}`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a] p-7 card-hover">
            <p className="text-[14px] font-semibold">Risk sensitivity</p>
            <p className="mt-1.5 text-[12px] text-muted">Adjust flagging threshold</p>
            <div className="mt-7">
              <input
                type="range"
                min={0}
                max={2}
                value={riskSensitivity}
                onChange={(e) => setRiskSensitivity(Number(e.target.value))}
                className="w-full accent-accent h-1"
              />
              <div className="mt-3 flex justify-between text-[12px] text-muted">
                {RISK_LEVELS.map((level, i) => (
                  <span key={level} className={`transition-colors ${i === riskSensitivity ? "text-accent font-medium" : ""}`}>
                    {level}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-9">
              <p className="text-[14px] font-semibold">Posting mode</p>
              <p className="mt-1.5 text-[12px] text-muted">Auto or manual trigger</p>
              <div className="mt-5 flex gap-2.5">
                {(["auto", "manual"] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setPostingMode(mode)}
                    className={`rounded-xl border px-5 py-2.5 text-[13px] font-medium capitalize transition-all duration-200 ${
                      postingMode === mode
                        ? "border-accent/30 bg-accent/10 text-accent"
                        : "border-[rgb(36,36,36)] text-muted hover:text-foreground hover:border-[rgb(60,60,60)]"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live preview */}
          <div className="rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a] p-7 card-hover">
            <p className="text-[14px] font-semibold">Flow preview</p>
            <p className="mt-1.5 text-[12px] text-muted">Live config summary</p>
            <div className="mt-6 space-y-4">
              {[
                { label: "Active sections", value: `${activeCount}/7` },
                { label: "Risk threshold", value: RISK_LEVELS[riskSensitivity] },
                { label: "Posting", value: postingMode },
                { label: "Environment", value: "ambient" },
                { label: "Triggers", value: "reviewer, mention" },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <span className="text-[13px] text-muted">{row.label}</span>
                  <span className="font-mono text-[12px] text-accent">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-xl border border-[rgb(36,36,36)] bg-background p-4 font-mono text-[11px] leading-[1.9] text-muted">
              <span className="text-accent">version</span>: &quot;v1&quot;
              <br />
              <span className="text-accent">environment</span>: ambient
              <br />
              <span className="text-accent">components</span>:
              <br />
              {"  "}- <span className="text-accent">name</span>: context_brief_agent
              <br />
              {"    "}<span className="text-accent">type</span>: AgentComponent
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
