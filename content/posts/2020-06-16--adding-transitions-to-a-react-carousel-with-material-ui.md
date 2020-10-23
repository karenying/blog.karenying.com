---
title: 'Adding Transitions to a React Carousel with Material-UI'
date: '2020-06-16T22:12:03.284Z'
template: 'post'
draft: false
slug: 'adding-transitions-to-a-react-carousel-with-material-ui'
tags:
  - 'Web Dev'
  - 'React'
  - 'Tutorial'
description: 'PowerPoint-esque slide animations + React carousel'
socialImage: '/media/gutenberg.jpg'
minutes: '5'
category: 'lol'
---

![](https://miro.medium.com/max/1919/1*0O9l9rnEB6WfxU1wMziprg.png)_Carousel on my personal site_

Interested in jazzing up a boring React carousel? In this post, we use [Material-UI](https://material-ui.com/), an insanely popular and easy-to-use React library, to add sliding transitions.

**Bonus**: stick around to see how to implement arrow-key navigation controls.

If you are only interested in the transitions, skip ahead to **step 4**, else we’re coding this carousel from scratch. There are already a bunch of [npm packages](https://www.npmjs.com/search?q=react%20carousel) for React carousels, but implementing it ourselves gives us more customization flexibility. It’s also fun and pretty simple!

The **GitHub repo** for all the code below can be found [\*\*here](https://github.com/karenying/react-carousel)**. See the deployed version [**here](https://react-carousel-with-transitions.netlify.app/)\*\*.

### Prereqs

This tutorial assumes you have some knowledge of React, function components, and hooks. All good? Let’s get started 👍🏼

## Implementation

### 0. Getting set up

We’ll use [Create React App](https://create-react-app.dev/docs/getting-started/) to create, bundle, and run the project:

    $ npx create-react-app react-carousel
    $ cd react-carousel
    $ npm start

…and add some dependencies — Material-UI for the transitions, and [React Icons](https://www.npmjs.com/package/react-icons) for the cute arrows:

    $ npm install @material-ui/core
    $ npm install react-icons

Before we start creating components, we need to update App.css to use CSS Flexbox to format our page:

<iframe src="https://medium.com/media/15657186c97ac1aa83f9eb72f45726e9" frameborder=0></iframe>

Yay let’s write some React components!

### 1. Setting up slide component

In a new file, CarouselSlide.js, we’re going to create our slide component which takes in a single prop, content.

content will be a JS object with the properties backgroundColor, and title which will determine the background color and the title of the current slide respectively (obviously 😛).

We’re also using Material-UI’s [Card](https://material-ui.com/components/cards/) component and makeStyles hook to style the slide. More info on Material-UI custom styling can be found [here](https://material-ui.com/styles/basics/).

Here’s the code for CarouselSlide.js:

<iframe src="https://medium.com/media/d0d10034a772e681cf234d2c0261560d" frameborder=0></iframe>

To get the slide to render, we’ll create some props for content and update App.js:

<iframe src="https://medium.com/media/f9b498651cd36ef0f836c45b5ec602d4" frameborder=0></iframe>

Okay! After running npm start, we should see something like this on [http://localhost:3000/](http://localhost:3000/):

![](https://cdn-images-1.medium.com/max/3950/1*SH6tdc5wzNrklOiCrvYllA.png)

Super super simple. Now let’s add some more content to iterate through in our carousel.

### 2. Generating slide content

We’re gonna put all our slide info in a new file called constants.js. It’ll take the shape of an array of objects that have the same structure as the content prop we worked with above:

<iframe src="https://medium.com/media/678310b958fc3520f990c60228fddbd8" frameborder=0></iframe>

With constants.js, we can refactor App.js to import and index into SLIDE_INFO:

<iframe src="https://medium.com/media/65013150c622bb9ddb47cadc8eae25c9" frameborder=0></iframe>

Since we indexed into the 4th item, the rendered slide should be yellow with the title “Slide 4”:

![](https://cdn-images-1.medium.com/max/3722/1*zSsw45LvQ35lrTre7WveCQ.png)

### 3. Changing content on click with arrows

Time to add some arrows.

We’re just gonna create a super simple Arrow function component that takes in a direction and click function. We’ll use some arrow SVGs from React-Icon. Adding it to App.js:

<iframe src="https://medium.com/media/1baf5dd5bfd02caf1a41b07c1c039bd0" frameborder=0></iframe>

Next, we need to implement the click handler.

We’ll use the useState hook to keep track of which slide we’re currently on with the state variable index. Then we use this state variable to index into SLIDE_INFO.

The right and left click handlers need to increment and decrement index respectively to change the currently rendered slide.

Instead of handling the two directions separately, like the Arrow component above, we’ll combine the logic in one function called onArrowClick.

onArrowClick takes in a direction and updates index appropriately:

<iframe src="https://medium.com/media/0ead5060f50baac96f0c9f3d19bd1465" frameborder=0></iframe>

Note: in **line 7** above, we add numSlides to the sum of index and increment and mod it by numSlides. This ensures that we always be within the range of 0 and numSlides — 1 to stay in bounds.

Finally, we update the return statement of App.js to render the arrows:

<iframe src="https://medium.com/media/c905dc79da64900b578e273ce0c5913c" frameborder=0></iframe>

and style the arrow SVGs in App.css:

<iframe src="https://medium.com/media/a904fd35aae0b233dac7579cb7c03d7e" frameborder=0></iframe>

After this step, we have a working carousel:

![](https://cdn-images-1.medium.com/max/2116/1*3-6baS3AFM3ad7lCUkAbtw.gif)

…but it looks awfully plain 😞 Let’s add some transitions!

### 4. Adding transitions with Material-UI

The transition we’re using is Material-UI’s [Slide API](https://material-ui.com/api/slide/). We’ll have to create two new state variables: slideIn, and slideDirection to correspond with Slide’s in and direction props respectively.

in dictates when the component appears if true, and when the component exits if false.

direction dictates where the component _enters from_. This means that without changing direction, the component enters and exits from the same direction. This is not the desired effect we want for a carousel! The slides must enter and exit from opposite directions to give the appearance of moving left or right across the page. Thus, we need to change direction in between setting in from false to true.

We also need to use setTimeout so that the previous slide has time to exit before the next slide enters.

After updating slideIn and slideDirection in onArrowClick, we’ve added:

<iframe src="https://medium.com/media/432246aca16fbd98d176bfd89f5658f5" frameborder=0></iframe>

Note: in **line 2**,\*\* \*\*we set the initial value of slideDirection to ‘down’ so the carousel slides down on the first render.

Finally, we want to wrap our CarouselSlide component with an extra div since Material-UI’s Slide’s child “[needs to be able to hold a ref](https://material-ui.com/guides/composition/#caveat-with-refs).” Then we pass in our state variables into Slide and our updated return statement now looks like:

<iframe src="https://medium.com/media/30882a1092091c317cb8cae6a2d0961e" frameborder=0></iframe>

Yay 🎉

We got the slide transitions to work. This is what the carousel should look like now:

![](https://cdn-images-1.medium.com/max/2116/1*6U-7al8M3bAs0-4uTNtlfg.gif)

If you think the transitions are too fast, you can use the timeout prop from the [Slide API](https://material-ui.com/api/slide/) and adjust it to your speed.

Anyways, it looks great 😅 Good job!

But how nice would it be if you could navigate through the carousel with just **arrow keys**? Luckily, it’s only a couple of lines of code.

### 5. Binding arrow keys for navigation

We just have to add a keydown event listener and call onArrowClick for the appropriate direction. Remember to cleanup the event listener when the component unmounts!

We can put all the key handling logic in useEffect:

<iframe src="https://medium.com/media/d0fb6f4cbac9ca9fd293210ee7d3b184" frameborder=0></iframe>

Woohoo! We’re officially done 🙂

If you got lost along the way, here’s the [\*\*GitHub repo](https://github.com/karenying/react-carousel)**. The commits correspond with each of the steps listed above. You can also play with the [**deployed version](https://react-carousel-with-transitions.netlify.app/)\*\*.

## Extensions

Here are some more things you can do to add to your simple carousel:

- Add images

- Make it responsive: Material-UI makes it pretty easy with [breakpoints](https://material-ui.com/customization/breakpoints/) and their [Hidden](https://material-ui.com/components/hidden/) component

- Use other Material-UI [transitions](https://material-ui.com/components/transitions/)

## Conclusion

In this tutorial, we implemented a React carousel from scratch. Then we added slide transitions with Material-UI and key controls! I’ve added a couple of suggestions above on how to take it to another level.

Carousels look great on personal sites, blogs, and product sites. Jazzing it up makes them more interesting and interactive.

Thanks for reading. Happy coding!
