import { describe, it } from 'vitest';
import { RuleTester } from 'eslint';
import rule from '../lib/rules/no-optional-chaining.js';

const ruleTester = new RuleTester({
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module'
  }
});

describe('no-optional-chaining rule', () => {
  it('should disallow all optional chaining by default', () => {
    ruleTester.run('no-optional-chaining (default)', rule, {
      valid: [
        'obj.prop',
        'obj.method()',
        'obj[key]',
        'obj && obj.prop',
        'obj && obj.method()',
        'obj && obj[key]'
      ],
      invalid: [
        {
          code: 'obj?.prop',
          errors: [{ message: 'Optional property access is not allowed.' }]
        },
        {
          code: 'obj?.method?.()',
          errors: [
            { message: 'Optional property access is not allowed.' },
            { message: 'Optional method call is not allowed.' }
          ]
        },
        {
          code: 'obj?.[key]',
          errors: [{ message: 'Optional computed property access is not allowed.' }]
        },
        {
          code: 'deep?.nested?.prop',
          errors: [
            { message: 'Optional property access is not allowed.' },
            { message: 'Optional property access is not allowed.' }
          ]
        }
      ]
    });
  });

  it('should allow configuration to only disallow property access', () => {
    ruleTester.run('no-optional-chaining (property only)', rule, {
      valid: [
        { code: 'obj?.method?.()', options: [{ disallowPropertyAccess: false }] },
        { code: 'obj?.[key]', options: [{ disallowPropertyAccess: false }] }
      ],
      invalid: [
        {
          code: 'obj?.prop',
          options: [{ disallowMethodCall: false, disallowComputedAccess: false }],
          errors: [{ message: 'Optional property access is not allowed.' }]
        }
      ]
    });
  });

  it('should allow configuration to only disallow method calls', () => {
    ruleTester.run('no-optional-chaining (method only)', rule, {
      valid: [
        { code: 'obj?.prop', options: [{ disallowMethodCall: false }] },
        { code: 'obj?.[key]', options: [{ disallowMethodCall: false }] }
      ],
      invalid: [
        {
          code: 'obj?.method?.()',
          options: [{ disallowPropertyAccess: false, disallowComputedAccess: false }],
          errors: [{ message: 'Optional method call is not allowed.' }]
        }
      ]
    });
  });

  it('should allow configuration to only disallow computed access', () => {
    ruleTester.run('no-optional-chaining (computed only)', rule, {
      valid: [
        { code: 'obj?.prop', options: [{ disallowComputedAccess: false }] },
        { code: 'obj?.method?.()', options: [{ disallowComputedAccess: false }] }
      ],
      invalid: [
        {
          code: 'obj?.[key]',
          options: [{ disallowPropertyAccess: false, disallowMethodCall: false }],
          errors: [{ message: 'Optional computed property access is not allowed.' }]
        }
      ]
    });
  });

  it('should allow disabling all checks', () => {
    ruleTester.run('no-optional-chaining (all disabled)', rule, {
      valid: [
        {
          code: 'obj?.prop?.method?.()?.nested?.[key]',
          options: [{
            disallowPropertyAccess: false,
            disallowMethodCall: false,
            disallowComputedAccess: false
          }]
        }
      ],
      invalid: []
    });
  });
});