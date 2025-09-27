export default {
  meta: {
    type: 'problem',
    docs: {
      description: 'disallow optional chaining',
      category: 'Possible Errors',
      recommended: true
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        properties: {
          disallowPropertyAccess: {
            type: 'boolean',
            default: true
          },
          disallowMethodCall: {
            type: 'boolean',
            default: true
          },
          disallowComputedAccess: {
            type: 'boolean',
            default: true
          }
        },
        additionalProperties: false
      }
    ]
  },

  create(context) {
    const options = context.options[0] || {};
    const disallowPropertyAccess = options.disallowPropertyAccess !== false;
    const disallowMethodCall = options.disallowMethodCall !== false;
    const disallowComputedAccess = options.disallowComputedAccess !== false;

    return {
      ChainExpression(node) {
        const { expression } = node;

        function checkNode(currentNode) {
          if (currentNode.type === 'MemberExpression' && currentNode.optional) {
            if (currentNode.computed && disallowComputedAccess) {
              context.report({
                node: currentNode,
                message: 'Optional computed property access is not allowed.'
              });
            } else if (!currentNode.computed && disallowPropertyAccess) {
              context.report({
                node: currentNode,
                message: 'Optional property access is not allowed.'
              });
            }
          } else if (currentNode.type === 'CallExpression' && currentNode.optional && disallowMethodCall) {
            context.report({
              node: currentNode,
              message: 'Optional method call is not allowed.'
            });
          }

          if (currentNode.type === 'MemberExpression') {
            checkNode(currentNode.object);
          } else if (currentNode.type === 'CallExpression') {
            checkNode(currentNode.callee);
          }
        }

        checkNode(expression);
      }
    };
  }
};