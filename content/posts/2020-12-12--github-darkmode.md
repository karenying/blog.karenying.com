---
title: 'GitHub Dark Mode is too Dark'
date: '2020-12-12T00:00:00-0500'
template: 'post'
draft: false
slug: 'github-darkmode-sucks'
tags:
  - 'UI/UX'
  - 'Apps'
description: 'Using color theory to prove why GitHub dark mode actually sucks'
socialImage: '/media/socialImages/github-darkmode-sucks.jpg'
category: 'holidayz'
minutes: '3'
---

![toggle](/media/socialImages/github-darkmode-sucks.jpg)

This past week, GitHub [released](https://twitter.com/github/status/1336362679506784256) a long-awaited feature -- dark mode. Like many devs around the world, I was hype. In 2020, a dark mode toggle for anything remotely related to tech seems like a requirement.

So I flipped the switch. My immediate reaction was that it seemed a bit off. But I wanted to give it a chance and credited that feeling towards just not being used to the theme yet.

Flash forward a couple of days. I found myself switching to light mode for code review specifically. I didn't feel confident code reviewing in dark mode. I was scared I would miss something. It was after a couple of instances of this did I realize, GitHub dark mode is _too_ dark. And here's the proof.

## The Proof is in the Palette (Pudding)

### Accessibility and Contrast Ratio

I explain contrast ratio in depth [here](https://blog.karenying.com/posts/boost-visual-accessibility-by-auto-flipping-text-color#wcag-and-contrast-ratio) but here's what you need to know:

- The contrast ratio between two colors mathematically calculates how different our eyes perceive them to be
- It ranges between **1** (two of the same colors) to **21** (black and white)
- The smaller the text is, the larger the contrast ratio between the text color and the background color needs to be
- The [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) (WCAG) defines a level **AA** contrast ratio as above **4.5** and level **AAA** as above **7** for small text
- **AAA** is considered the gold standard level for web accessibility

### Other Dark Mode Site Palettes

I grabbed the dark mode color palettes of a couple of popular sites/apps. Every palette image shows background color, primary text color, secondary text color from left to right. I put the contrast ratio of the primary and secondary colors with the background on top of the respective color.

**Spotify**
![spotify](/media/github-darkmode-sucks/spotify.png)

**Facebook**
![facebook](/media/github-darkmode-sucks/facebook.png)

**YouTube**
![youtube](/media/github-darkmode-sucks/youtube.png)

All of these satisfy the AAA standard of a contrast ratio of at least 7!

And then we have our new GitHub dark mode...

**Github**:
![github](/media/github-darkmode-sucks/github.png)

Not only do the colors look noticeably darker than their counterparts in other apps, **the secondary text fails AAA standards**!! I knew my eyes did not deceive me.

## Code Review Palette

Finally, my main grip with GitHub dark mode is that the red and green for diffs looks super off to me.

On the right is the light mode colors and the on the left is the new shades. I overlaid the respective background colors on top:

![diff colors](/media/github-darkmode-sucks/diff.png)

I did calculate the contrast ratios between both palettes and they were pretty similar. However, for some reason the lighter one is just easier for me to parse at a cursory glance. Maybe I'm just not used to it yet but I really dislike how dark the dark mode diff colors are.

## Conclusion

While there is no mathematical proof that the code diff color palette is worse, we did in fact show that GitHub's dark mode colors are not as accessible as many other dark mode apps we use daily.

If GitHub put as much effort into researching a better dark mode palette as they did into the [promo video](https://twitter.com/github/status/1336362679506784256) they released, perhaps we wouldn't be here. GitHub, do better. Give us the dark mode experience we deserve.
