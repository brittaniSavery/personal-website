/* eslint @typescript-eslint/no-var-requires: "off" */
const md = require("markdown-it")({ html: true, xhtmlOut: true });
const mdEmoji = require("markdown-it-emoji/bare");
const mdFootnote = require("markdown-it-footnote");
const mdAttrs = require("markdown-it-attrs");
const emojiDefinitions = require("./lib/emoji-definitions");
const emojiShortcuts = require("./lib/emoji-shortcuts");

module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: {
        mode: ["react-component"],
        react: { root: "content bsa-margin" },
        markdown: (body) => {
          md.use(mdEmoji, {
            defs: emojiDefinitions,
            shortcuts: emojiShortcuts,
            enabled: [],
          })
            .use(mdFootnote)
            .use(mdAttrs);
          md.renderer.rules.emoji = function (token, idx) {
            return (
              '<span class="iconify" data-icon="' +
              token[idx].content +
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
