module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: {
        mode: ["react-component"],
        react: { root: "content bsa-margin" },
      },
    });
    return cfg;
  },
};
