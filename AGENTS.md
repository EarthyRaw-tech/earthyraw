# AGENTS.md
# Enterprise Engineering Standard (Mandatory) — Any Project / Any Stack

This repo is maintained under strict change-control. All agents must follow these rules.

---

## 0) Approval Gate (MANDATORY)
- Do not make *any* changes until the user explicitly approves implementation with the phrase:
  **"approve to code"**
- Close variants count only if the user’s intent is unmistakable.
- If uncertain, ask for confirmation and do not proceed.

**“Changes” include** (non-exhaustive):
- Editing / creating / deleting files
- Installing / upgrading / removing dependencies
- Running commands that write files
- Running builds or generators that create artifacts or caches
- Running commands that modify lockfiles or generated clients
- Running formatters / linters in write mode
- Running tests that write snapshots, fixtures, coverage, temp files, or outputs
- Changing database state (migrations, seeds, resets, admin edits)
- Changing infrastructure / config (CI, deploy, secrets, env files)
- Triggering deploys, background jobs, syncs, webhooks, or external side effects
- Anything that alters tracked files, untracked artifacts, lockfiles, generated outputs, local state, or remote state

Before approval, you may only:
- Inspect / read / analyze
- Ask clarifying questions (only if truly required)
- Propose a plan + exact file list + copy-paste-ready unified diffs (read-only)
- Identify risks, dependencies, and testing steps
- Report “Out of Scope Findings” (do not fix)

---

## 0A) Read-Only Means Truly Read-Only
Before approval, “inspect / read / analyze” must not create, modify, or delete:
- source files
- config files
- lockfiles
- generated code
- caches
- temp files
- screenshots
- coverage reports
- build outputs
- local database state
- remote environment state

Disallowed before approval includes, even if commonly considered harmless:
- `npm install`, `pnpm install`, `yarn`, `bun install`
- `next build`, `vite build`, `tsc`, `prisma generate`
- `eslint --fix`, `prettier --write`
- snapshot updates
- code generators / scaffolding tools
- migrations / seeds / resets
- commands that create `.next`, `dist`, `build`, `coverage`, `.turbo`, temp caches, or generated clients

---

## 0B) No Side-Channel Changes
Before approval, do not:
- create or modify docs, artifacts, canvases, or side documents as a substitute for repo changes
- call external tools that may write into the repo or connected systems
- trigger CI/CD, deploys, migrations, webhooks, syncs, billing actions, email/SMS sends, or background jobs
- modify project boards, tickets, docs, wikis, calendars, emails, or connected services unless explicitly requested

---

## 1) Scope Control (No Surprises)
- Default to the smallest possible change that achieves the requested outcome.
- Refactors / renames / reorganization / reformatting are out of scope by default.
  - If truly required to complete the task safely or correctly, PAUSE and explain:
    1) why it’s required
    2) the smallest version needed
    3) the exact files that would change
    4) risks / tradeoffs
  - Proceed only after the user explicitly approves expanded scope.
- Avoid changing behavior outside the stated task scope.
  - If unavoidable, PAUSE and explain impact + options.
- Avoid broad formatters / linters across unrelated files.
  - Limit formatting to touched lines unless the user approves a formatting-only change set.
- Prefer existing repo conventions / patterns.
  - If a new pattern is necessary, explain why and propose the least disruptive option.

If you discover unrelated issues:
- List them under **Out of Scope Findings** with severity + suggested follow-up.
- Do not fix them unless the user explicitly approves.

---

## 1A) File List Freeze
Before approval, the agent must provide the exact file list it intends to modify.

After approval, the agent must not modify files outside that list unless the user explicitly approves the expanded file list.

Approval to code authorizes only the specifically proposed scope.

It is **not** blanket approval for:
- additional refactors
- dependency changes
- schema changes
- config / env changes
- unrelated fixes
- broad formatting
- extra cleanup
- opportunistic improvements outside the approved task

---

## 1B) No Opportunistic Fixes
Do not silently fix nearby bugs, warnings, typos, dead code, style issues, or unrelated code smells outside the approved scope.

List them under **Out of Scope Findings** instead.

---

## 2) Project Assumptions (Do Not Guess Differently)
- Follow existing project conventions (architecture, naming, folder structure, patterns, error handling, logging).
- Do not change core technology choices (language / framework / DB / auth / deploy) without explicit instruction.
- If something is unknown, state the assumption and provide options.

---

## 2A) MVP Completeness Rule (Default Delivery Standard)
Unless the user explicitly requests a partial step, draft only, prototype only, scaffold only, or UI-only work, the default expectation is a **working MVP for the requested feature**.

That means the delivered feature should be implemented **end-to-end within the approved scope**.

Examples:
- If the user asks for a login area, MVP usually includes:
  - page / UI
  - form handling
  - validation
  - auth call / integration
  - success / failure states
  - protected-route behavior or post-login flow
  - minimal error handling
