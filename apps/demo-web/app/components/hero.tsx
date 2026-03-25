export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_-5%,rgba(45,212,191,0.06),transparent)]" />

      <div className="relative mx-auto max-w-[1100px] px-6 pt-36 pb-24 text-center">
        {/* Badge */}
        <div className="hero-animate inline-flex items-center gap-2.5 rounded-full border border-[rgb(36,36,36)] px-5 py-2 text-[11px] font-medium tracking-[0.2em] uppercase text-muted-light">
          <span className="h-1.5 w-1.5 rounded-full bg-accent glow-dot" />
          GitLab Duo Agent Platform
        </div>

        {/* Main heading — Codexa-scale */}
        <h1 className="hero-animate-d1 mt-10 text-[clamp(3rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-[-0.03em]">
          Every MR gets the
          <br />
          context it deserves
        </h1>

        {/* Subtitle */}
        <p className="hero-animate-d2 mx-auto mt-7 max-w-[560px] text-[17px] leading-[1.65] text-muted-light">
          Write a flow once. Let it analyze your merge request and post
          a structured context brief — automatically.
        </p>

        {/* CTA — single white button, Codexa-style */}
        <div className="hero-animate-d3 mt-10">
          <a
            href="#how-it-works"
            className="group inline-flex h-[52px] items-center gap-3 rounded-full bg-foreground px-8 text-[15px] font-medium text-background transition-all hover:opacity-90"
          >
            See how it works
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

        {/* Code editor mock — full-width, Codexa-style with sidebar + tabs */}
        <div className="hero-animate-d4 mx-auto mt-20 max-w-[900px] overflow-hidden rounded-2xl border border-[rgb(36,36,36)] bg-[#0a0a0a]">
          {/* Titlebar */}
          <div className="flex items-center justify-between border-b border-[rgb(36,36,36)] px-5 py-3">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs text-muted font-mono">context-brief.yaml</span>
            <div className="w-[52px]" />
          </div>

          <div className="flex">
            {/* Sidebar */}
            <div className="hidden w-[200px] shrink-0 border-r border-[rgb(36,36,36)] px-4 py-5 sm:block">
              <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted mb-4">
                Flows
              </p>
              <div className="space-y-2 text-[13px]">
                <SidebarItem icon="folder" label=".gitlab/duo/flows" muted />
                <SidebarItem icon="file" label="context-brief.yaml" active />
                <SidebarItem icon="file" label="AGENTS.md" muted />
              </div>
            </div>

            {/* Editor area */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="flex border-b border-[rgb(36,36,36)]">
                <div className="flex items-center gap-2 border-r border-[rgb(36,36,36)] bg-background px-4 py-2.5 text-xs text-foreground">
                  <span className="h-2 w-2 rounded-sm bg-accent/40" />
                  context-brief.yaml
                </div>
                <div className="flex items-center gap-2 px-4 py-2.5 text-xs text-muted">
                  <span className="h-2 w-2 rounded-sm bg-muted/20" />
                  AGENTS.md
                </div>
              </div>

              {/* Code lines */}
              <div className="p-5 font-mono text-[13px] leading-[1.85] text-left">
                <Line n={1}><K>version</K>: <S>&quot;v1&quot;</S></Line>
                <Line n={2}><K>environment</K>: <S>ambient</S></Line>
                <Line n={3} />
                <Line n={4}><K>components</K>:</Line>
                <Line n={5}>  - <K>name</K>: <S>&quot;context_brief_agent&quot;</S></Line>
                <Line n={6}>    <K>type</K>: <S>AgentComponent</S></Line>
                <Line n={7}>    <K>prompt_id</K>: <S>&quot;context_brief_prompt&quot;</S></Line>
                <Line n={8}>    <K>toolset</K>:</Line>
                <Line n={9}>      - <S>&quot;get_merge_request&quot;</S></Line>
                <Line n={10}>      - <S>&quot;list_merge_request_diffs&quot;</S></Line>
                <Line n={11}>      - <S>&quot;list_commits&quot;</S></Line>
                <Line n={12}>      - <S>&quot;create_merge_request_note&quot;</S></Line>
                <Line n={13} />
                <Line n={14}><K>flow</K>:</Line>
                <Line n={15}>  <K>entry_point</K>: <S>&quot;context_brief_agent&quot;</S></Line>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SidebarItem({ icon, label, active, muted }: { icon: "folder" | "file"; label: string; active?: boolean; muted?: boolean }) {
  return (
    <div className={`flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] ${active ? "bg-white/[0.04] text-accent" : muted ? "text-muted" : "text-muted-light"}`}>
      {icon === "folder" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
          <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-50">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
      {label}
    </div>
  );
}

function Line({ n, children }: { n: number; children?: React.ReactNode }) {
  return (
    <div className="flex">
      <span className="mr-6 inline-block w-6 text-right text-muted/40 select-none">{n}</span>
      <span>{children ?? "\u00A0"}</span>
    </div>
  );
}

function K({ children }: { children: React.ReactNode }) {
  return <span className="text-accent">{children}</span>;
}

function S({ children }: { children: React.ReactNode }) {
  return <span className="text-muted-light">{children}</span>;
}
