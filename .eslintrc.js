module.exports = {
  extends: ["plugin:react-app/recommended", "airbnb"],
  env: {
    node: true,
    browser: true
  },
  rules: {
    "max-len": ["error", { code: 120 }],
    semi: ["error", "never"],
    "comma-dangle": ["error", "always-multiline"],
    "arrow-parens": ["error", "always"],
    "object-curly-newline": "off",
    "spaced-comment": "off",
    "no-unused-expressions": ["error", { allowTaggedTemplates: true }],
    "react-app/jsx-a11y/href-no-hash": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
    "react/jsx-filename-extension": ["error", { extensions: [".js"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off"
  },
  settings: {
    "import/resolver": {
      node: {
        paths: ["src"]
      }
    }
  }
};
