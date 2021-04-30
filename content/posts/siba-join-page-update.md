---
title: "SIBA Join Page Update"
publishDate: 2021-04-30
tags:
  - coder
description: TBD
meta:
  description: TBD
---

The Simulation International Basketball Association ([SIBA](/code/siba)) had really taken of since its official launch in August 2020. It started out as a simple hobby for family and friends but has grown to 14 members in the professional league and 12 members and 21 teams (a member can manage up to three teams) in the college league. As our second season is coming to a close, we're gearing up to transition to the latest version of the Draft Day Sport Basketball programs by Wolverine Studios and to the influx of newcomers looking for an active multiplayer league.

## The Problem

During our recent growth, I noticed a problem when new people expressed interest in joining the pro or college leagues. The join form was short, only asking the bare minimum information: name of the interested person, their email, their team choices in a text box, their reason for joining (optionally), and how they found the SIBA. From there, an email was sent to the commissioner, my dad, and he would email the person back for the team and coach information that would go into the Draft Day Sports program. Some of that was the name, looks, and outfit of their coach, skill points, and sometimes even a specific team. Some would say something like "Doesn't matter" or "Anything Virginia" in the team textbox, so it was necessary for my dad to list all the available teams that met the criteria.

It was a lot of email back-and-forth between Dad and the potential new member. And sometimes, the email would get lost in the person's spam or junk folder or the person would not reply at all. We couldn't add the person to the league since we didn't have everything we needed. The current join process was not working.

## The Plan

I talked with Dad and we decided to redo the join page so that the email back-and-forth would diminish—or better yet, cease completely. I would create a new join form that asked for the basic information of the interested person as well as _all_ the information for each team they were going to manage. That could be one team or up to four (one pro team and three college teams).

The person would be able to see all available teams, no matter the league, and could preview what their coach would look like in game. After filling in the information, a confirmation email would be sent to them providing helpful instructions about the graphics for the players/teams, our Slack community, and the upload process.

Validation would be a requirement as well. This would include checking required fields, making sure that at least one team was created, and verifying the ability points of the coaches. There is a maximum amount of points that a person could spend on their coach's skill in offense, defense, etc. Each category also had a minimum and maximum for itself.

The college league also required additional and complex validation due to the rules Dad and I implemented in the league. As mentioned above, each coach had a maximum number of ability points to use. This maximum sum would change depending on the ranking tier of the selected school. A Tier 1 school could have up to 325 points for their coach, Tier 2 had 240, and Tier 3 had 150.

