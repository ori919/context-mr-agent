# Demo Script (90 seconds)

Target audience: Hackathon judges evaluating impact, usability, technical implementation,
and demo quality.

---

## Setup (before recording)

1. Have a GitLab project with the Context Brief flow enabled
2. Have a merge request open with meaningful changes (e.g., the password reset example)
3. Have the MR page visible in your browser

---

## Script

### [0:00–0:15] The Problem

> "When you open a merge request, you see *what* changed — but not *why* it matters,
> what areas are affected, or what hidden assumptions exist. Reviewers waste time
> building this context themselves. New contributors are completely lost."

Show: a raw MR diff view with many changed files, no helpful description.

### [0:15–0:30] The Solution

> "Context Brief Agent fixes this. It's a GitLab Duo flow that automatically generates
> a structured context comment directly inside the merge request."

Show: scroll down to the Context Brief comment already posted on the MR.

### [0:30–0:50] Trigger the Flow

> "To trigger it, I assign the agent as a reviewer — or I can mention it in a comment."

Action: assign `@ai-context-brief-...` as a reviewer on a new MR (or mention in comment).

> "The flow runs in the background using GitLab CI/CD. It reads the MR metadata, diffs,
> and commit messages, then analyzes them."

Show: navigate to Automate > Sessions to show the running flow.

### [0:50–1:10] The Output

> "Here's what gets posted."

Show: the Context Brief comment on the MR. Walk through each section:

> "What changed — concrete file and function references, not a diff restatement.
> Why it matters — the business and technical significance.
> Affected areas — what else this MR touches beyond the diff.
> Hidden assumptions — things a reviewer wouldn't know from the code alone.
> Risk level — High, because this changes auth and database schema.
> Reviewer checklist — specific items for *this* MR, not generic advice.
> Docs follow-up — what documentation should be updated."

### [1:10–1:25] Technical Highlights

> "This is a native GitLab Duo custom flow — no external services, no API keys.
> It uses built-in platform tools like get_merge_request, list_merge_request_diffs,
> and create_merge_request_note. The entire flow is defined in a single YAML file
> with a carefully engineered prompt."

Show: briefly flash the `context-brief.yaml` file in the repo.

### [1:25–1:30] Close

> "Context Brief Agent. Every MR gets the context it deserves."

---

## Key Points to Hit

- **Impact**: Saves reviewer time, helps new contributors, reduces context gap
- **Usability**: One trigger, zero configuration, structured output
- **Technical**: Native platform flow, built-in tools, prompt engineering
- **Demo quality**: Real MR, real output, real trigger-to-action flow
