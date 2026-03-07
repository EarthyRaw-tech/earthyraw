# AGENTS.md
# Enterprise Engineering Standard (Mandatory) — Any Project / Any Stack

This repo is maintained under strict change-control. All agents must follow these rules.

---

## 0) Approval Gate (MANDATORY)
- Do not make file/code changes unless the user explicitly says:
  **"approve to code"**
- Do not perform Git actions unless the user explicitly says:
  **"giteo"**
- If the user says **"giteo approve to code"**, both Git and code actions are authorized.
- Close variants count only if the user’s intent is unmistakable.
- If uncertainty affects safety, scope, or correctness, ask before proceeding.

**“Changes” include** anything that alters local or remote state, including but not limited to:
- editing / creating / deleting files
- installing / upgrading / removing dependencies
- running commands that write files, caches, artifacts, generated code, lockfiles, snapshots, fixtures, coverage, temp files, or outputs
- changing database state (migrations, seeds, resets, admin edits)
- changing infrastructure / config / env / CI / deploy settings
- triggering deploys, syncs, background jobs, webhooks, billing, email/SMS, or other side effects

Before approval, you may only:
- inspect / read / analyze
- ask clarifying questions only when truly required
- propose a plan
- provide the exact file list
- provide risks, assumptions, and test steps
- provide copy-paste-ready unified diffs in read-only form
- report out-of-scope findings without fixing them

---

## 0A) Read-Only Means Truly Read-Only
Before approval, do not create, modify, or delete:
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

Disallowed before approval includes, even if commonly treated as harmless:
- `npm install`, `pnpm install`, `yarn`, `bun install`
- `next build`, `vite build`, `tsc`, `prisma generate`
- `eslint --fix`, `prettier --write`
- snapshot updates
- scaffolding / code generators
- migrations / seeds / resets
- commands that create `.next`, `dist`, `build`, `coverage`, `.turbo`, temp caches, or generated clients

Do not use side channels to bypass approval:
- no repo-adjacent docs/artifacts/canvases as substitute changes
- no CI/CD, deploys, migrations, webhooks, syncs, background jobs
- no changes to tickets, docs, wikis, boards, calendars, email, or connected tools unless explicitly requested

---

## 1) Scope Control (No Surprises)
- Default to the **smallest complete change** that achieves the requested outcome.
- Do not make unrelated refactors, renames, reorganizations, reformatting, cleanup, dependency changes, schema changes, config changes, or opportunistic fixes unless explicitly approved.
- Prefer existing repo conventions and patterns.
- Avoid changing behavior outside the stated task scope.
- Avoid broad formatting or linting across unrelated files.

If broader change is truly required, **pause** and state:
1. why it is required  
2. the smallest additional scope needed  
3. the exact additional files  
4. risks / tradeoffs  
5. whether the task can still be truthfully marked complete without it

Unrelated issues must be listed under **Out of Scope Findings** and not fixed without approval.

---

## 1A) File List Freeze
Before approval, the agent must provide the exact file list it intends to modify.

After approval, the agent must not modify files outside that list unless the user explicitly approves the expanded file list.

Approval to code is approval only for the specifically proposed scope, not for:
- extra refactors
- dependency or tooling changes
- schema changes
- config / env changes
- unrelated fixes
- broad formatting
- cleanup outside the approved task

---

## 1B) Required Fix Classification (MANDATORY)
If the agent discovers an issue during approved work, it must classify it into exactly one category:

### A) Blocking Required Fix
A fix is **Blocking Required** if leaving it unresolved would cause or materially risk:
- build failure
- runtime failure
- broken user flow
- deploy failure
- incorrect behavior in the approved feature
- data corruption
- weakened security posture
- broken required integration / routing / access
- required config mismatch that prevents the feature from working
- SEO/indexing breakage when the approved task is SEO-related

For Blocking Required Fixes, the agent must:
- stop and report the issue clearly
- explain why it is required
- list the exact files that must be added to scope
- request approval before changing those files
- not describe the task as fully complete while the issue remains unresolved

### B) Strongly Recommended Follow-Up
A fix is **Strongly Recommended** if the approved work still functions, but quality is materially reduced.

Examples:
- degraded SEO without complete indexing failure
- degraded performance
- accessibility weakness
- inconsistent UX
- fragile maintainability
- missing non-critical validation
- weaker caching / rendering strategy

The agent must:
- finish the approved scope if possible
- include the finding in the completion report
- state impact, risk, and likely files affected
- explicitly say it was not changed because it was outside approved scope

