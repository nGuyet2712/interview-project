module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testRegex: "tests/.*\\.test\\.(ts|tsx)$",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.{ts,tsx}",
    "src/layouts/**/*.{ts,tsx}",
    "src/pages/**/*.{ts,tsx}",
    "src/services/**/*.{ts,tsx}",
  ],
};
