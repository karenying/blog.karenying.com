---
title: 'Let 2020 be the year PNG icons die'
date: '2020-06-14T22:12:03.284Z'
template: 'post'
draft: false
slug: 'let-2020-be-the-year-png-icons-die'
tags:
  - 'Web Dev'
  - 'HTML'
  - 'Front End'
description: 'Examining a trendy store’s mysteriously blurry rating stars and proposing a solution'
socialImage: '/media/gutenberg.jpg'
minutes: '4'
category: 'lol'
---

![](https://miro.medium.com/max/4800/1*1NsyodtGxXetMW1l647hrQ.png)_Marine Layer website_

Marine Layer is a trendy, up-and-coming, [sustainable](https://www.marinelayer.com/pages/ml-sustainability) clothing company that sells basic and minimalistic pieces. They’ve always had a large online presence, with only a handful of brick-and-mortar stores around the United States.

I finally clicked on one of their multiple Facebook and Instagram targeted ads and browsed around before **I noticed that their rating stars around the site mysteriously appear blurry:**

![](https://cdn-images-1.medium.com/max/2000/1*seYUcnlWKL69F9tL1ooBRw.png)

![Blurry rating stars](https://cdn-images-1.medium.com/max/2000/1*fOQy43QP6JzjuTQzDYL2nQ.png)_Blurry rating stars_

It was one of those things that once you notice, you REALLY notice, and starts to bother you. As someone who is curious about web development in general, I right-clicked on the stars and inspected the element. Lo and behold, the site uses a **PNG** to render the stars:

![Examining the element panel](https://cdn-images-1.medium.com/max/3630/1*N7txBvnYOdOi5K4uS19CmA.png)_Examining the element panel_

Clicking on the [image url](https://yotpo-editor-production.s3.amazonaws.com/b7vMGctRljJrLQFPo1ElbKAhIoBinsgbM6vucZ85/sprite-sheet.png) brings us this image stored on AWS:

![Tiny, low quality PNG](https://cdn-images-1.medium.com/max/2000/1*f1W84jxyYTlOoNDI8BY5cA.png)_Tiny, low quality PNG_

Named _sprite-sheet.png_, this tiny 5kb, 216x45 image is how [Yotpo](https://www.yotpo.com/), Marine Layer’s site creator, is rendering every single rating star. They “crop” this larger image that shows all the possible combinations of size and fill of stars and use it as the background-image property of the star’s <span> tag’s CSS.

The problem here is that the image is so small and low quality to begin with, that it will always appear blurry at their displayed size.

## The Solution

**SVGs** are Scalable Vector Graphics, meaning that the graphic can be scaled to any side, without a loss in quality! They have become the preferred format for use cases just like this, small icons. Most major sites utilize SVGs in some form or another already and it’s time for everyone to get onboard.

Coding a simple star like this from scratch is quite easy.

HTML’s `<svg>` tag acts as a container for SVGs, allowing the graphics to be rendered on a page. The following lines of code define a half-filled star in the form of an SVG:

    <svg width="5cm" height="5cm" viewBox="0 0 500 500"
        <defs>
            <linearGradient id="half_fill">
                <stop offset="50%" stop-color="#646b73"/>
                <stop offset="50%" stop-opacity="0" />
            </linearGradient>
        </defs>
        <polygon fill="url(#half_fill)" stroke="#646b73" stroke-width="10" points="350,75 379,161 469,161 397,215 423,301 350,250 277,301 303,215 231,161 321,161" />
    </svg>

First, we use a “gradient” to create the half-filled look. Then the polygon element draws the star, using the gradient fill we defined earlier and the points as coordinates. This is the final product:

![Half star created as an SVG but converted to PNG format](https://cdn-images-1.medium.com/max/2000/1*PdyTnMz4nf_GblPuRHhqDA.png)_Half star created as an SVG but converted to PNG format_

_Medium doesn’t support uploading SVGs so I converted it to PNG to display in this article. Hence, this star above doesn’t have the infinite resolution properties of the SVG we coded._

To generate the empty star or filled star, we can just replace the fill property of the polygon tag with the gray color: "#646b73", or “none”.

Feel free to fiddle around with the SVG code in this [online viewer](https://www.freecodeformat.com/svg-editor.php).

## Conclusion

SVGs should be used over PNGs for small icons such as rating stars on a shopping site. They preserve resolution, are lightweight, and can be customized and animated in pretty much any imaginable way. The only downside is that there might be limited support in older browsers (like IE8 and below), and in this case, PNGs would be a great fallback.

Small details like blurry icons can really expose the lack of attention to detail to a site. Akin to typos, it just looks unprofessional and careless. To avoid such a blunder, use SVGs! You can either create your own, or utilize one of the multiple available SVG [libraries](https://www.webdesignerdepot.com/2018/02/8-best-free-libraries-for-svg/).

Thanks for reading. Happy coding!
