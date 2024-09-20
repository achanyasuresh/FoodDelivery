export default {
    transform: {
      "^.+\\.jsx?$": "babel-jest",  // Handle JSX
      "^.+\\.tsx?$": "babel-jest",  // Handle TypeScript if applicable
    },
    testEnvironment: "jsdom",
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS modules
        "\\.(jpg|jpeg|png|gif|svg|webp|ico)$": "jest-transform-stub", // Mock image files
      },
      setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],

  };
  