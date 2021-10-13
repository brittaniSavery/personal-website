---
title: "Next.js & Material UI: A Disagreeable Pair"
publishDate: 2020-07-22
tags:
  - coder
newsletter: coder
description: I've been working on a new coding project and ran into some issues when using Next.js and Material UI but thankfully found another solution using the CSS framework, Bulma.
meta:
  description: I've been working on a new coding project and ran into some issues when using Next.js and Material UI but another framework came to the rescue, Bulma.
thumbnail: nextjs-material-ui.jpg
---

I have been on a personal-coding-project kick lately. Two projects are currently in the works and one is muddling about in my mind. The project discussed in this blog post will be a database for the lineages of my digital dragons from the site [DragCave.net](https://dragcave.net/). It is as nerdy as it sounds. You collect pixel dragons and can breed them together to create all sorts of lines and combinations. The reasoning for this project is that I was tired of using a Google Sheet that took forever and a day to load. Also, searching for anything more complex than name or breed was hard.

I decided that I would also make this a bit of a learning opportunity, so I picked a new React framework to use. I decided to go with Next.js, an apparently developer-friendly framework that supports server-side rendering out of the box. It’s easy to get started using create-next-app with npm (or yarn if you prefer).

`npx create-next-app`

I made progress on my site, setting up pages and adding routes. Eventually, I needed to style the app because things need to be pretty. I originally went with Material UI since I have enjoyed using it for work. It has a wide variety of components, which can be easily customized. Normally to use Material UI, you only have to include the `@material-ui/core` package to your React app, add a ThemeProvider around the start of your app (normally located in `app.js`), and you're good to go. However, there is a bit more needed to get Material UI to render sever-side with Next.js. You have to add the following to the `_document.js`.

```jsx
MuiDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};
```

Once I added that, things went smooth enough. But then as I kept building out the app, I ran into a more and more errors, like console warnings and npm errors when adding other packages or starting the development server. Eventually, I got frustrated enough to restart building it with a different styling solution.

I found [Bulma](https://bulma.io/), a free, open source CSS framework based on Flexbox. It was included in the template I used for the second personal coding project I'm working on. I like how it has variables to easily customize it, has components similar to Material UI, and it works seamlessly with Next.js. I added the necessarily packages and the `.scss` file for customization. And...that's it.

Since it has been easier to work with Bulma, I've been able to change the colors and fiddle with the wording a bit, but here's the home page in the two different styling frameworks.

![A comparison of the home page using the Material UI Framework and the Bulma Framework](/images/posts/materialui-bulma-compare.png)

If you're a non-coder and made it to the end, thank you for reading my complaints of software development. Let me know which home page you like. Until next time!
