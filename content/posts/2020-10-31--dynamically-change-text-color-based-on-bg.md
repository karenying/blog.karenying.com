---
title: 'Dynamically Change Text Color Based on Background Color'
date: '2020-11-04T22:12:03.284Z'
template: 'post'
draft: false
slug: 'dynamically-change-text-color-based-on-bg'
tags:
  - 'UI/UX'
  - 'React'
  - 'Apps'
  - 'Tutorial'
description: '... to increase visual accessiblity. Even Facebook gets this wrong. Do you?'
socialImage: '/media/socialImages/dynamically-change-text-color-based-on-bg.png'
minutes: '3'
category: 'welp'
---

![gradient.png](/media/socialImages/dynamically-change-text-color-based-on-bg.png)_See it in action in [gradient.png](http://gradient-png.netlify.app/)_

**If you're only looking for implementation, [skip ahead](#implementation).**

## WCAG and Contrast Ratio
The [Web Content Accessibility Guidelines](https://www.w3.org/WAI/standards-guidelines/wcag/) (WCAG) aims to provide a set of standards for developers around the world -- to make web content more accessible to people with disabilities. 

Perhaps the most obvious applications of the WCAG are in visual accessibility. In this post we'll dive into the world of color contrast, specifically looking at scenarios where you would want to dynamically change text color based on the background color to increase readability.

In order to understand the motivation behind this, we have to first understand how to quantify the contrast between two colors. 

### Mathematical Representation of Colors
A quick crash course:
- Each color can be represented as a triplet of red, green, and blue values, with values between 0 and 255 -- this is the [RGB color space](https://en.wikipedia.org/wiki/RGB_color_space)
    - Red is `(255, 0, 0)`, green is `(0, 255, 0)`, blue is `(0, 0, 255)`
    - Eggplant purple is equal parts red and blue so it's `(128, 0, 128)`
- To digitize this RGB triplet, we have [HTML (Hex) color codes](https://en.wikipedia.org/wiki/Web_colors#Hex_triplet) which HTML/CSS uses
  - Hex codes are just the concatenation of RGB values in hexadecimal, often preceded by a `#` 
  - Red = `#ff0000`, green = `#00ff00`, blue = `#0000ff`, eggplant purple = `#800080`
- Hex codes only represent the RGB color space. There are many other color spaces such as [HSL/HSV/HSB](https://en.wikipedia.org/wiki/HSL_and_HSV), [CIELAB](https://en.wikipedia.org/wiki/CIELAB_color_space), and [CMYK](https://en.wikipedia.org/wiki/CMYK_color_model). Each serve different purposes but we'll be focusing on RGB for this post.

### Luminance
Now that we have a way to quantify colors, we can talk about [luminance](https://en.wikipedia.org/wiki/Relative_luminance), the preceived brightness of a color. This is the L value in the HSL color space. The mathematical model for [calculating luminance](https://planetcalc.com/7779/) is rather convoluted so I'll be glazing over it. All we need to know is that 
- it can be derived from an RGB triplet -- it's roughly a weighted average of the three values
- can be represented as a percentage, or as a value from 0 - 1 (what we'll be using)
- white is 1, black is 0 

### Contrast Ratio
The final piece is to calculate the [contrast ratio](https://webaim.org/articles/contrast/) between two colors, namely between a text color and its background color here. 

The formula is just the quotient between the brighter color's luminance (the bigger number) and the dark color's luminance (the smaller number):

$$
\textrm{ratio} = \frac{lum(\textrm{\textbf{brighter} color)} + 0.05}{lum(\textrm{\textbf{darker} color}) + 0.05}
$$

The contrast ratio of any two colors ranges between 1 (two of the same colors) to 21 (black and white). 

**The WCAG requires a contrast ratio of at least 4.5.**

There are three exceptions to the above rule:
- **Large text**: larger text is easier to read. Thus the required ratio is at least 3.0 for bigger text.
- **Incidental**: text that is for decorative/design purposes, not really meant to be read
- **Logos**

#### Examples

- Contrast ratio of **12.98** (good job Karen)
- <span style="color:#5d93ff">Contrast ratio of <b>4.77</b> (I could do better for links)</span>
- <span style="color:#767676;background-color:white">Contrast ratio of <b>4.54</b> (barely passable by WCAG standards)</span>
- <span style="color:white;background-color:#ffc300">Contrast ratio of <b>1.61</b> (terrible)</span>
- <span style="color:red;background-color:#de6262">Contrast ratio of <b>1.15</b> (brb my eyes are crying)</span>

## Use Cases
Before we get started coding, let's run through a couple of examples of where you would want to dynamically changed the text color based on its background color.

### Facebook Messenger
Messenger is what spurred this post. Facebook lets you change the chat default color from the typical blue to a variety of different options. This theme color the background color of all the messages *you* send. The messages you receive are typically with a dark gray background. 

![Facebook Messenger blue](/media/dynamically-change-text-color-based-on-bg/fb-blue.png#width=300px)<br>_Default Messenger blue_

![Facebook Messenger palette](/media/dynamically-change-text-color-based-on-bg/fb-palette.png#width=300px)<br> _Messenger solid palette. They change this up pretty often. Gradient options are also available 😍_

However, regardless of what color you pick, the text color is infuriatingly white.

![Facebook Messenger yellow](/media/dynamically-change-text-color-based-on-bg/fb-yellow.png#width=300px)<br> _Yellow theme in a group chat_

Remember this example from before? <span style="color:white;background-color:#ffc300">Contrast ratio of <b>1.61</b> (terrible)</span> 🙁
### gradient.png
I made a gradient generating [app](http://gradient-png.netlify.app/) a while back. The app lets you choose colors for a gradient, displaying the hex codes on the current colors.

![gradient.png](/media/socialImages/dynamically-change-text-color-based-on-bg.png)_Imperfect implementation for [gradient.png](http://gradient-png.netlify.app/)_

I calculated luminance for the colors and choose dark text if the luminance was below 50%. However, I didn't apply the contrast ratio formula, so this is an imperfect implementation. Still better than nothing though?

### Charts and Diagrams
![Pie chart](https://d2mvzyuse3lwjc.cloudfront.net/doc/en/UserGuide/images/Bar_Of_Pie_Chart/Bar_Of_Pie_Chart.png?v=83483)_Rando pie chart I found [online](https://www.originlab.com/doc/Origin-Help/Bar-Of-Pie)_

This concept might be most useful when you're displaying data with different colors, and you want to write text over each section.

## Implementation

### -1. Prereqs
This tutorial assumes you have some knowledge of JavaScript and React. All good? Let’s get started 👍🏼

### 0. Getting Started
We’ll use [Create React App](https://create-react-app.dev/docs/getting-started/) to create, bundle, and run the project:

```bash
$ npx create-react-app dyn-change-text-color
$ cd dyn-change-text-color
$ npm start
```

### 1. Template

### 2. Color Object

### 3. Luminance

### 4. Contrast Ratio

### 5. Piecing it all Together

## Conclusion

## Further Reading
- [Luminance/contrast ratio calculator](https://planetcalc.com/7779/)
- [More on contrast and color accessibility](https://webaim.org/articles/contrast/)
