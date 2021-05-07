const Prism = require("prismjs");
require("prismjs/plugins/custom-class/prism-custom-class");
console.log(Prism.plugins);
const md = require("markdown-it")({
  highlight: (str, lang) => {
    Prism.plugins.customClass.prefix("prism__");
    var languageString = "language-" + lang;

    return `<pre class="${languageString}"><code class="${languageString}">${
      Prism.languages[lang]
        ? Prism.highlight(str, Prism.languages[lang], lang)
        : Prism.util.encode(str)
    }</code></pre>`;
  },
  html: true,
  xhtmlOut: true,
});
const mdAttrs = require("markdown-it-attrs");

const mdEmoji = require("markdown-it-emoji/bare");
const emojiDefinitions = require("./emoji-definitions");
const emojiShortcuts = require("./emoji-shortcuts");

const emojiConfig = {
  defs: emojiDefinitions,
  shortcuts: emojiShortcuts,
  enabled: [],
};

md.use(mdEmoji, emojiConfig).use(mdAttrs);

//change emoji rendering
md.renderer.rules.emoji = function (tokens, idx) {
  return `<span class="iconify" data-icon="${tokens[idx].content}"></span>`;
};

//add target "_blank" to all outside links
const defaultLinkRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const hrefIndex = tokens[idx].attrIndex("href");
  const url = tokens[idx].attrs[hrefIndex][1];

  if (/^https?/.test(url)) {
    tokens[idx].attrPush(["target", "_blank"]);
  }

  // pass token to default renderer.
  return defaultLinkRender(tokens, idx, options, env, self);
};

module.exports = md;
