---
title: 'Customize Chrome New Tab Page in 30 Seconds'
date: '2020-10-16T22:12:03.284Z'
template: 'post'
draft: false
slug: 'customize-chrome-new-tab-page-in-30-seconds'
tags:
  - 'Chrome Extension'
  - 'Productivity'
  - 'Web Dev'
  - 'Tutorial'
description: 'Override Chrome’s new tab page to create a more personalized browsing experience'
socialImage: '/media/gutenberg.jpg'
minutes: '4'
category: 'lol'
---

![](https://cdn-images-1.medium.com/max/1600/1*FA6i6sE1USTsXdZHJkOSzA.gif)_My custom new tab [page](https://karenying.github.io/chromepage/). Theme consistent with my personal [site](https://karenying.com)._

If you’ve seen a typical college student’s laptop, you might be familiar with [Momentum](https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=en). This free Chrome extension _“replace[s] new tab page with a personal dashboard featuring to-do, weather, and inspiration”_.

However, after 5 years of looking at the same couple of pictures, motivational quotes, and the cheesy “What is your main focus for today?”, I was long overdue for a change.

![Momentum — no shade, just need to switch it up :)](https://cdn-images-1.medium.com/max/2000/1*tAyZKJwRHGTNjg5eFR2_uQ.jpeg)_Momentum — no shade, just need to switch it up :)_

Thankfully, we can make our own personalized override of the Chrome homepage/new tab page. It’s fast, easy, and you can customize it however you want!

### Prereqs

This tutorial assumes you have some knowledge of Javascript and HTML/CSS. All good? Let’s get started 👍🏼

## Implementation

### 0. Getting Started

Much like how every npm project requires a package.json, every Chrome extension needs a manifest.json for important information. This file goes in the root directory. This is all we need initially:

`gist:karenying/be79110206415e17be3cfd7bb8881ed6/manifest-json`

Chrome [recommends](https://developer.chrome.com/extensions/manifest/manifest_version) that developers put 2 for the manifest_version so that’s what we’ll do.

The last line is the crucial part, we’ll be creating an index.html as our home page.

### ∞. Choose Your Own Adventure 🌎

In the root directory, create an index.html file. Here’s a super bare bones template:

`gist:karenying/035a3ee24482972e0b9d4145b1bc72a7/index-html`

Make sure you fill out the title tag or you’ll see an ugly “chrome://newtab”.

That’s it! You’ve just created an override of Chrome’s new tab page. Let’s make sure it works.

1. Go to chrome://extensions in the address bar

1. Turn “Developer Mode” on the top left

1. Click “Load unpack” and select the destination as this root directory

You should see it show up like so:

![Your new extension.](https://cdn-images-1.medium.com/max/2000/1*sBUJG2JPZmo_ismdOiw5_Q.png)_Your new extension._

Don’t worry if your ID is different!

Make sure that you’ve turned Momentum off if you’ve been using it. Now if you open a new tab or window, you should see the “Hello World!” from index.html.

That’s it. It’s that simple. If you know what you want yours to look like, seeya 👋🏼 If you want to see how I made mine, stick around to add a clock, greeting, and date.

### 1. Add Clock

I knew I wanted to add a clock like Momentum. I really liked the idea of flip clocks to add some animation. After some googling, I found this [one](https://codepen.io/harshabhat86/full/tAxuF) by [Harsha Bhat](https://codepen.io/harshabhat86) on CodePen.

![[Flipping Clock](https://codepen.io/harshabhat86/full/tAxuF) by [Harsha Bhat](https://codepen.io/harshabhat86). Look familiar?](https://cdn-images-1.medium.com/max/2000/1*z7VWH20Euyi_KpulX2qtMg.png)_[Flipping Clock](https://codepen.io/harshabhat86/full/tAxuF) by [Harsha Bhat](https://codepen.io/harshabhat86). Look familiar?_

So I converted his SCSS to a index.css , wrapped his JS in DOMContentLoaded event listener in a script.js, and linked the two new files and added <div class=”clock”></div> to index.html 😅

You should check out his [code](https://codepen.io/harshabhat86/pen/tAxuF) if you’re interested in the nitty gritties, or see how I embedded it in my page in my GitHub [repo](https://github.com/karenying/chromepage).

I changed some of the CSS colors to fit my personal [site](http://karenying.com/) theme!

### 2. Add Greeting

Just the clock looked a bit bare. So I recreated Momentum’s greeting: “Good [timeframe], Karen”.

All this takes is Javascript’s Date [API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). In index.html, we add

    <p id="greeting">Good <span id="timeframe"></span>, Karen</p>

In script.js, we’ll chain some if statements to determine what time of day it is:

`gist:karenying/fb0c0be4fb6c3d1e1b7b594b03d0bba8/script-js`

And we have ourselves a greeting!

### 3. Add Date

In a similar vein, we can add the current date:

`gist:karenying/74d0fb34737fa95a3e8b87d3cb30c8f5/index-html`

`gist:karenying/b89b52b168547d63a8cc56d6c4dc01e0/script-js`

With the help of the Date API, our page knows the current time, timeframe, and date!

![Pulling everything together.](https://cdn-images-1.medium.com/max/2000/1*tvq4J3J0iGBdldXLqN2duQ.png)_Pulling everything together._

This is how I went about personalizing my page. The GitHub [repo](https://github.com/karenying/chromepage) has more specific styling details. Many many thanks to [Harsha Bhat](https://codepen.io/harshabhat86) for his amazing clock.

## Conclusion

In this tutorial, we learned how to create a custom Chrome new tab page. You can get really creative. I merely gave some tips and suggestions on how to recreate mine 🙂

My goal with this extension was to make my browsing experience feel more personalized and home-y. Hopefully, I’ve helped you do the same! If anything, it’s quick, easy, and fun to build from scratch. If you got lost along the way, check out my GitHub [repo](https://github.com/karenying/chromepage). You can also install the version I made with the instructions in the repo README. Preview a live demo [here](https://karenying.github.io/chromepage/).

### Further Reading

- [Use React](https://medium.com/@gilfink/building-a-chrome-extension-using-react-c5bfe45aaf36)

- [Codepen Clocks](https://codepen.io/tag/clock/)

- [Flipping Clock](https://codepen.io/harshabhat86/full/tAxuF) by [Harsha Bhat](https://codepen.io/harshabhat86)

Thanks for reading. Happy hacking!
