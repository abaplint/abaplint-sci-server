module.exports = {
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  testPathIgnorePatterns: ["node_modules", "build"],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ]
};
