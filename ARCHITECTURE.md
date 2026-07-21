# Architecture & Design Principles

## Core Goals
- Make it trivial and safe for developers to turn any useful capability into an agent-payable MCP endpoint.
- Prioritize spending safety (guardrails) because this is the #1 immediate pain reported by builders.
- Enable deterministic, verifiable outputs.
- Support the full loop: Discovery (MCP) → Negotiation/Payment (x402) → Execution → Verification → Settlement.

## Key Components (Planned)

### 1. MCP + x402 Wrapper
- Takes an existing function/API and exposes it via MCP schema.
- Automatically handles 402 Payment Required responses.
- Integrates spending policy engine (budgets per session/agent, velocity, hard limits, circuit breakers).
- Returns structured, machine-legible results.

### 2. Guardrail Engine (Priority #1)
- Per-session and per-agent budgets
- Velocity limits (calls per minute/hour)
- Automatic circuit breakers on anomalies
- Spending analytics endpoint
- Configurable via simple policy objects or environment
- Blocks or warns before expensive operations

### 3. Verification Layer (Next)
- Optional post-execution sanity checks (schema validation, sandbox execution, cross-checks)
- Integration hooks for ERC-8004 reputation or custom verifiers
- Only release payment or mark complete after verification passes

### 4. Discovery-Friendly Design
- Rich MCP tool descriptions and examples
- Consistent metadata for registries/directories
- Support for capability tagging and semantic search friendliness

## Tech Stack (Initial)
- TypeScript / Node.js (Fastify or Express for speed + great DX)
- MCP SDK patterns (following official spec)
- x402 reference integration patterns (Coinbase facilitator friendly)
- Simple policy engine for guardrails (can be extended to on-chain later)

## Non-Goals (for v0.x)
- Building a full hosted marketplace or directory (focus on the endpoints themselves)
- Heavy frontend or dashboard (keep it backend-first and composable)
- Solving full multi-agent orchestration (focus on single high-quality payable tools)

## Security & Reliability Principles
- Fail closed on payment/guardrail violations
- Structured error responses agents can reason about
- No hidden costs or surprise charges
- Audit-friendly logging (especially for guardrail triggers)

This architecture directly addresses the gaps voiced in current agent builder discussions: safety controls, trustworthy endpoints, and reduced friction for shipping production tools.