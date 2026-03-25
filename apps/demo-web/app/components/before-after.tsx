"use client";

import { useScrollReveal } from "../hooks/use-scroll-reveal";

export function BeforeAfter() {
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        {/* Section header — Codexa style */}
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
            THE DIFFERENCE
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            From noise to clarity
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-muted-light">
            A typical MR shows what changed. Context Brief shows
            what you actually need to know.
          </p>
        </div>

        <div className="mt-16 grid gap-5 lg:grid-cols-2">
          {/* BEFORE — Codexa card style */}
          <div className="rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a] p-7 card-hover">
            <div className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-danger" />
              Without Context Brief
            </div>

            <div className="mt-6 space-y-3.5">
              <div className="rounded-xl border border-[rgb(36,36,36)] bg-background p-5 font-mono text-[13px] leading-[1.8]">
                <div className="text-danger/70">- const TOKEN_EXPIRY = 3600;</div>
                <div className="text-success/70">+ const TOKEN_EXPIRY = 7200;</div>
                <div className="mt-3 text-danger/70">- validateSession(req);</div>
                <div className="text-success/70">+ validateRecoveryToken(req);</div>
                <div className="mt-4 text-muted/40 text-[12px]">
                  // ... 847 more lines across 12 files
                </div>
              </div>

              <div className="rounded-xl border border-[rgb(36,36,36)] bg-background p-5">
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted">
                  MR Description
                </p>
                <p className="mt-2.5 text-sm text-muted-light italic">
                  &quot;Added password reset flow&quot;
                </p>
              </div>

              <p className="pt-2 text-[13px] text-muted">
                Reviewer reconstructs context from the diff alone. Time wasted.
              </p>
            </div>
          </div>

          {/* AFTER — Codexa card style with accent border */}
          <div className="rounded-2xl border border-accent/20 bg-[#0a0a0a] p-7 card-hover">
            <div className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent glow-dot" />
              With Context Brief
            </div>

            <div className="mt-6 space-y-3.5">
              <BriefRow title="What changed">
                <ul className="space-y-1.5 text-[13px] text-muted-light list-disc pl-4">
                  <li>Added password reset endpoint in <C>reset.ts</C></li>
                  <li>Updated token validation logic</li>
                  <li>New <C>recovery_tokens</C> migration</li>
                </ul>
              </BriefRow>

              <BriefRow title="Risk level">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-danger/15 px-3 py-1 text-[12px] font-semibold text-danger">
                    High
                  </span>
                  <span className="text-[13px] text-muted">Auth + DB schema + sessions</span>
                </div>
              </BriefRow>

              <BriefRow title="Hidden assumptions">
                <ul className="space-y-1.5 text-[13px] text-muted-light list-disc pl-4">
                  <li>Token expiry enforced server-side only</li>
                  <li>Session invalidation is asynchronous</li>
                </ul>
              </BriefRow>

              <p className="pt-2 text-[13px] text-accent">
                Full context in under 10 seconds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BriefRow({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-[rgb(36,36,36)] bg-background p-5">
      <p className="text-[12px] font-semibold text-foreground mb-2.5">{title}</p>
      {children}
    </div>
  );
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-foreground text-[12px] bg-white/[0.06] px-1.5 py-0.5 rounded">
      {children}
    </code>
  );
}
