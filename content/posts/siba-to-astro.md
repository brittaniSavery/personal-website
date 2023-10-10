---
title: "Building with Astro: SIBA Website"
publishDate: 2023-10-23
tags:
  - coder
newsletter: coder
description: The website for the fictional basketball league I run with my dad, SIBA, was built with the abandoned and broken Create-React-App. Wanting to move onto something newer, I decided to give the Astro framework a try.
meta:
  description: I needed to move the SIBA website off the abandoned Create-React-App. So, I decided to give Astro a try.
thumbnail:
---

I was fiddling around with the website for [SIBA](/code/siba), the fictional basketball league I run with my dad. Strapi, our CMS for news articles, had just released a new major version update and I wanted to update it. Updating and changing things on Strapi's side was easy. Yet, making any change on the frontend was painful and often broken with Create-React-App. 😕

Back when I first made the website for our league in 2017, I was just learning react and used the recommended way to start a new react app, Create-React-App (CRA). React was the thing I kept hearing and reading about in my coding circles. I was bored and wanted to learn something new. My dad gave me the go-ahead in creating the website as a place to put the league rules and any news articles people might write. I used that as my opportunity to build something substantial in react. No more small tutorial projects!

Both the league and the site started out small. The league was originally only available to friends and family. The site literally only hosted the rules and current members of the pro and college leagues. As my dad opened up the league to other basketball and stats fans, I further built out the site and added a content management system to handle the articles as well as give the ability for my dad to edit people joining and leaving the leagues rather than me having to make a code push.

However as I edited the site, I realized that it was being coming difficult to make any changes, especially any major ones. It took _forever_ for the local development environment to load and sometimes the hot reloading would stop working. Doing research in these issues led me to this [discussion](https://github.com/facebook/create-react-app/discussions/11768) on the CRA github. Basically, CRA was kinda dead and needed regular maintainers. The discussion goes around talking about how it didn't use the best practices, was very slow, and just outdated in general. That was my clue to move off CRA.

[CFE.dev](https://cfe.dev/) hosts "free virtual meetups, conferences, workshops and talk shows by developers for developers" as stated by their about page and I really enjoy their events. One specific talk introduced me to a new framework named [Astro](https://astro.build). [Astro from the Ground Up by Cassidy Williams](https://cfe.dev/sessions/astro-ground-up/) is a great introduction into what makes Astro great and thoroughly convinced me to give it a try. [Islands](https://docs.astro.build/en/concepts/islands/) also known as Component Islands are one of Astro's biggest draws. You can have an interactive component or "island" on an otherwise static page. Quoting Astro docs, "Multiple islands can exist on a page, and an island always renders in isolation. Think of them as islands in a sea of static, non-interactive HTML."

![A website broken up displaying static sections with interactive sections mixed together](/images/posts/astro-islands.png)  
{.has-text-centered}

SIBA's website is mostly static with some interactive sections such as the displays for the latest files necessary to run the league and the join page. Astro's separation of static and interactive sections was perfect speed up the long load times that CRA had due to loading everything into javascript first and then displaying it.
