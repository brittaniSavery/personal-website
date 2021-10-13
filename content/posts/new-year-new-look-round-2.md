---
title: "New Year, New Look: Round 2"
publishDate: 2021-01-18
tags:
  - coder
newsletter:
  - coder
description: Wix.com is a great tool for creating websites without any coding knowledge, but as I tried to make changes and add to my site, I noticed a growing list of limitations. So, I decided to redesign and rebuild it from scratch.
meta:
  description: After running into many limitations with updates on Wix.com, I decided to use my coding skills to redesign and rebuild my website.
thumbnail: new-year-new-look-2.png
---

Welcome to the new and improved website of Brittani S Avery! :tada: You may be thinking, _Wait, didn't we do this already?_ In a way yes, but this time is a bit different.

My previous website was hosted on [Wix.com](https://wix.com/) and for the time, it worked. However when updating my site to its new look and adding blog entries, I noticed some limitations. The wix editor would lag when dragging and dropping things. Formatting would be weird when copying/pasting my blog entries from LibreOffice or Google Docs. Code syntax highlighting in blog posts was minimal and non-customizable. For awhile, I also couldn't upload .svg files, which are great at maintaining their crisp look no matter the size.

As the number of limitations grew, I started to look into coding my own website. Creating websites is the main task of my day job and I have created plenty of hobby websites on my own, so coding one wasn't the biggest challenge. The challenge of development actually came from getting SEO to work, learning the MailChimp and AWS SES APIs, and integrating Typescript into my personal programming toolbox.

## SEO is easy to learn, hard to master

One of the really nice things about Wix, especially when blogging, is that it handles all that SEO (Search Engine Optimization) stuff for you. SEO does have great importance for businesses that want to have higher rankings on Google. But for me, I just wanted to have my blog post or website page show up in a preview if someone shares my link on social media. Thankfully, after doing some research, it isn't as hard as one might think. Most social media uses the [Open Graph protocol](https://ogp.me/), but Twitter has to be a little different and uses its own tags. So now if you share this blog post or any of my other ones, you should get a little preview, just like Wix did before.

Regarding SEO, this is only the beginning. During my research, I found so much that I got a bit overwhelmed and thus decided to stick with the basics. I can understand why businesses have SEO experts on their teams.

## MailChimp, AWS, and emails

On my Wix site, I had already dabbled in the [MailChimp API](https://mailchimp.com/developer/) in order for people to join my newsletter. You might remember the form being in the footer. That took so much time since Wix has a very specific way of adding your own code to its platform, which I am sure is for security reasons. Once I finished the form, I was satisfied with it for awhile; however, making any updates almost required me to relearn their coding framework. :side_eye: Not my idea of fun.

When recreating the newsletter signup, I looked more into MailChimp and saw that they have an [official Node.js client library](https://www.npmjs.com/package/@mailchimp/mailchimp_marketing). That made things so much easier to add new members to the newsletter and update existing ones.

I also needed to recreate my autographed books order form, which is currently only on the project page for [_Element Unknown_](/book/element-unknown). I wanted to keep this version of the order form simple since I only have one book available for purchase and I knew that I wanted to change it later into an actual online store front. So, I decided to use [AWS SES](https://aws.amazon.com/ses/) (Simple Email Service) to send an email to myself whenever a person places an order. Something that's a little new to this site from my Wix one is that a person can sign up to the newsletter while ordering books. I manged to combine MailChimp and SES APIs relatively easily with a single API call from my own site. The Next framework makes adding an API as easy as creating a folder and naming it "api."

I'm looking forward to creating a real store front and adding the ability to take online payments. For now though, the little form will work.

## Typescript and all its hype

Typescript is a strictly typed version of Javascript and it has become very popular among my fellow Javascript developers. I have often asked my coworkers why Typescript is so beloved and I have never really received a satisfying answer. Most told me that it helps in finding bugs during development rather than in the live production environment and it can even prevent certain bugs from even happening due to errors and warnings in the IDE.

Okay fair, but the few times I have used Typescript at work, I found it more tedious than helpful. So, I decided to use Typescript, along with Next.js and Bulma CSS, when creating the latest version of my site. I wanted to see if I have full control over the project if I would enjoy Typescript more.

I will admit that I do see some of the benefits in using Typescript. I have especially enjoyed the autocomplete. `Ctrl + Space` is my friend when coding and using Typescript actually makes that viable again. Yet, the feeling of tedium still remains at times. I am writing more code and sometimes, the errors are _not_ helpful. I'll have to Google what in the world the error is talking about and then scour StackOverflow, Github, and other blogs just to find out the meaning of an unclear error. I realize Typescript is constantly evolving, so errors will become clearer with time. But I am torn if I will add it to my main preferred stack of development.

Those three technologies were the big challenges in the development of this site. But I am proud of what I have created. I actually really like the simple and clean design. The [projects](/projects) page is probably one of my favorites. While I am done with the main pages of the site, there are still some things I would like to add like the online store and share buttons at the end of each blog post. So, there will probably be more challenges in the near future. Learning is a pastime of mine; I look forward to them.
