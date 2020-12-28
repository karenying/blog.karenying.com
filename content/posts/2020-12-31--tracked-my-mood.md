---
title: 'I Tracked My Mood for Every Day of 2020'
date: '2020-12-31T12:48:35-0500'
template: 'post'
draft: false
slug: 'tracked-my-mood-daily-2020'
tags:
  - '2020'
  - 'Apps'
description: '...using a web app I coded. A look at trends that came out of it. Color blind friendly visuals included!'
socialImage: '/media/socialImages/tracked-my-mood-daily-2020.png'
category: 'ahh'
minutes: '5'
---

<span style="color:#FF2600">[SCREENSHOT OF THE YEAR VIEW AS SOCIAL IMAGE PIC]</span>

In December 2019, I saw a [Reddit post](https://www.reddit.com/r/CasualConversation/comments/ehz6di/i_decided_to_keep_track_of_how_each_day_in_2019/?utm_source=share&utm_medium=web2x) titled "I decided to keep track of how each day in 2019 went for me" and thought I too wanted to keep track of my days for 2020. So I made a similar [Google Sheets](https://docs.google.com/spreadsheets/d/1D9-rCOvZ2aekkK3pYQw-7tHW3TcxV0UnGJZm_DeWiXk/edit?usp=sharing).

Around that time I was also starting my web dev journey~ and what better way to learn than to build a full-stack mood tracker web app instead of using a spreadsheet? This is how Dayz and this post came to be.

## Dayz

<span style="color:#FF2600">[APP SCREENSHOT]</span>

The backend is [Express](https://expressjs.com/) on top of a [MongoDB](https://www.mongodb.com/) database with a [Mongoose](https://mongoosejs.com/) ODM. It's a [ReactJS](https://reactjs.org/) frontend, bootstrapped with [Create React App](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app). I deployed it with [Heroku](https://www.heroku.com/) free-tier and ran a [cron job](https://cron-job.org/en/) that pinged the site every half hour to prevent the app from [falling asleep](https://blog.heroku.com/app_sleeping_on_heroku).

There are 4 **timeframe views**: Day, Week, Month, and Year. In Week view only (I got lazy / the app is unfinished), you could click a day and rate it on this **scale**: Bad day, Off day, Normal day, Good day, and Great day -- like the original spreadsheet I made.

I got the app to a usable state and sorta gave up working on it. But I set a daily reminder to rate my day at night:

![](/media/tracked-my-mood-daily-2020/reminder.png#width=300px)

And that's how I ended up tracking my mood for every day of 2020. Here's what the data told me.

## Trends

Before I dive into this section, some context for my 2020:

I spent the first half of 2020 as a Junior at Princeton and the second half as a Senior. I did a remote summer internship between the academic years, and have been living at home (Boston, MA) since mid March (Princeton yeeted us off campus when pandemic hit).

**Every screenshot of the app below has a color blind friendly version. Hover over (desktop) or press (mobile) to reveal.** I used a palette from [Paul Tol](https://personal.sron.nl/~pault/#sec:qualitative) and hosted images on [Imgur](https://imgur.com/) in order to the get HTML to play nice with Gatsby and markdown.

_I also recognize these are NOT the easiest colors to distinguish and not the best for conveying data but I like them. The color blind friendly palette is less of a gradient and perhaps more distinguishable._

### Inflated Ratings

From the way I defined the scale, theoretically my ratings should be a **symmetric distribution**, centered around Normal day. This was not the case at all:

<span style="color:#FF2600">[PIC OF YEAR COUNTS]</span>

Let's give numeric values to each type of day: **Bad = 0, Off = 1, Normal = 2, Good = 3, Great = 4**. And take the average. We get <span style="color:#FF2600">[SOME QUICK MATHS]</span>, greater than 2 (normal). I had an inflated view of what my days were actually like.

This makes sense with my personality -- I generally have a positive outlook on life so on average, I was more generous with my ratings, thinking I had a better day than what the scale defined.

I rated so few days as Bad that I can distinctly remember what went down in those 6 days. I can't say the same about my 25 Great days though.

### Pandemic

I chose an interesting year to start this experiment huh. It's not every year a global pandemic hits. Covid for sure had an impact on the data. This is how cases trended in Massachusetts where I've been living for the majority of the year:

<span style="color:#FF2600">[NYT PIC]</span>

My mood generally correlated with case counts / restrictions -- When cases are lower and restrictions were looser, I was happier.

This is the month of April where all I did was cross stitch while binge-watching [Bon Appetite](https://www.youtube.com/user/BonAppetitDotCom) videos:

<div class="mood">
  <img class="color" src="https://i.imgur.com/O7ZNhoz.png" alt="april">
  <img class="colorblind" src="https://i.imgur.com/h0mzfFI.png" alt="april">
</div>

Not a single Great day. Compare that to July when I got to see friends:

<div class="mood">
  <img class="color" src="https://i.imgur.com/x2na4Vh.png" alt="july">
  <img class="colorblind" src="https://i.imgur.com/z72HG7c.png" alt="july">
</div>

Cases started rising again in the fall and my mood adjusted accordingly -- less Good days.

<div class="mood">
  <img class="color" src="https://i.imgur.com/mRQtSuI.png" alt="nov">
  <img class="colorblind" src="https://i.imgur.com/bvUsCy8.png" alt="nov">
</div>

### Seasonal Depression

I also probably have a mild case of seasonal depression. Being outside and getting sun makes me happy. Summer is my favorite season by far. Thus, I had way more Great days when the weather was warmer.

### Bad Days Get Better

<div class="mood">
  <img class="color" src="https://i.imgur.com/5LqcDs4.png" alt="bad days">
  <img class="colorblind" src="https://i.imgur.com/iNNaYBE.png" alt="bad days">
</div>

## Conclusion

<span style="color:#FF2600">more reflection</span>

If I could make Dayz from scratch, I would implement these things:

- Have Express serve my React app -- might solve some CORS / HTTP vs HTTPS issues
- Structure components differently
- Use Typescript and Sass
- State management
- Responsiveness
- Passwords + account management / general account security

The fact that Dayz currently doesn't have these things really demotivates me from working on the app...

So where does that leave this experiment and app?

I'm definitely **not** releasing Dayz to the public in its current state (@ the last bullet) but I think I'll continue to track daily. Hopefully catch ya at "I Tracked My Mood for Every Day of 2021"!

Happy New Year and here's to many Great days that will come 🥂

_Thanks for reading!_