### C) Optional Improvement
A fix is **Optional** if it is useful but not required for correctness, safety, deploy success, or MVP completion.

Examples:
- cosmetic cleanup
- readability refactor
- dead code removal that does not affect behavior
- speculative optimization

Optional items must be listed separately and not presented as required work.

---

## 2) Project Assumptions
- Follow existing project conventions for architecture, naming, folder structure, patterns, error handling, and logging.
- Do not change core technology choices (language / framework / DB / auth / deploy) without explicit instruction.
- If uncertainty affects safety, scope, security, or correctness, ask before proceeding.
- Otherwise, make the smallest reasonable assumption, state it explicitly, and continue within scope.

---

## 2A) MVP Completeness Rule (Default Delivery Standard)
Unless the user explicitly asks for a partial step, prototype, draft, scaffold, or UI-only work, the default expectation is a **working MVP for the requested feature**.

That means the requested feature should be implemented **end-to-end within the approved scope**.

For most feature work, MVP means:
- the user-facing entry point exists
- the main action works
- expected states are handled
- the happy path works
- basic failure states are handled
- the feature integrates with existing auth / data / routing conventions where relevant
- it can be manually tested end-to-end

MVP applies only to the **requested feature**, not adjacent features.

MVP does **not** automatically include:
- advanced analytics
- broad refactors
- redesigns
- speculative abstractions
- extra roles or features not requested
- broad test expansion beyond repo norms
- production hardening outside the requested scope unless required for safety or security

If true MVP requires additional files, dependencies, schema changes, or configuration beyond the approved scope, stop and request approval before proceeding.

Do not quietly deliver a half-wired feature as “done” unless the user explicitly asked for partial work.

---

## 3) Work / Branch Workflow (If Using Git)

### Git Execution Policy (MANDATORY)
- The agent may recommend Git commands and explain them.
- The agent may execute Git commands only if the user explicitly says:
  **"giteo"**
- Without **"giteo"**, no commit / push / merge / rebase / tag / branch manipulation may be performed.
- **"giteo"** does not authorize file/code changes by itself.
- **"giteo approve to code"** authorizes both Git and code actions.

### Default Branch Model (adjust to repo reality)
- `main` / `master` = stable / production-ready only
- `dev` = integration branch
- `feature/*` = isolated work

### Rules
- Never work directly on `main/master`
- Normal work happens on `feature/*` branches from `dev`
- `main/master` is updated only from `dev` after verification

### Recommended Commands (User Executes, or Agent with `giteo`)
**Update main/master**
- `git fetch origin`
- `git switch main` (or `master`)
- `git pull --ff-only`

**Update dev from main/master**
- `git switch dev`
- `git pull --ff-only`
- `git merge origin/main` (or `origin/master`)

**Create feature branch**
- `git switch dev`
- `git pull --ff-only`
- `git switch -c feature/<short-name>`
- `git push -u origin feature/<short-name>`

**Merge feature → dev**
- `git switch dev`
- `git pull --ff-only`
- `git merge --no-ff feature/<short-name>`
- `git push`

**Merge dev → main/master**
- `git switch main` (or `master`)
- `git pull --ff-only`
- `git merge --ff-only dev`
- `git push`

If the repo does not use Git, keep changes isolated, reversible, and clearly reported in the completion report.

---

## 4) Commit / PR Discipline
- Use clear, reviewable commits
- Prefer Conventional Commits:
  - `feat:`
  - `fix:`
  - `chore:`
  - `refactor:`
  - `docs:`
  - `test:`
- `wip:` is allowed only on `feature/*`
- Do not mix unrelated topics in one commit unless explicitly approved

Every PR / change set must include:
- summary
- rationale
- test plan
- risk / rollback notes if applicable
- out-of-scope findings if any

---

## 5) Definition of Done
A task is DONE only when:
- no unresolved **Blocking Required Fix** remains
- builds / compiles successfully, if safe and in scope
- tests pass, if present and safe to run
- lint / format checks pass, if present and safe to run
- no secrets are exposed
- security posture is not weakened
- docs are updated if behavior / config / env changed
- changes are minimal, scoped, and reversible
- the requested feature is complete at MVP level unless the user explicitly requested partial work

---

## 5A) Final Status Labels (MANDATORY)
Every implementation must end with exactly one status:

- **COMPLETE**
- **COMPLETE WITH REQUIRED FOLLOW-UP APPROVAL**
- **PARTIAL**
- **BLOCKED**

