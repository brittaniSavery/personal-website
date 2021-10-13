const Prism = require("prismjs");
require("prismjs/plugins/custom-class/prism-custom-class");

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

// change emoji rendering
md.renderer.rules.emoji = function (tokens, idx) {
  return `<span class="iconify" data-icon="${tokens[idx].content}"></span>`;
};

// add target "_blank" to all outside links and domain to local links
const defaultLinkRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const hrefIndex = token.attrIndex("href");
  const url = token.attrs[hrefIndex][1];

  if (/^https?/.test(url)) {
    token.attrPush(["target", "_blank"]);
  } else {
    token.attrs[hrefIndex][1] = `${process.env.WEBSITE}${url}`;
  }

  // pass token to default renderer.
  return defaultLinkRender(tokens, idx, options, env, self);
};

// add domain to images
const defaultImageRender =
  md.renderer.rules.image ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.image = function (tokens, idx, options, env, self) {
  const token = tokens[idx];
  const imgArray = token.attrs[token.attrIndex("src")];

  imgArray[1] = `${process.env.WEBSITE}${imgArray[1]}`;

  return defaultImageRender(tokens, idx, options, env, self);
};

module.exports = md;
