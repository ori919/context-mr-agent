# Context Brief Agent

**Every merge request gets the context it deserves.**

A GitLab Duo Agent Platform flow that automatically generates and posts structured
context briefs on merge requests — surfacing not just *what* changed, but *why* it
matters, what areas are affected, and what a reviewer needs to know before approving.

---

## The Problem

Merge requests show what changed. They rarely explain:

- **Why** it changed
- What **surrounding areas** are affected
- What **hidden assumptions** exist in the code
- What a **reviewer or new contributor** should know before approving

This context lives in people's heads, old Slack threads, or nowhere at all. Reviewers
waste time reconstructing it. New contributors are completely lost.

## The Solution

Context Brief Agent is a GitLab Duo custom flow that triggers on merge request events
and posts a structured **Context Brief** comment directly inside the MR.

The brief includes:

| Section | What it covers |
|---------|---------------|
| **What changed** | Concrete file and function references |
| **Why this matters** | Business and technical significance |
| **Affected areas** | Modules impacted beyond the diff |
| **Hidden assumptions** | Non-obvious constraints and coupling |
| **Risk level** | High / Medium / Low with reasoning |
| **Reviewer checklist** | Verification items specific to this MR |
| **Docs follow-up** | Documentation to create or update |

## How It Works

```
Trigger (assign reviewer / mention)
        │
        ▼
┌───────────────────────┐
│  context_brief_agent  │
│  (AgentComponent)     │
│                       │
│  1. Gather MR data    │──▶ get_merge_request, list_merge_request_diffs,
│  2. Classify changes  │    list_commits, build_review_merge_request_context,
│  3. Analyze context   │    get_repository_file, list_repository_tree
│  4. Assess risk       │
│  5. Format brief      │
│  6. Post comment      │──▶ create_merge_request_note
└───────────────────────┘
        │
        ▼
      [end]
```

## Quick Start

### Prerequisites

- GitLab.com or GitLab Self-Managed with Duo Agent Platform enabled
- Maintainer or Owner role on the target project
- GitLab Duo enabled in your group/project settings
- A runner with the `gitlab--duo` tag (or GitLab hosted runners enabled)

### Setup

1. **Create the flow** in your GitLab project:
   - Navigate to **Automate > Flows**
   - Click **Create flow**
   - Enter a display name (e.g., "Context Brief")
   - Paste the contents of [`.gitlab/duo/flows/context-brief.yaml`](.gitlab/duo/flows/context-brief.yaml)
     into the flow editor
   - Click **Create flow**

2. **Enable the flow** in your project:
   - On the flow page, click **Enable**
   - Select triggers: **Assign reviewer** and **Mention**
   - Click **Enable**

3. **Use it**:
   - Open a merge request
   - Assign the agent service account (e.g., `@ai-context-brief-...`) as a reviewer
   - Or mention the service account in a comment
   - Wait for the flow to complete — a Context Brief appears as an MR comment

### Optional: AGENTS.md

Copy [`AGENTS.md`](AGENTS.md) to your project root to provide the agent with
project-specific context and customization hints.

## Project Structure

```
.
├── .gitlab/duo/flows/
│   └── context-brief.yaml       ← Core flow definition (the submission)
├── AGENTS.md                    ← Optional per-project agent hints
├── README.md                    ← This file
├── LICENSE                      ← MIT License
├── docs/
│   ├── architecture.md          ← Architecture overview
│   └── demo-script.md           ← 90-second demo walkthrough
├── examples/
│   └── sample-output.md         ← Sample Context Brief
└── apps/demo-web/               ← Demo presentation page (Next.js)
```

## Architecture

The flow uses a single `AgentComponent` with seven built-in platform tools.
No external services, no API keys, no custom runtime. The entire agent is defined
in one YAML file with a carefully engineered prompt.

For details, see [docs/architecture.md](docs/architecture.md).

## Triggers

| Trigger | Type | Description |
|---------|------|-------------|
| **Assign reviewer** | Primary | Assign the agent service account as an MR reviewer |
| **Mention** | Secondary | Mention the agent in an MR comment for manual trigger |

## Sample Output

See [examples/sample-output.md](examples/sample-output.md) for a complete example of
a Context Brief as it appears in a merge request.

## Demo

See [docs/demo-script.md](docs/demo-script.md) for a 90-second demo walkthrough.

A supplementary demo page is available in `apps/demo-web/` — a static Next.js site
that showcases the concept, before/after workflow, and sample output for presentation
purposes.

## Technical Details

- **Platform**: GitLab Duo Agent Platform (custom flow, v1 spec)
- **Environment**: `ambient` (background execution, no user interaction required)
- **Execution**: GitLab CI/CD via `@gitlab/duo-cli`
- **Tools**: All built-in platform tools — no external dependencies
- **Prompt strategy**: Six-phase process (Gather → Classify → Analyze → Assess →
  Format → Post) with tribal knowledge heuristics for file-pattern-based assumption
  detection

## License

[MIT](LICENSE)
