/* eslint @typescript-eslint/no-var-requires: "off" */
const md = require("markdown-it")({
  html: true,
  xhtmlOut: true,
});
const mdAttrs = require("markdown-it-attrs");

const mdPrism = require("markdown-it-prism");
require("prismjs/components/prism-jsx");
require("prismjs/components/prism-jsx");

const mdEmoji = require("markdown-it-emoji/bare");
const emojiDefinitions = require("./lib/emoji-definitions");
const emojiShortcuts = require("./lib/emoji-shortcuts");

module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
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

          return md.render(body);
        },
      },
    });
    return cfg;
  },
};
