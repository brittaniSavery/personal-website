/* eslint @typescript-eslint/no-var-requires: "off" */
const md = require("markdown-it")({
  html: true,
  xhtmlOut: true,
});
const mdAttrs = require("markdown-it-attrs");

const mdPrism = require("markdown-it-prism");
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-jsx");

const mdEmoji = require("markdown-it-emoji/bare");
const emojiDefinitions = require("./lib/emoji-definitions");
const emojiShortcuts = require("./lib/emoji-shortcuts");

module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push(
      {
        test: /\.md$/,
        loader: "frontmatter-markdown-loader",
        options: {
          markdown: (body) => {
            const emojiConfig = {
              defs: emojiDefinitions,
              shortcuts: emojiShortcuts,
              enabled: [],
            };

            md.use(mdEmoji, emojiConfig).use(mdAttrs).use(mdPrism);

            //change emoji rendering
            md.renderer.rules.emoji = function (tokens, idx) {
              return (
                '<span class="iconify" data-icon="' +
                tokens[idx].content +
                '"></span>'
              );
            };

            //add target "_blank" to all outside links
            const defaultLinkRender =
              md.renderer.rules.link_open ||
              function (tokens, idx, options, env, self) {
                return self.renderToken(tokens, idx, options);
              };

            md.renderer.rules.link_open = function (
              tokens,
              idx,
              options,
              env,
              self
            ) {
              const hrefIdnex = tokens[idx].attrIndex("href");
              const url = tokens[idx].attrs[hrefIdnex][1];

              if (/^https?/.test(url)) {
                tokens[idx].attrPush(["target", "_blank"]);
              }

              // pass token to default renderer.
              return defaultLinkRender(tokens, idx, options, env, self);
            };

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
