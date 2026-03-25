# AGENTS.md — Context Brief Agent Customization

This file provides optional guidance to GitLab Duo when executing the Context Brief flow
in this project. It is not required for the flow to function, but it can improve the
quality and relevance of generated context briefs by giving the agent project-specific
awareness.

## Project Context

This project uses the GitLab Duo Agent Platform to run the Context Brief Agent — an
ambient flow that generates structured context briefs on merge requests.

## Guidelines for the Agent

When generating a Context Brief for this repository:

- Prioritize clarity and specificity over completeness.
- Reference actual file paths and function names from the diff.
- If the MR description already explains intent well, acknowledge it and extend rather
  than restate.
- Keep the entire brief scannable in under 10 seconds.
- Flag missing test coverage only when the affected domain already has established tests.

## Risk Assessment Overrides

For this project, treat changes to the following paths as elevated risk:

- `.gitlab/duo/flows/` — flow configuration changes affect agent behavior directly
- `apps/demo-web/src/` — demo page changes are presentation-critical for the hackathon

## Tribal Knowledge for This Repo

- The flow YAML at `.gitlab/duo/flows/context-brief.yaml` is the core deliverable.
  Any changes to it should be reviewed carefully for prompt regression.
- The demo web app is a static Next.js export and does not interact with GitLab APIs
  at runtime.
- The `examples/sample-output.md` file should stay in sync with the actual output
  format defined in the flow prompt.
