---
title: "Code Fix: The SIBA Website's Move from Create-React-App to Astro"
publishDate: 2023-10-23
tags:
  - coder
newsletter: coder
description: The website for the fictional basketball league I run with my dad, SIBA, was built with the abandoned and broken Create-React-App. Wanting to move onto something newer, I decided to give the Astro framework a try.
meta:
  description: I needed to move the SIBA website off the abandoned Create-React-App. So, I decided to give Astro a try.
thumbnail:
---

Welcome to the second edition of my series, Code Fix. I just noticed that this post will be similar in scope of my other coding post, [Code Fix: The SIBA Join Page Update](/post/siba-join-page-update). So, I decided to make this a series. I'm not sure how regular it will be. I will be redoing the [Dragon Cave Lineage Database](/code/dcldb) soon, potentially using it as a way to learn more about tailwind and to rework the authentication and the database structure. So stay tuned! Now, onto this edition's problem.

## The Problem

I was fiddling around with the website for [SIBA](/code/siba), the fictional basketball league I run with my dad. Strapi, our CMS for news articles, had just released a major version update that I wanted to move to. Updating and changing things on Strapi's side was easy. Yet, making any change on the frontend was painful and often unsuccessful with Create-React-App. 😕

Back when I first made the website for our league in 2018, I was just learning react and used the recommended way to start a new react app, Create-React-App (CRA). React was the thing I kept hearing and reading about in my coding circles. I was bored and wanted to learn something new. My dad gave me the go-ahead in creating the website as a place to put the league rules and any news articles people might write. I used that as my opportunity to build something substantial in react. No more small tutorial projects!

Both the league and the site started out small. The league was originally only available to friends and family. The site literally only hosted the rules and current members of the pro and college leagues. As my dad opened up the league to other basketball and stats fans, I further built out the site and added a content management system to handle the articles as well as give the ability for my dad to edit people joining and leaving the leagues rather than me having to make a code push.

