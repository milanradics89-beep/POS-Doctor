# Copilot instructions for USEIT / POS-Doctor

## Mission
Make small, reviewable, production-safe changes. Prefer fixing the underlying cause over adding workarounds. Treat this repository as a security-sensitive payment-terminal operations product.

## Before changing code
- Read the relevant implementation, tests, package manifests, and nearby documentation first.
- Check the current branch and working tree. Do not assume an issue or pull request description still matches the code.
- Identify the smallest safe scope and state the intended behavior before editing.
- Do not upgrade Expo, React Native, Android Gradle, Python, or other major dependencies unless the task explicitly requires it and compatibility is verified.

## Repository conventions
- The mobile application is Expo / React Native with Expo Router, TypeScript, and Vitest.
- Use the existing project scripts: `npm run typecheck`, `npm test -- --passWithNoTests`, and `npm run guard:useit`.
- Follow existing component, navigation, state-management, API, validation, and test patterns. Avoid introducing new dependencies for trivial functionality.
- Keep UI changes consistent with the established USEIT design language: warm off-white, graphite, and lime; accessible contrast; clear loading, empty, error, and success states.
- Keep platform-specific behavior explicit. Do not claim Android or iOS validation from TypeScript/unit tests alone.

## Security and privacy
- Never log, expose, commit, or place secrets, tokens, credentials, personal data, PAN, track data, PIN data, or terminal identifiers in examples or tests.
- Validate all untrusted input at trust boundaries. Use parameterized database access and safe output handling.
- For outbound URL fetching, defend against SSRF and DNS rebinding: validate every redirect hop, reject non-public destinations, pin the connection to the validated IP, preserve the original Host and TLS SNI, and retain connected-peer verification.
- Do not weaken authentication, authorization, rate limiting, TLS validation, audit logging, or security headers to make tests pass.
- Production rate limiting must use the approved shared Redis-backed mechanism. In-memory fallbacks are for local development and tests only unless an explicit architecture decision says otherwise.
- Minimize permissions in GitHub Actions. Pin third-party actions to immutable commit SHAs where the repository already follows that convention.

## Tests and evidence
- Add or update focused regression tests for every bug fix.
- Run the narrowest relevant tests first, then typecheck and the broader suite when feasible.
- For dependency changes, update the lockfile reproducibly and inspect the resulting diff.
- Report exact commands and outcomes. Clearly label tests not run, flaky tests, and environment limitations. Never describe a check as passing unless its result is observed.
- CI must validate the exact proposed commit. A green parent commit does not validate a later child commit.

## Git and pull requests
- Work on a dedicated topic branch. Never commit directly to `main`.
- Keep commits focused and messages descriptive. Do not force-push or rewrite shared history unless explicitly requested.
- Open a pull request with a concise summary, risk assessment, test evidence, and rollback notes where relevant.
- Never merge automatically, bypass required checks, reduce branch protection, or approve your own changes.
- Preserve human approval and release acceptance gates. A successful CI run is not production approval.

## Agent behavior
- If a task is broad, split it into independent, non-overlapping work packages and list dependencies.
- Do not edit files owned by another active work package without coordinating first.
- Review the final diff for unrelated changes, generated files, secrets, and missing tests.
- If repository evidence is insufficient, ask for the missing detail rather than inventing architecture or claiming completion.
