<!-- coderabbit-ai-generated:v1 -->

# Working on USEIT

USEIT is the consumer visual-assistance and product-discovery app. Start with the affected implementation and tests. For mobile changes run the repository typecheck, tests and source boundary guard. See [the release register](../docs/RELEASE-REGISTER.md) for the current platform and staging checks.

Use synthetic fixtures for photos, tokens, attestation evidence and product data. Never include real customer images, secrets or session credentials in test cases, logs or PR descriptions.

Keep platform attestation, server-side cost limits, remote URL validation and TLS checks intact. Cloud Run uses shared Firestore state; the existing Redis deployment has its own migration requirements. Change dependency versions within the supported Expo and backend compatibility ranges, and keep the lockfiles synchronized.

Record the tested commit and distinguish local results from hosted checks and physical device acceptance. Preserve required review and release gates.