Definitions:
- **COMPLETE** = approved scope finished, validation reported, and no Blocking Required Fix remains
- **COMPLETE WITH REQUIRED FOLLOW-UP APPROVAL** = approved scope finished, but a dependent required fix still needs approval before the work can be truthfully considered fully complete
- **PARTIAL** = some approved scope was not completed, or the user explicitly requested partial work
- **BLOCKED** = the task cannot proceed safely or correctly without more approval, information, or access

If any Blocking Required Fix remains unresolved, the result must not be labeled **COMPLETE**.

---

## 6) Validation Rules
Run or ensure equivalent checks using the project’s existing tooling, as appropriate:
- build / compile
- lint / format check (non-destructive unless approved)
- unit / integration / e2e tests
- static analysis / type checks
- migration / validation checks if applicable

Prefer non-destructive validation first.

Do not run commands against:
- production
- shared databases
- live third-party services
- billing systems
- email / SMS providers
- irreversible external systems

unless the user explicitly approved that exact validation step.

If any relevant check fails:
- stop and report the failure, likely root cause, and fix plan

If any relevant check was not run, the completion report must state:
- which check was not run
- why it was not run
- what risk remains because it was not run

---

## 7) Security / Data / Environment Safety
- Never commit, expose, or log secrets
- Use environment variables or secret managers
- If a secret is exposed, treat it as compromised and rotate it
- Do not weaken authentication, authorization, validation, RLS, ACLs, or permissions
- Avoid destructive schema changes unless explicitly approved
- Capture schema changes as migrations when the repo uses migrations
- Assume production and shared environments are off-limits unless explicitly approved
- Any change affecting auth, DB schema, infra, deployments, background jobs, or external integrations must include rollback notes before implementation
- Sensitive operations should stay on trusted/server-side paths when applicable
- Never trust client input for price, role, or permission decisions
- Public-trigger actions that can be abused should include protection such as throttling / rate limiting when relevant
- External API calls should have timeouts, safe retries, clear error handling, and no secret leakage

---

## 8) Dependency / Tooling Management
- Avoid adding, removing, or upgrading dependencies unless explicitly needed
- Avoid switching package managers, build systems, or core tooling unless explicitly instructed
- If a dependency is necessary:
  - justify it
  - keep it minimal
  - prefer maintained libraries
  - update lockfiles only if dependency state actually changed

If no dependency was intentionally changed, lockfiles must not change.

If a lockfile changes unexpectedly, stop and report why before proceeding.

---

## 9) Runtime / Platform Boundaries
- Respect server/client, browser/backend, edge/node, and platform-specific constraints
- Do not import server-only modules into client bundles
- Keep boundaries explicit and consistent with repo conventions

---

## 10) Documentation Rules
If you add or modify env vars, workflows, auth, DB behavior, deploy behavior, or setup steps, update the relevant documentation, such as:
- `.env.example`
- README
- setup / operations notes

---

## 11) Proposal Format (Before `approve to code`)
Before approval, proposals must include:
1. Goal
2. Exact files to change
3. High-level summary of what will be added / removed
4. Risks + mitigations
5. Test plan
6. Copy-paste-ready unified diffs per file (read-only)
7. Whether the proposal delivers full MVP or partial work
8. Assumptions required to make it end-to-end

---

## 12) Completion Report (After Implementation) — MANDATORY
After approval and implementation, provide:

1. **Final Status Label**
2. **What Was Completed**
3. **Exact Files Changed**
4. **Exact Commands Executed**
5. **Exact Checks Executed**
6. **Checks Not Run + Why**
7. **Blocking Required Fixes Not Done**
8. **Strongly Recommended Follow-Ups**
9. **Optional Improvements**
10. **Out of Scope Findings**
11. **Risks / Assumptions**
12. **How to Test**
13. **Rollback Notes** (if applicable)
14. **Whether generated files, lockfiles, or artifacts changed**
15. **Whether scope stayed within the approved file list**

Rules:
- If a section has no items, say `None`
- Do not hide blocking issues under “known limitations” or “out of scope”
- Do not label the task **COMPLETE** if `Blocking Required Fixes Not Done` is not `None`

---

## 13) Preferred Agent Behavior
- Be precise
- Be minimal
- Be reversible
- Be explicit about assumptions
- Finish requested features to MVP level by default
- Do not use “MVP” as an excuse for uncontrolled expansion
- When in doubt, prefer the smallest complete solution
- Never silently omit a required fix discovered during implementation