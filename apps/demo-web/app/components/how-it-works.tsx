"use client";

import { useScrollReveal } from "../hooks/use-scroll-reveal";

const STEPS = [
  {
    step: "STEP 1",
    title: "Connect your existing tools",
    description:
      "Assign the agent as a reviewer or mention it in a comment. The flow launches automatically.",
    status: "INTEGRATING…",
    rows: [
      { label: "Assign reviewer", value: "Active", accent: true },
      { label: "Mention trigger", value: "Active", accent: true },
      { label: "Pipeline events", value: "Optional", accent: false },
    ],
  },
  {
    step: "STEP 2",
    title: "Analyze every change",
    description:
      "The agent gathers MR metadata, diffs, and commits. It classifies changes, infers intent, and detects hidden assumptions.",
    status: "PROCESSING…",
    rows: [
      { label: "get_merge_request", value: "Read", accent: true },
      { label: "list_merge_request_diffs", value: "Read", accent: true },
      { label: "list_commits", value: "Read", accent: true },
      { label: "build_review_context", value: "Read", accent: true },
      { label: "list_repository_tree", value: "Read", accent: false },
    ],
  },
  {
    step: "STEP 3",
    title: "Post the brief instantly",
    description:
      "A structured Context Brief is posted directly as a merge request note. Seven sections, zero config.",
    status: "COMPLETE",
    rows: [
      { label: "What changed", value: "Posted", accent: true },
      { label: "Risk level", value: "Posted", accent: true },
      { label: "Reviewer checklist", value: "Posted", accent: true },
      { label: "Docs follow-up", value: "Posted", accent: true },
    ],
  },
];

export function HowItWorks() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section id="how-it-works" ref={sectionRef} className="reveal py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
            HOW IT WORKS
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
            From setup to automation
            <br />
            in 3 simple steps
          </h2>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <div
              key={step.step}
              className={`reveal reveal-d${i + 1} rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a] p-7 card-hover`}
            >
              {/* Step label + status */}
              <div className="flex items-center justify-between mb-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
                  {step.step}
                </p>
                <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-muted">
                  {step.status}
                </span>
              </div>

              <h3 className="text-[18px] font-semibold leading-tight tracking-tight">
                {step.title}
              </h3>
              <p className="mt-3 text-[13px] leading-[1.7] text-muted-light">
                {step.description}
              </p>

              {/* Rows — Codexa status list style */}
              <div className="mt-6 space-y-2">
                {step.rows.map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-[rgb(36,36,36)] bg-background px-4 py-3"
                  >
                    <span className="text-[12px] text-muted-light font-mono">{row.label}</span>
                    <span className={`flex items-center gap-2 text-[11px] font-medium ${row.accent ? "text-accent" : "text-muted"}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${row.accent ? "bg-accent" : "bg-muted/50"}`} />
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Full toolset bar */}
        <div className="mt-8 rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a] px-7 py-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted mb-5">
            FULL TOOLSET
          </p>
          <div className="flex flex-wrap gap-2.5">
            {[
              "build_review_merge_request_context",
              "get_merge_request",
              "list_merge_request_diffs",
              "list_commits",
              "get_repository_file",
              "list_repository_tree",
              "create_merge_request_note",
            ].map((tool) => (
              <span
                key={tool}
                className="rounded-lg border border-[rgb(36,36,36)] bg-background px-3.5 py-2 font-mono text-[12px] text-muted-light transition-all hover:text-accent hover:border-accent/20"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
