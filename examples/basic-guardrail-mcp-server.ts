/**
 * Example: Basic MCP + x402 Server with Guardrails
 * 
 * This starter shows how to expose a capability as an MCP tool
 * with built-in spending guardrails and x402 payment handling.
 * 
 * Focus: Safety-first (addresses the $47k surprise bill reports)
 */

import express from 'express';
import { MCPTool, createMCPRouter } from './mcp'; // Placeholder for actual MCP SDK patterns

// Simple in-memory guardrail policy (replace with persistent store in prod)
interface GuardrailPolicy {
  maxBudgetPerSession: number;
  maxCallsPerMinute: number;
  circuitBreakerThreshold: number;
}

const defaultPolicy: GuardrailPolicy = {
  maxBudgetPerSession: 10.0,      // $10 per agent session
  maxCallsPerMinute: 30,
  circuitBreakerThreshold: 5,     // e.g. error rate or cost spike
};

// In-memory session tracking (demo only)
const sessionSpending = new Map<string, number>();
const sessionCallTimestamps = new Map<string, number[]>();

function checkGuardrails(sessionId: string, estimatedCost: number, policy = defaultPolicy): { allowed: boolean; reason?: string } {
  const currentSpend = sessionSpending.get(sessionId) || 0;
  if (currentSpend + estimatedCost > policy.maxBudgetPerSession) {
    return { allowed: false, reason: 'Session budget exceeded' };
  }

  const now = Date.now();
  const timestamps = (sessionCallTimestamps.get(sessionId) || []).filter(t => now - t < 60000);
  if (timestamps.length >= policy.maxCallsPerMinute) {
    return { allowed: false, reason: 'Velocity limit reached' };
  }

  // Add current call
  timestamps.push(now);
  sessionCallTimestamps.set(sessionId, timestamps);

  return { allowed: true };
}

function recordSpending(sessionId: string, cost: number) {
  const current = sessionSpending.get(sessionId) || 0;
  sessionSpending.set(sessionId, current + cost);
}

// Example tool: A useful capability (e.g. data enrichment, parsing, etc.)
async function myUsefulTool(input: any, sessionId: string) {
  const estimatedCost = 0.05; // Example cost per call

  const guard = checkGuardrails(sessionId, estimatedCost);
  if (!guard.allowed) {
    throw new Error(`Guardrail blocked: ${guard.reason}`);
  }

  // === Your actual logic here ===
  const result = { processed: true, input, timestamp: new Date().toISOString() };

  recordSpending(sessionId, estimatedCost);

  return result;
}

// Express app with MCP + x402 patterns
const app = express();
app.use(express.json());

// Mount MCP router (simplified - use real MCP SDK in production)
const mcpRouter = createMCPRouter({
  tools: [
    {
      name: 'useful_tool',
      description: 'Performs a valuable transformation or query. Pay-per-use via x402.',
      inputSchema: { /* JSON Schema */ },
      handler: async (params: any, context: any) => {
        const sessionId = context.sessionId || 'default';
        return myUsefulTool(params, sessionId);
      }
    }
  ]
});

app.use('/mcp', mcpRouter);

// x402 payment endpoint example (integrate real x402 middleware)
app.post('/pay-and-execute', async (req, res) => {
  // In real impl: check x402 header or facilitator callback
  // For demo: assume payment verified
  const { sessionId, params } = req.body;
  try {
    const result = await myUsefulTool(params, sessionId);
    res.json({ success: true, result, spend: sessionSpending.get(sessionId) });
  } catch (err: any) {
    res.status(402).json({ error: err.message }); // or appropriate code
  }
});

app.listen(3000, () => {
  console.log('MCP + x402 Guardrail Demo running on port 3000');
  console.log('Guardrails active: budgets + velocity limits');
});

/**
 * Next improvements:
 * - Real x402 header parsing + facilitator integration
 * - Persistent session store (Redis)
 * - Configurable policies per tool/agent
 * - Analytics endpoint
 * - ERC-8004 reputation hook
 */