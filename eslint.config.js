import agentConfig from 'eslint-config-agent';

export default [
  ...agentConfig,
  {
    ignores: ['node_modules/**', 'coverage/**']
  }
];