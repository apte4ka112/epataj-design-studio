import withNuxt from './.nuxt/eslint.config.mjs'
import stylistic from '@stylistic/eslint-plugin'

export default withNuxt(
  stylistic.configs.customize({
    commaDangle: 'never',
    braceStyle: '1tbs'
  }),
  {
    files: ['**/*.ts', '**/*.js', '**/*.vue'],
    rules: {
      // 'no-console': 'off',
      'import/no-named-as-default-member': 'off',
      'no-empty': ['error', { allowEmptyCatch: true }],

      'vue/no-v-html': 'warn',
      'vue/no-multiple-template-root': 'off',
      'vue/multi-word-component-names': 'off',
      'nuxt/prefer-import-meta': 'off',

      '@typescript-eslint/no-explicit-any': 'off', // TODO: remove rule and fix errors
      '@typescript-eslint/ban-ts-comment': 'off',

      '@stylistic/max-statements-per-line': 'off',
      '@stylistic/quote-props': 'off',
      '@stylistic/space-before-function-paren': ['warn', {
        anonymous: 'always',
        named: 'always',
        asyncArrow: 'always'
      }],
      '@stylistic/operator-linebreak': ['error', 'after', {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }]
    },
    ignores: [
      'assets'
    ]
  }
)
