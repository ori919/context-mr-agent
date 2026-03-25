"use client";

import { Hero } from "./components/hero";
import { BeforeAfter } from "./components/before-after";
import { ContextBriefCard } from "./components/context-brief-card";
import { HowItWorks } from "./components/how-it-works";
import { ConfigPanel } from "./components/config-panel";
import { useScrollReveal, useGlobalReveal } from "./hooks/use-scroll-reveal";

function Divider() {
  return (
    <div className="mx-auto max-w-[1100px] px-6">
      <div className="h-[1px] bg-[rgb(36,36,36)]" />
    </div>
  );
}

function CtaSection() {
  const ref = useScrollReveal<HTMLElement>();
  return (
    <section ref={ref} className="reveal py-32">
      <div className="mx-auto max-w-[1100px] px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.25em] text-accent">
          OPEN SOURCE
        </p>
        <h2 className="mt-5 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
          Automate context.
          <br />
          Ship faster.
        </h2>
        <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-[1.7] text-muted-light">
          Built for the GitLab AI Hackathon. One flow, one agent, one comment
          that saves every reviewer&apos;s time.
        </p>
        <div className="mt-10">
          <a
            href="https://gitlab.com/ila-group/context-mr-agent"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-foreground px-8 text-[15px] font-medium text-background transition-all hover:opacity-90"
          >
            Explore the project
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path d="M5 12h13M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useGlobalReveal();

  return (
    <div className="flex min-h-screen flex-col">
      {/* Nav — Codexa style: logo left, links right */}
      <nav className="fixed top-0 z-50 w-full border-b border-[rgb(36,36,36)] bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-[10px] font-black text-accent tracking-wider">
              CB
            </div>
            <span className="text-[15px] font-semibold tracking-tight">
              Context Brief
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="text-[13px] text-muted transition-colors hover:text-foreground">
              How it works
            </a>
            <a
              href="https://gitlab.com/ila-group/context-mr-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-9 items-center gap-2 rounded-full bg-foreground px-5 text-[13px] font-medium text-background transition-all hover:opacity-90"
            >
              GitLab
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                <path d="M5 12h13M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-[65px]" />

      <main className="flex-1">
        <Hero />
        <Divider />
        <BeforeAfter />
        <Divider />
        <ContextBriefCard />
        <Divider />
        <HowItWorks />
        <Divider />
        <ConfigPanel />
        <Divider />
        <CtaSection />
      </main>

      {/* Footer — Codexa style with columns */}
      <footer className="border-t border-[rgb(36,36,36)]">
        <div className="mx-auto max-w-[1100px] px-6 py-14">
          <div className="grid gap-10 sm:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-[10px] font-black text-accent tracking-wider">
                  CB
                </div>
                <span className="text-[15px] font-semibold tracking-tight">
                  Context Brief
                </span>
              </div>
              <p className="mt-4 text-[13px] leading-[1.7] text-muted max-w-[240px]">
                A GitLab Duo Agent Platform flow that generates structured context briefs on merge requests.
              </p>
            </div>

            {/* Project */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted mb-4">
                Project
              </p>
              <div className="space-y-3">
                <FooterLink href="#how-it-works">How it works</FooterLink>
                <FooterLink href="https://gitlab.com/ila-group/context-mr-agent" external>Repository</FooterLink>
                <FooterLink href="https://gitlab.com/gitlab-ai-hackathon" external>Hackathon</FooterLink>
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted mb-4">
                Legal
              </p>
              <div className="space-y-3">
                <FooterLink href="#">MIT License</FooterLink>
                <FooterLink href="#">Privacy</FooterLink>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-[rgb(36,36,36)] flex items-center justify-between text-[11px] text-muted uppercase tracking-[0.1em]">
            <span>&copy;2026 Context Brief Agent. All rights reserved.</span>
            <span>GitLab AI Hackathon</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FooterLink({ href, children, external }: { href: string; children: React.ReactNode; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="block text-[13px] text-muted-light transition-colors hover:text-foreground"
    >
      {children}
    </a>
  );
}
