# MCP + x402 Toolkit

**Production-grade, safe infrastructure for building agent-discoverable and payable tools.**

The agent economy is moving fast with MCP (Model Context Protocol) for tool discovery and x402 for frictionless micropayments. However, builders are hitting real friction:

- Surprise high bills and lack of spending guardrails
- Difficulty shipping high-quality, trustworthy MCP + x402 endpoints
- Weak discovery and trust signals for agents

This toolkit exists to solve those problems. It makes it easy and safe to expose your APIs, data, or capabilities as MCP servers with built-in x402 payments and strong safety controls.

## Why This Matters Now

From active discussions in the agent builder community (X, Reddit r/AI_Agents, etc.):
- **Guardrails are urgent**: Multiple reports of surprise bills (one case hit $47k). Agents need budget limits, velocity controls, and circuit breakers.
- **Quality endpoints are scarce**: The protocol is ready, but there aren't enough reliable, production-grade tools agents can trust and pay for.
- **Discovery & verification lag**: Finding the right MCP server and trusting its output before payment is still painful.

We are building the practical "picks and shovels" so more high-signal tools can come online quickly and safely.

## What This Toolkit Provides

- Clean, reusable MCP + x402 wrapper patterns
- First-class spending guardrails (budgets, velocity limits, circuit breakers, analytics)
- Well-structured MCP schemas optimized for agent discovery
- Security best practices and deterministic response design
- Examples and testing harnesses
- Optional verification/sanity gate patterns
- Easy integration with existing APIs or internal tools

## Quick Start (Planned)

```bash
npm install @mcp-x402/toolkit
```

See `examples/` for ready-to-run starters with guardrails enabled by default.

## Current Focus (v0.1)

1. Guardrails-first MCP + x402 wrapper (highest community pain)
2. Clean, discoverable schemas
3. Production-ready examples

Next: Lightweight verification nodes, discovery helpers, and hardware bridge patterns.

## Philosophy

- No fancy frontends. Clean OpenAPI + MCP schemas + low-latency backends.
- Safety first: Guardrails and verification before money moves.
- Deterministic and reliable outputs (agents hate surprises).
- General purpose: Useful for any API, data source, or capability.

## Contributing

This is early. Feedback, issues, and PRs welcome. The goal is infrastructure the agent economy actually needs.

Built with respect for the standards (MCP from Anthropic, x402 from Coinbase + ecosystem).

---

**Let's build the rails agents will actually use.**