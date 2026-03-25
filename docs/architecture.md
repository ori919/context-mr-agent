# Architecture Overview

## System Design

Context Brief Agent is a single-flow, single-agent system built on the GitLab Duo Agent
Platform. It reacts to merge request events and posts a structured context comment.

```
┌──────────────────────────────────────────────────────────────┐
│                      GitLab Instance                         │
│                                                              │
│  ┌─────────────┐    Trigger     ┌──────────────────────┐    │
│  │ Merge       │ ──────────────▶│ Context Brief Flow   │    │
│  │ Request     │  (assign       │                      │    │
│  │             │   reviewer /   │  ┌────────────────┐  │    │
│  │             │   mention)     │  │ context_brief  │  │    │
│  │             │                │  │ _agent         │  │    │
│  │             │                │  │ (AgentComponent│  │    │
│  │             │                │  │  + 7 tools)    │  │    │
│  │             │◀───────────────│  └────────────────┘  │    │
│  │             │  create_merge  │                      │    │
│  │             │  _request_note │                      │    │
│  └─────────────┘                └──────────────────────┘    │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

## Flow Execution

1. **Trigger**: A user assigns the agent service account as a reviewer on an MR, or
   mentions it in a comment.
2. **CI/CD Pipeline**: GitLab creates an ephemeral workload pipeline. The runner downloads
   `@gitlab/duo-cli`, which connects to the Duo Workflow Service via WebSocket.
3. **Agent Execution**: The `context_brief_agent` component runs with its toolset.
   It calls tools to gather MR metadata, diffs, and commits; analyzes the data according
   to its prompt; and posts the Context Brief as an MR note.
4. **Completion**: The flow routes to `end` and the workload pipeline is cleaned up.

## Component Design

The flow uses a single `AgentComponent` rather than a multi-component chain. This
decision is intentional:

- **Reliability**: Fewer moving parts, fewer failure points
- **Context coherence**: A single agent maintains full context across gather, analyze,
  and post steps without lossy handoffs between components
- **Simplicity**: The prompt engineering is the differentiator, not the component graph

## Toolset

| Tool | Purpose |
|------|---------|
| `build_review_merge_request_context` | Structured MR context for code review |
| `get_merge_request` | MR title, description, labels, branches |
| `list_merge_request_diffs` | Changed files and diff content |
| `list_commits` | Commit messages for intent signals |
| `get_repository_file` | Read specific files for deeper context |
| `list_repository_tree` | Project structure understanding |
| `create_merge_request_note` | Post the Context Brief comment |

## Trigger Configuration

| Trigger | Type | Use Case |
|---------|------|----------|
| Assign reviewer | Primary | Natural review workflow — add agent as reviewer |
| Mention | Secondary | Manual trigger via `@ai-context-brief-...` in comment |

## Prompt Architecture

The system prompt has six phases:

1. **GATHER** — Call tools to collect MR data
2. **CLASSIFY** — Group changed files by area
3. **ANALYZE** — Infer purpose, affected areas, hidden assumptions
4. **ASSESS** — Assign risk level using defined criteria
5. **FORMAT** — Produce structured markdown
6. **POST** — Publish as MR note

The prompt also includes a tribal knowledge heuristic table that maps file path patterns
to domain-specific assumptions the agent should surface.
