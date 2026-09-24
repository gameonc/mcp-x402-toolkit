# MCP + x402 design study

**Status: non-runnable architecture sketch. Not a released SDK or production payment service.**

This repository explores tool discovery, spending limits and payment boundaries for AI agents. It contains design notes and illustrative TypeScript only. There is no published package, dependency manifest, implemented MCP router, verified payment integration, persistent budget ledger, or runnable test suite here.

The example imports a missing `./mcp` module and assumes payment verification. Its in-memory limits are not security controls for real spending. Do not deploy it or send money through it.

## Read the design

- [Architecture](ARCHITECTURE.md)
- [Guardrail design](docs/guardrails-design.md)
- [Illustrative code](examples/basic-guardrail-mcp-server.ts)

## Implementation requirements

Before claiming a working toolkit: use current protocol SDKs; authenticate callers; verify payment server-side; reserve budgets atomically; handle replay and concurrent requests; persist accounting; constrain credentials; and test refusal, timeout, restart, and reconciliation paths. None of those requirements is certified by this repository.

This is a design reference, not a runnable portfolio demonstration.
