const md = require("./lib/markdownConfig");

module.exports = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.md$/,
        use: [
          {
            loader: "frontmatter-markdown-loader",
            options: {
              markdown: (body) => {
                return md.render(body);
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        issuer: /\.(js|ts)x?$/,
        use: ["@svgr/webpack"],
      }
    );
    return config;
  },
  images: {
    domains: ["via.placeholder.com"],
  },
};
