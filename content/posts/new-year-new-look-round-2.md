---
title: "New Year, New Look: Round 2"
publishDate: 2021-01-15
tags:
  - coder
description: Goes here
thumbnail: new-me.jpg
---

Welcome to the new and improved website of Brittani S Avery! :tada: You may be thinking, _Wait, didn't we do this already?_ In a way yes, but this time is a bit different.

My previous website was hosted on [Wix.com](https://wix.com/) and for the time, it worked. However when updating my site to its new look and adding blog entries, I noticed some limitations. The wix editor would lag when dragging and dropping things. Formatting would be weird when copying/pasting my blog entries from LibreOffice or Google Docs. Code syntax highlighting in blog posts was minimal and not customizable. For awhile, I also couldn't upload .svg files, which are great at maintaining their crisp look no matter the size.

As the number of limitations grew, I started to look into coding my own website. Creating websites is the main task of my day job and I have created plenty hobby websites on my own, so coding one wasn't the biggest challenge. The challenge actually came from getting SEO to work, learning the MailChimp and AWS SES APIs, and integrating Typescript into my personal programming toolbox.

## SEO is easy to learn, hard to master

One of the really nice things about Wix, especially when blogging, is that it handles all that SEO (Search Engine Optimization) stuff for you. SEO does have great importance for businesses that want to have higher rankings on Google. But for me, I just wanted to have my blog post or website page show up in a preview if someone shares my link on social media. Thankfully, after doing some research, it isn't as hard as one might think. Most social media uses the [Open Graph protocol](https://ogp.me/), but Twitter has to be a little different and uses its own tags. So now if you share this blog post or any of my other ones, you should get a little preview, just like Wix did before.

Regarding SEO, this is only the beginning. During my research, I found so much that I got a bit overwhelmed and thus decided to stick with the basics. I can understand why businesses have SEO experts on their teams.

## MailChimp, AWS, and emails

On my Wix site, I had already dabbled in the MailChimp API in order for people to join my newsletter. You might remember the form being in the footer. That took so much time since Wix has a very specific way of adding your own code to its platform, which I am sure is for security reasons. Once I finished the form, I was satisfied for awhile; however, making any updates almost required me to relearn their coding framework. :side_eye: Not my idea of fun.

When recreating the newsletter signup, I looked more into MailChimp and saw that they have an official Node.js client library. That made things so much easier to add new members to the newsletter and update existing members.
