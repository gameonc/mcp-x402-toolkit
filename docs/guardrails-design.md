# Guardrails Design (Priority Feature)

## Why Guardrails First?

Community feedback shows this is the most immediate pain:
- Agents (and their operators) are getting hit with unexpectedly large bills.
- One reported case reached $47k before controls kicked in.
- Builders want enforceable limits without killing usefulness.

## Core Guardrail Features (v0.1)

- **Session Budgets**: Max spend per agent session or time window
- **Velocity Limits**: Max calls per minute / hour to prevent runaway loops
- **Circuit Breakers**: Auto-pause on error spikes, cost anomalies, or policy violations
- **Spending Analytics**: Endpoint to query current usage and history
- **Configurable Policies**: Simple JSON or code-based rules per tool or per caller
- **Graceful Degradation**: Clear error messages agents can reason about and recover from

## Implementation Notes

- Start in-memory for fast iteration, move to Redis/Postgres for production
- Log all guardrail triggers for auditing
- Support both soft warnings and hard blocks
- Future: On-chain policy enforcement hooks (ERC-8004 or custom)

This module is designed to be dropped into any MCP server or x402 endpoint.