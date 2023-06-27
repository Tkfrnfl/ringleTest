module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier",
		"prettier/prettier",
		"plugin:prettier/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint", "react-hooks", "prettier"],
	rules: {
		"react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
		"@typescript-eslint/explicit-function-return-type": [
			"warn",
			{
				allowExpressions: true,
			},
		],
		"@typescript-eslint/no-var-requires": 0,
		"react-hooks/rules-of-hooks": "error",
		"react-hooks/exhaustive-deps": "warn",
		"import/extensions": ["off"],
		"react/display-name": "off",
		"react/prop-types": 0,
		"no-var": "warn",
		"prettier/prettier": [
			"warn",
			{
				endOfLine: "auto",
			},
		],
	},
	settings: {
		"import/resolver": {
			typescript: {},
		},
	},
};
