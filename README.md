# eslint-plugin-no-optional-chaining

ESLint plugin to disallow optional chaining operator (`?.`) with granular configuration options.

## Installation

```bash
npm install eslint-plugin-no-optional-chaining --save-dev
# or
pnpm add eslint-plugin-no-optional-chaining --save-dev
```

## Usage

Add to your ESLint configuration:

```js
// eslint.config.js
import noOptionalChaining from 'eslint-plugin-no-optional-chaining';

export default [
  {
    plugins: {
      'no-optional-chaining': noOptionalChaining
    },
    rules: {
      'no-optional-chaining/no-optional-chaining': 'error'
    }
  }
];
```

Or use the recommended configuration:

```js
// eslint.config.js
import noOptionalChaining from 'eslint-plugin-no-optional-chaining';

export default [
  noOptionalChaining.configs.recommended
];
```

## Rules

### `no-optional-chaining`

Disallows the use of optional chaining (`?.`) operator with configurable options.

#### Options

The rule accepts an options object with the following properties (all default to `true`):

- `disallowPropertyAccess` (boolean): Disallow optional property access (`obj?.prop`)
- `disallowMethodCall` (boolean): Disallow optional method calls (`obj?.method?.()`)
- `disallowComputedAccess` (boolean): Disallow optional computed property access (`obj?.[key]`)

#### Configuration Examples

**Default behavior (disallow all optional chaining):**
```js
{
  "no-optional-chaining/no-optional-chaining": "error"
}
```

**Only disallow property access:**
```js
{
  "no-optional-chaining/no-optional-chaining": ["error", {
    "disallowPropertyAccess": true,
    "disallowMethodCall": false,
    "disallowComputedAccess": false
  }]
}
```

**Only disallow method calls:**
```js
{
  "no-optional-chaining/no-optional-chaining": ["error", {
    "disallowPropertyAccess": false,
    "disallowMethodCall": true,
    "disallowComputedAccess": false
  }]
}
```

**Only disallow computed access:**
```js
{
  "no-optional-chaining/no-optional-chaining": ["error", {
    "disallowPropertyAccess": false,
    "disallowMethodCall": false,
    "disallowComputedAccess": true
  }]
}
```

#### Examples

**❌ Incorrect (default configuration):**
```js
obj?.prop                    // Optional property access
obj?.method?.()              // Optional method call
obj?.[key]                   // Optional computed access
deep?.nested?.prop           // Chained optional access
```

**✅ Correct:**
```js
obj.prop
obj.method()
obj[key]
obj && obj.prop
obj && obj.method && obj.method()
deep && deep.nested && deep.nested.prop
```

**✅ Correct (with `disallowPropertyAccess: false`):**
```js
obj?.prop                    // Now allowed
obj?.nested?.prop            // Now allowed
```

**✅ Correct (with `disallowMethodCall: false`):**
```js
obj?.method?.()              // Now allowed
```

**✅ Correct (with `disallowComputedAccess: false`):**
```js
obj?.[key]                   // Now allowed
obj?.[dynamicKey]?.value     // Now allowed
```

## Why Use This Plugin?

This plugin is useful when:

- Working with older JavaScript environments that don't support optional chaining
- Maintaining consistency across codebases with mixed support
- Enforcing explicit null/undefined checks for better code clarity
- Gradually migrating codebases by allowing specific patterns while restricting others

## License

MIT