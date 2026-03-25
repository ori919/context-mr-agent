"use client";

import { useState } from "react";
import { useScrollReveal } from "../hooks/use-scroll-reveal";

const SECTIONS = [
  {
    id: "what",
    icon: "changes",
    title: "What changed",
    body: (
      <ul className="list-disc pl-4 space-y-2 text-[13px] text-muted-light leading-relaxed">
        <li>Added <C>POST /api/v1/auth/reset-password</C> in <C>src/api/auth/reset.ts</C></li>
        <li>Updated token validation in <C>token-service.ts</C> for single-use recovery tokens</li>
        <li>Added <C>PasswordResetForm</C> component with rate-limit UX</li>
        <li>New migration <C>20260320_add_recovery_tokens_table.sql</C></li>
        <li>Updated password-reset email template with branding</li>
        <li>Added integration tests for the reset endpoint</li>
      </ul>
    ),
  },
  {
    id: "why",
    icon: "info",
    title: "Why this matters",
    body: (
      <p className="text-[13px] text-muted-light leading-[1.8]">
        This MR introduces self-service password recovery, changing the authentication flow
        to allow users to reset credentials without admin intervention. It touches token
        generation, email delivery, and user settings — three areas tightly coupled to
        session management and account security.
      </p>
    ),
  },
  {
    id: "affected",
    icon: "radar",
    title: "Affected areas",
    body: (
      <ul className="list-disc pl-4 space-y-2 text-[13px] text-muted-light leading-relaxed">
        <li>Auth middleware — token validation path now includes recovery type</li>
        <li>Email delivery service — new template registration</li>
        <li>User settings page — new recovery flow entry point</li>
        <li>Session management — sessions invalidated after reset</li>
        <li>Rate limiting — reset endpoint needs its own bucket</li>
      </ul>
    ),
  },
  {
    id: "hidden",
    icon: "eye",
    title: "Hidden assumptions",
    body: (
      <ul className="list-disc pl-4 space-y-2 text-[13px] text-muted-light leading-relaxed">
        <li>Recovery tokens are single-use server-side, but client does not prevent double-submission</li>
        <li>Email provider may retry delivery, sending multiple reset links</li>
        <li>UI assumes user is logged out after reset, but session invalidation is asynchronous</li>
        <li>Migration is irreversible — rollback drops all recovery token history</li>
      </ul>
    ),
  },
  {
    id: "risk",
    icon: "alert",
    title: "Risk level",
    body: (
      <div className="flex items-center gap-3.5">
        <span className="rounded-full bg-danger/15 px-3.5 py-1 text-[12px] font-semibold text-danger tracking-wide">
          HIGH
        </span>
        <span className="text-[13px] text-muted-light">Auth + DB schema + session lifecycle</span>
      </div>
    ),
  },
  {
    id: "checklist",
    icon: "check",
    title: "Reviewer checklist",
    body: (
      <ul className="space-y-3">
        {[
          "Verify expired-token behavior returns 401",
          "Verify replay protection (single-use enforcement)",
          "Verify concurrent request handling on same token",
          "Verify session invalidation ordering",
          "Verify rate limiting on reset endpoint",
          "Verify test coverage for failure paths",
        ].map((item) => (
          <li key={item} className="flex items-start gap-3 text-[13px] text-muted-light">
            <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded border border-[rgb(50,50,50)] bg-white/[0.02]" />
            {item}
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: "docs",
    icon: "book",
    title: "Docs follow-up",
    body: (
      <ul className="list-disc pl-4 space-y-2 text-[13px] text-muted-light leading-relaxed">
        <li>Update auth flow documentation with recovery path</li>
        <li>Add password-reset architecture note</li>
        <li>Document recovery_tokens table schema</li>
        <li>Add rate-limiting config to ops runbook</li>
      </ul>
    ),
  },
];

export function ContextBriefCard() {
  const [expandedId, setExpandedId] = useState<string | null>("what");
  const sectionRef = useScrollReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="reveal py-28">
      <div className="mx-auto max-w-[1100px] px-6">
        <div className="text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
            SAMPLE OUTPUT
          </p>
          <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.02em]">
            The Context Brief
          </h2>
          <p className="mx-auto mt-5 max-w-[480px] text-[15px] leading-[1.7] text-muted-light">
            Exactly what gets posted as a comment on the merge request.
            Seven sections, scannable in under 10 seconds.
          </p>
        </div>

        {/* MR Comment card */}
        <div className="mx-auto mt-16 max-w-[700px] rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a] overflow-hidden">
          {/* Comment header — avatar + name + bot badge */}
          <div className="flex items-center gap-3.5 border-b border-[rgb(36,36,36)] px-6 py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-[11px] font-bold text-accent tracking-wider">
              CB
            </div>
            <div>
              <span className="text-[14px] font-medium">Context Brief Agent</span>
              <span className="ml-2.5 text-[12px] text-muted">just now</span>
            </div>
            <div className="ml-auto rounded-full border border-accent/20 bg-accent/[0.08] px-3 py-0.5 text-[10px] font-medium text-accent uppercase tracking-[0.15em]">
              Bot
            </div>
          </div>

          {/* Brief title */}
          <div className="border-b border-[rgb(36,36,36)] px-6 py-4">
            <h3 className="text-[15px] font-semibold flex items-center gap-2.5">
              <span className="text-lg">🔍</span>
              Context Brief
            </h3>
          </div>

          {/* Accordion sections */}
          <div className="divide-y divide-[rgb(36,36,36)]">
            {SECTIONS.map((section) => {
              const isOpen = expandedId === section.id;
              return (
                <div key={section.id}>
                  <button
                    onClick={() => setExpandedId(isOpen ? null : section.id)}
                    className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-white/[0.02]"
                  >
                    <span className="text-[14px] font-medium">{section.title}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 16 16"
                      fill="none"
                      className={`ml-auto text-muted transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <div
                    className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5">{section.body}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-[rgb(36,36,36)] px-6 py-3 text-[11px] italic text-muted">
            Generated by Context Brief Agent
          </div>
        </div>
      </div>
    </section>
  );
}

function C({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-foreground text-[12px] bg-white/[0.06] px-1.5 py-0.5 rounded font-mono">
      {children}
    </code>
  );
}
