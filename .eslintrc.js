module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: false,
    },
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
  ],
  rules: {
    'vue/multi-word-component-names': 'off',
    'comma-dangle': [
      'warn',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    semi: 'warn',
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: {
          var: 2,
          let: 2,
          const: 3,
        },
        outerIIFEBody: 'off',
        MemberExpression: 1,
        FunctionDeclaration: {
          body: 1,
          parameters: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
        offsetTernaryExpressions: false,
        flatTernaryExpressions: true,
        ignoreComments: false,
        ignoredNodes: ['PropertyDefinition'], // https://github.com/eslint/eslint/issues/15299
      },
    ],
    quotes: [
      'warn',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'key-spacing': [
      'warn',
      {
        beforeColon: false,
        afterColon: true,
      },
    ],
    'brace-style': 'warn',
    'object-curly-spacing': ['warn', 'always'],
    'no-trailing-spaces': 'warn',
    'space-unary-ops': [
      'warn',
      {
        words: true,
        nonwords: false,
      },
    ],
    'no-useless-escape': 'warn',
  },
};
