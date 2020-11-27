const md = require("./lib/markdownConfig");

module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: {
          markdown: (body) => {
            return md.render(body);
          },
        },
      },
      {
        test: /\.svg$/,
        issuer: {
          test: /\.(js|ts)x?$/,
        },
        use: ["@svgr/webpack"],
      }
    );
    return cfg;
  },
};
