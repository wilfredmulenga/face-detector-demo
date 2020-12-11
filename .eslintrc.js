module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['standard'],
  plugins: ['react', 'react-native'],
  rules: {
    'react/jsx-uses-vars': 2,
    'react/jsx-uses-react': 1,
    'no-undef': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/no-color-literals': 2,
    'comma-dangle': 'warn'
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      js: true
    }
  }
}
