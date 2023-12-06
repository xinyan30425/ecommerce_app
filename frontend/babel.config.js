module.exports = {
    presets: [
      [
        "@babel/preset-env",
        {
          // Targets the current version of Node
          targets: {
            node: 'current',
          },
          // Use this to enable transformation of newer syntax to older ones
          useBuiltIns: "usage",
          corejs: 3, // or a version you have installed in your project
        },
      ],
      // Add other presets here if you use them, like '@babel/preset-react' for React
    ],
    plugins: [
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-private-methods",
      // Add other plugins here as needed
    ],
  };
  