- If the user asks for a module, MVP usually includes:
  - UI
  - backend / API path if needed
  - data wiring if already part of repo conventions
  - basic permissions / access control if relevant
  - loading / empty / error / success states
  - minimal manual test path

However:
- “End-to-end MVP” applies only to the **requested feature**, not to adjacent features.
- The agent must still make the **smallest complete change**.
- If true MVP requires additional files, dependencies, migrations, or configuration not included in the original request, the agent must say so before implementation.
- If the user requests only one layer (example: “just the UI”), do only that layer.

---

## 2B) Definition of MVP for Feature Requests
A feature is not “done” if it is only partially wired unless the user explicitly asked for partial work.

For most feature requests, MVP means:
- the user-facing entry point exists
- the main action works
- expected states are handled
- the happy path is functional
- basic failure cases are handled
- the feature integrates with existing auth / data / routing conventions
- it can be manually tested end-to-end

MVP does **not** automatically include:
- advanced analytics
- multi-step optimizations
- large refactors
- full redesigns
- speculative abstractions
- extra roles / features not requested
- broad test suites beyond repo norms
- production hardening beyond the requested scope unless required for safety / security

---

## 3) Work / Branch Workflow (If Using Git)

### Git Commands = Recommendations Only (User-Controlled Git) — MANDATORY
- The agent must **NEVER** run Git commands or perform Git actions.
- The agent may only **recommend** Git commands and explain what each command does.
- The **user** is the only one who executes Git commands.
- The agent must **never**: commit, push, merge, rebase, tag, cherry-pick, stash, reset, revert, or force-push.

### Default Branch Model (adjust to repo reality)
- `main` or `master` = stable / production-ready only
- `dev` = working integration branch
- `feature/*` = isolated changes

### Rules
- Never work directly on `main/master`.
- Normal work happens on `feature/*` branches created from `dev`.
- `main/master` is updated only from `dev` after `dev` is verified.

### Recommended Commands (User Executes)
**Update local main/master:**
- `git fetch origin`
- `git switch main` (or `master`)
- `git pull --ff-only`

**Keep dev updated from main/master:**
- `git switch dev`
- `git pull --ff-only`
- `git merge origin/main` (or `origin/master`)

**Create a feature branch from dev:**
- `git switch dev`
- `git pull --ff-only`
- `git switch -c feature/<short-name>`
- `git push -u origin feature/<short-name>`

**Merge feature → dev (when working OK):**
- `git switch dev`
- `git pull --ff-only`
- `git merge --no-ff feature/<short-name>`
- `git push`

**Merge dev → main/master (only when verified):**
- `git switch main` (or `master`)
- `git pull --ff-only`
- `git merge --ff-only dev`
- `git push`

### If the repo does NOT use Git
- Keep changes isolated, reversible, and clearly described.
- Maintain a change log of what was modified and why.

---

## 4) Commit / PR Discipline (If Using Git)

### User-Controlled Git — MANDATORY
- The agent must **never** commit, push, merge, rebase, or tag.
- The agent may only **recommend** commit messages and Git steps.
- The user executes all Git operations.

### Conventional Commits (Preferred)
- Use:
  - `feat:`
  - `fix:`
  - `chore:`
  - `refactor:`
  - `docs:`
  - `test:`

### Commit Style
- On `feature/*` branches: frequent commits are OK.
- Each commit message must be clear and describe the change.
- `wip:` commits are allowed on `feature/*` branches only.

### Keep `dev` and `main/master` Clean
- Before merging into `dev` or `main/master`:
  - Prefer a clean, reviewable history:
    - squash / rebase tiny checkpoint commits into logical commits, or
    - keep multiple commits if each commit is coherent and reviewable
- `main/master` should receive only verified, stable merges from `dev`.

### Avoid Mixing Unrelated Changes
- Each commit should focus on one topic.
- Do not mix UI + DB schema + refactors in one commit unless the user approved that combined scope.

Every PR / change set must include:
- Summary (what changed)
- Rationale (why)
- Test plan (exact steps + expected results)
- Risk / rollback notes (if applicable)
- Out of Scope Findings (if any)

---

## 5) Definition of Done (Quality Gate)
A task is DONE only when:
- Builds / compiles successfully (no new errors), if build is in scope and safe to run
- Tests pass (if present and safe to run)
- Lint / format checks pass (if present and safe to run)
- No secrets are exposed
- Security posture is not weakened
- Docs are updated if config / env / behavior changes
- Changes are minimal, scoped, and reversible
- The requested feature is complete at MVP level unless the user explicitly requested partial work

---

## 6) Required Checks Before Marking Complete
Run or ensure equivalent checks pass using the project’s existing tooling.

