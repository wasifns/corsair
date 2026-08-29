import { OpenAIAgentsProvider } from '@corsair-dev/mcp';
import { Agent, tool } from '@openai/agents';
import { corsair } from '../corsair';
import { createLlmRunner, getChatModel } from '../llm';

// Configuration constants
const TENANT_ID = 'dev';
const AGENT_NAME = 'corsair-agent';
const AGENT_PROMPT = 'You are a helpful assistant with access to the Corsair MCP.';
const TASK_PROMPT = 'list all slack channels and send test message to sdk-test channel';

// Initialize MCP tools provider
const provider = new OpenAIAgentsProvider();
const tools = provider.build({
  corsair: corsair.withTenant(TENANT_ID),
  tool,
  runOptions: { readonly: true },
});

// Configure the agent instance
const agent = new Agent({
  name: AGENT_NAME,
  model: getChatModel(),
  instructions: AGENT_PROMPT,
  tools,
});

// Execute the workflow runner
const runner = createLlmRunner();
const { finalOutput } = await runner.run(agent, TASK_PROMPT);

console.log(finalOutput);