However as I edited the site, I realized that it was becoming difficult to make any changes, especially any major ones. It took _forever_ for the local development environment to load and sometimes the hot reloading would stop working. Doing research in these issues led me to this [discussion](https://github.com/facebook/create-react-app/discussions/11768) on the CRA github. Basically, CRA was kinda dead and needed regular maintainers. The discussion goes around talking about how it didn't use the best practices, was very slow, and just outdated in general. That was my cue to move off CRA.

## The Plan

[CFE.dev](https://cfe.dev/) hosts "free virtual meetups, conferences, workshops and talk shows by developers for developers" as stated by their about page and I really enjoy their events. One specific talk introduced me to a new framework named [Astro](https://astro.build). Astro's approach to building websites is simple, fast, and customizable. The main key features of Astro are:

- **Component Islands:** A new web architecture for building faster websites.
- **Server-first API design:** Move expensive hydration off of your users’ devices.
- **Zero JS, by default:** No JavaScript runtime overhead to slow you down.
- **Edge-ready:** Deploy anywhere, even a global edge runtime like Deno or Cloudflare.
- **Customizable:** Tailwind, MDX, and 100+ other integrations to choose from.
- **UI-agnostic:** Supports React, Preact, Svelte, Vue, Solid, Lit and more.

If you would like to see a more thorough introduction to Astro as well as seen the framework in action, check out [Astro from the Ground Up by Cassidy Williams](https://cfe.dev/sessions/astro-ground-up/).

Of the main key features of Astro, the ones that I found the most interesting were the component islands, server-first design, zero JS by default, and UI-agnostic.

[Component Islands](https://docs.astro.build/en/concepts/islands/) are a pattern of web architect that was pioneered by Astro. With Islands, you can have an interactive component or "island" on an otherwise static page. Quoting Astro docs, "Multiple islands can exist on a page, and an island always renders in isolation. Think of them as islands in a sea of static, non-interactive HTML."

![A website broken up displaying static sections with interactive sections mixed together](/images/posts/astro-islands.png)  
Original diagram source - [Islands Architecture: Jason Miller](https://jasonformat.com/islands-architecture/) {.has-text-centered .is-size-7}

A server-first API design and loading no javascript by default are the main features of Astro that made me consider it to be an upgrade from CRA. The old SIBA was a bit slow since it was a single page application (SPA) and used client-side rendering, which often caused the site to show up as a blank white page for a couple of seconds. With most of the site being static, loading javascript wasn't necessary. I would only need HTML and CSS. Astro's separation of static and interactive sections and server-side rendering to generate the pages at build time would eliminate the weird blank page effect.

Another bonus is being able to bring my own framework, which is React in my case. I didn't have to learn an entirely new framework but the few unique properties of the `.astro` files. Their documentation is clear and easy to understand. They even have a tutorial for moving away [from CRA to Astro](https://docs.astro.build/en/guides/migrate-to-astro/from-create-react-app/), which was very helpful. After using the tutorial for a little bit, I decided to make a brand new repo since I was planning on changing more than just the frontend. I'm sure most of my fellow coders can relate to the urge to refactor all the things despite only starting with a single goal in mind. 😅 I'm thinking of turning the repo into a true monorepo using [Nx](https://nx.dev/). Be on the lookout for blog post on that—eventually.

### Adding Astro into SIBA

The main way that I broke up the SIBA site was based on how much interactivity a page needed. Thus, I had two main types of pages: Markdown/MDX pages and Astro/Typescript pages. The Markdown/MDX pages the content-heavy pages and turned them into `.md` or `.mdx`. These pages are automatically turned into pages by Astro's routing system. 👍🏾 So, there's nothing I need to do besides place them inside the `/pages` directory and boom—I have a page!

The Astro/Typescript pages are a bit more complicated since they usually involve pulling data from either the CMS or an API I built that retrieves the latest update times of the league files or a member's exports.

A great example of this type of page is, `/pages/[section][members].astro`, the current members listing page: [Head Coaches](https://siba.averyincorporated.com/college/coaches) for college and [Owners](https://siba.averyincorporated.com/siba/owners) for pro. The current members list is pulled from Strapi and then displayed in a grid. Nothing fancy at all, but with CRA the data was retrieve on each page load, even if it hadn't been updated. With Astro, that's no longer the case. 👍🏾 You can see the code below.

<!-- eslint-skip -->

```tsx
---
import { COLLEGE_LEAGUE_INFO, LEAGUE, PRO_LEAGUE_INFO } from "@content/constants";
import Layout from "@layouts/BaseLayout.astro";
import type { Member, StrapiCollectionResponse } from "@lib/types";
import { getDataFromApi } from "@lib/utils";
import { sortBy } from "lodash-es";

export function getStaticPaths() {
  return [
    { params: { section: "siba", members: "owners" } },
    { params: { section: "college", members: "coaches" } },
  ];
}

const { section } = Astro.params;

const leagueInfo =
  section === LEAGUE.college ? COLLEGE_LEAGUE_INFO : PRO_LEAGUE_INFO;

const strapiMembers = await getDataFromApi<StrapiCollectionResponse<Member>>(
  `${import.meta.env.PUBLIC_CMS_URL}/${
    leagueInfo.strapiMembers
  }?pagination[limit]=100`
);

const sortedMembers: Member[] = sortBy(
  strapiMembers.data.map((member) => ({
    team: member.attributes.team,
    logo: member.attributes.logo,
    name: member.attributes.name,
  })),
  ["team"]
);

const title = `${leagueInfo.abbv} ${leagueInfo.pageTitle}`;
---

<Layout content={{ title: title }}>
  <section class="content">
    <h1>{title}</h1>
  </section>
  <div class="columns is-multiline">
    {
      sortedMembers.map((member) => (
        <div class="column is-3-widescreen is-4-tablet has-text-centered">
          <img
            src={`${import.meta.env.SITE}/files/${
              leagueInfo.type
            }/Website/images/${member.logo}`}
            alt={`${member.team} logo`}
          />
          <p class="title is-4">{member.team}</p>
          <p class="subtitle is-6">{member.name}</p>
        </div>
      ))
    }
  </div>
</Layout>

```

That probably looks like a lot. 😅 Let's break it down and talk about what each line is doing.

Firstly, we'll start with the filename: `/pages/[section]/[members].astro`. Those who are familiar with Next.js will recognize.

## The Results