Examples (use what the repo already has):
- Build / compile
- Lint / format check (non-destructive unless approved)
- Unit / integration / e2e tests
- Static analysis / type checks
- Database migration / validation checks if applicable

If any check fails:
- Pause and report failure + likely root cause + fix plan.

---

## 6A) Safe Validation Only
After approval, validation must prefer non-destructive checks first.

Do not run commands against:
- production
- shared databases
- live third-party services
- billing systems
- email / SMS providers
- irreversible external actions

unless the user explicitly approved that exact validation step.

---

## 7) Security (Hard Rules)
- NEVER commit or share secrets (tokens, passwords, private keys, API keys, private URLs).
- NEVER log secrets or paste them into issues, screenshots, or snippets.
- Secrets must be provided via environment variables or secret managers.
- If a secret is exposed, treat it as compromised and rotate it.

### Auth & Access
- Avoid weakening authentication, authorization, or validation.
- Don’t add public endpoints / commands that perform privileged actions without protection.
- Use least privilege.

---

## 8) Dependency / Tooling Management
- Avoid adding / upgrading dependencies unless explicitly needed.
- Avoid switching package managers / build systems unless explicitly instructed.
- If adding a dependency is necessary:
  - justify it
  - prefer maintained libraries
  - keep additions minimal
  - update lockfiles only if dependencies actually changed

If no dependency was intentionally added, removed, or upgraded, lockfiles must not change.

If a lockfile changes unexpectedly, STOP and report why before proceeding.

---

## 9) Data / Persistence Rules (If Applicable)
- Do not weaken data access controls (permissions / policies / RLS / ACLs).
- Schema changes must be captured as migrations if the repo uses migrations.
- Avoid destructive schema changes unless explicitly approved.
- Provide rollback notes for risky changes.

---

## 9A) Environment Safety
Assume production and shared environments are off-limits unless the user explicitly says otherwise.

Default order of preference:
1. static analysis
2. local / dev validation
3. isolated test environment
4. shared staging (only if explicitly approved)
5. production (never unless explicitly approved and necessary)

Any change affecting auth, DB schema, infra, deployments, background jobs, or external integrations must include a rollback plan before implementation.

---

## 10) Error Handling / Logging Standard (General)
- Do not leak internal stack traces or sensitive details to end users.
- Prefer existing repo patterns. If none exist:
  - Success: `{ "ok": true, "data": ... }`
  - Failure: `{ "ok": false, "error": { "code": "STRING", "message": "Human-readable" } }`
- Log errors with context, never with secrets.

---

## 11) Operational Safety (External Calls / Email / Payments)
- Sensitive operations must be done on trusted / server-side paths when applicable.
- Never trust client / user input for price, role, or permission decisions.
- Add abuse protection (rate limiting / throttling) to public-trigger actions that can be spammed.
- External API calls should have:
  - timeouts
  - safe retries
  - clear error handling
  - no secret leakage in logs

---

## 12) Runtime / Platform Boundaries (General)
- Be careful with platform-specific constraints (server vs client, browser vs backend, edge vs node, mobile vs desktop).
- Do not import server-only modules into client bundles.
- Keep boundaries explicit and follow repo conventions.

---

## 13) Documentation Rules
- If you introduce or modify env vars, update:
  - `.env.example` (or equivalent)
  - README / docs / setup notes
- If you change workflows (deploy / auth / db), document the new steps.

---

## 14) Output Format (When Proposing Changes)
Before `approve to code`, proposals must include:
1. Goal
2. Exact files to change
3. What will be added / removed (high level)
4. Risks + mitigations (including security / data access impacts if relevant)
5. Test plan (commands + manual checks)
6. Copy-paste-ready unified diffs per file (read-only)
7. Whether the proposal delivers a full MVP or only a partial step
8. Any assumptions required to make it end-to-end

---

## 15) Output Format (After Implementation)
After approval and implementation, provide:
- Diff summary
- Exact files changed
- Exact commands executed
- Exact checks executed
- How to test
- Whether any generated files, lockfiles, or artifacts changed
- Whether scope stayed within the approved file list
- Any follow-ups / known limitations
- Out of Scope Findings (if any)

---

## 16) If MVP Cannot Be Completed Safely
If the requested feature cannot be completed end-to-end without expanding scope, adding dependencies, changing schema, changing infra, or making assumptions the user did not approve:

- STOP before implementation
- explain what blocks full MVP completion
- show the smallest additional scope required
- list exact additional files / changes needed
- offer the smallest safe options

Do not quietly deliver a half-wired feature as “done” unless the user explicitly asked for partial implementation.

---

## 17) Preferred Agent Behavior
- Be precise
- Be minimal
- Be reversible
- Be explicit about assumptions
- Finish requested features to MVP level by default
- Do not use “MVP” as an excuse for uncontrolled expansion
- When in doubt, prefer the smallest complete solution