While a member in the college league is able to manage up to three teams, each team had to be in a different ranking tier and recruiting region. For example, a person could not manage the Kansas Jayhawks, the Creighton Blue Jays, and the Notre Dame Fighting Irish since all three are considered Tier 1 schools based on the [pre-season ranking](https://siba.averyincorporated.com/college/rankings). Kansas and Creighton also share the same recruiting region, the Great Plains. Yet, the North Carolina Tar Heels (Tier 1, Atlantic East region), the Texas Tech Red Raiders (Tier 2, Great Plains region), the Charleston Cougars (Tier 3, Southeast region) as teams selections would work since all are of different tiers and regions.

## The Struggles

There were two major struggles during the update. The first one was handling the validation of the entire form: the required fields, the college validation, the at-least-one-team rule, and the skill points validation. All of these needed to work together. When I first started, I did not realize exactly how complicated the logic was going to be. The more I created, the more I had to break up the code into smaller, more manageable pieces.

![The hierarchy of the Join Page: Join Form contains Teams Selection and multiple team cards and communicates with the popup Add/Edit Team Form.](/images/posts/join-page-structure.svg) {.is-pulled-right}

- **Join Form:** This contains the entire form and is the source of truth for the data that the interested person has entered. That would include their own information as well as the team information. This source of truth would be used in the college tier/region validation as well as the at-least-one-team rule check.
- **Teams Selection:** The Teams Selection component is where the currently selected teams and their information live. This component is more of a display component rather than actively changing and maintaining the data. There are two sections, one for pro and one for college, and each has their own "Add Team" button. However, if a pro team or three college teams are already selected, the add button disappears.
- **Team Card:** This is another component that does more displaying than changing of the data. This actually takes a team's individual data and creates a simple info card of the team and its coach. Each Team Card has the option to edit or delete the team, just in case someone makes a mistake or changes their mind. Multiple Team Cards can reside inside the Teams Selection component, depending on the number of teams that the person creates.
- **Add/Edit Team Form:** This form is where majority of the changing of the data occurs. A team can be added or an existing team can be edited. The ability points validation also happens here. Communication between the Join Form and Add/Edit Team Form is the main way the source of truth data stays updated and accurate.

  The main code that handles that communication is the submit function that, after validating everything, it sends the newly created or updated team data back to the join form to construct a new source of truth.

  ```js
  const handleSubmit = (event) => {
    //stopping any and all form events since we're handling the submit ourselves
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;

    //check if any of the team selection rules are broken, if so set teamError
    validateTeamSelection();

    if (form.checkValidity() === false || teamError) {
      setValidated(true);
    } else {
      //building the team object
      const team = { ...current, basics: {}, coach: {} };

      //adding a custom (temp) id mainly for telling teams apart for editing
      if (!team.id) team.id = `team-${Date.now().valueOf()}`;

      // Loop through the form and fill out the rest of the team data
      const formData = new FormData(form);
      for (const [name, value] of formData) {
        if (name === "team") {
          const selected = typeahead.current.state.selected[0];
          const teamInfo =
            typeof selected === "string" ? { name: selected } : selected;
          team.basics = { ...team.basics, ...teamInfo };
        } else if (name === "password") {
          team.basics.password = value;
        } else team.coach[name] = value.toString();
      }

      //send new team to main form to be added to source of truth
      handleClose(team);
    }
  };
  ```

By breaking up the join form into smaller parts, I was able to handle the data much easier before sending it off to the backend, where the next major challenge of the confirmation emails lied. Two emails would be sent, one to the commissioner and one to the new member. Both emails needed to show the entered information but the one for the new member had to include some tips on the best way to get started in the league.

At first, I thought creating an HTML email would be very simple. Yeah, that was not the case. :side_eye: All the modern CSS and HTML was thrown out the window. Divs, nah! CSS stylesheet, nope! Instead, tables and inline styles are king when it comes to HTML emails. Apparently, different email clients support different amounts of HTML and CSS, so the safest way to make sure that your email appears the same no matter the client is to use the most basic HTML and styling. There are a lot of posts and articles available on creating HTML emails, but [this post by Nicole Merlin](https://webdesign.tutsplus.com/articles/build-an-html-email-template-from-scratch--webdesign-12770) had an easy step-by-step. I also looked at the source code of the marketing emails or newsletters that I get myself. I won't show you the code since it's an organized mess—emphasis on the mess—but I'm pretty proud of the end result.

## The Results

![Three college teams and coaches selected on the join page and a test confirmation email that a new member receives when joining the SIBA and its college league, the SICBA.](/images/posts/join-page-final-result.jpg)  
From the join form on the website and the member's email, the join process is better streamlined. {.has-text-centered .is-size-7}

After some testing, I pushed the new changes to the live site and waited for people to start using it. I didn't have to wait too long since Dad had recently advertised our league on the Wolverine Studio forums. The email back-and-forth had significantly decreased. People found our Slack, got the correct files, and had nearly all the information that they needed to get started. One hiccup was that the Slack link would timeout after awhile. Thankfully, I was able to find a solution that kept the link valid for basically forever (like 1000 years or something).

Otherwise, it was very smooth. The efficiency of the league caused certain members to join the pro league after originally only wanting to join the college league. :grin: It's been quite the experience seeing something I've created with Dad actually gain traction and receive praise. While I do receive plenty of kudos at work, there is something different about seeing a project of your own succeed.
