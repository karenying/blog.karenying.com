---
title: 'Simple React Router Nav Bar'
date: '2020-11-21T03:16:38Z'
template: 'post'
draft: false
slug: 'nav-bar-with-dots'
tags:
  - 'React'
  - 'Tutorial'
description: 'Using React Router and clever CSS to create a nav bar with dots to show hover and active state'
socialImage: '/media/socialImages/nav-bar-with-dot.png'
minutes: '4'
category: 'anotha react tutorial'
---

![react router](/media/socialImages/nav-bar-with-dot.png)

One of my favorite things is simple UI state indicators. The nav bar on my personal [site](https://karenying.com/) utilizes dots under the links to convey hover and active state. It's minimalist yet effective:

![karen nav bar](/media/nav-bar-with-dot/karen-nav-bar.gif)_Miss me with the dark blue/purple visited links 🤮 Please visit my [site](https://karenying.com/) to see a demo...this GIF quality is so bad_

In this tutorial, we walk through how to code this nav bar.

## Implementation

### -1. Prereqs

This tutorial assumes you have some knowledge of JavaScript and React. All good? Let’s get started 👍🏼

### 0. Getting Started

We’ll use [Create React App](https://create-react-app.dev/docs/getting-started/) to create, bundle, and run the project:

```bash
$ npx create-react-app nav-bar-dot
$ cd nav-bar-dot
$ npm start
```

### 1. Adding Pages

Let's add three pages: home, about, and contact. We'll keep it simple and only render the title of each:

```jsx
// Header: App.js
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

const Contact = () => (
  <div>
    <h2>Contact</h2>
  </div>
);
```

### 2. Routing Pages

Now we need to route them. We'll be using [React Router Dom](https://reactrouter.com/web/guides/quick-start):

```bash
npm install react-router-dom
```

As per the quick start tutorial, we wrap all our `Route`s in a `Router` component. We'll route both the root URL and `/home` to the `Home` component.

```jsx
// Header: App.js
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div className='App'>
      <Router>
        <Route exact path='/' component={Home} />
        <Route exact path='/home' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
      </Router>
    </div>
  );
}
```

If we run the app, and manually visit http://localhost:3000/about, we should see the About page.

### 3. Creating Nav Bar

We then create a new file called `Header.js` and a new component called `HeaderLink` inside it. Each `HeaderLink` will route to the page it's passed:

```jsx
// Header: Header.js
import { Link } from 'react-router-dom';

import './Header.css';

const HeaderLink = ({ page }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);

  return <Link to={`/${page}`}>{title}</Link>;
};
```

Here, we use React Router's `Link` [component](https://reactrouter.com/web/api/Link). The `to` prop accepts a string that's the path. In our case, it will be either `'home'`, `'about'`, or `'contact'`.

Now we'll create our parent component called `Header` which calls `HeaderLink` with all our pages:

```jsx
// Header: Header.js
const Header = () => {
  return (
    <div className='header'>
      <HeaderLink page='home' />
      <HeaderLink page='about' />
      <HeaderLink page='contact' />
    </div>
  );
};

export default Header;
```

If we toss our `HeaderLink` component into `App.js`, we should see a super plain nav bar that works as expected:

![bare bones nav bar](/media/nav-bar-with-dot/basic-nav-bar.png#width=300px)<br>_Bare bones nav bar_

Let's style it a bit:

```jsx
// Header: Header.js
<Link to={`/${link}`} className='headerlink-title'>
  {title}
</Link>
```

```css
// Header: Header.css
.header {
  display: flex;
  justify-content: center;
}

.headerlink-title {
  color: black;
  text-decoration: none;
  padding: 0 5px;
}
```

And we should have something slightly better:

![slightly styled nav bar](/media/nav-bar-with-dot/slightly-styled-nav-bar.png#width=300px)<br>_Slightly styled nav bar_

Yay we just created a fully functioning nav bar. Now we can move onto the fun part: adding a hover and selected state.

### 4. Adding Hover/Selected Indicator

In order to know which page the user is currently visiting, we use route params.

To render the `Header` component, instead of setting a fixed path, we append our `page` param (variable name), to a colon. This lets React Router know that `page` is the variable name for the path.

```jsx
// Header: App.js
<Route path='/:page' component={Header} />
```

And we add this new `Route` to `App.js`:

```jsx
// Header: App.js
<Router>
  <Route path='/:page' component={Header} />

  <Route exact path='/' component={Home} />
  <Route exact path='/home' component={Home} />
  <Route exact path='/about' component={About} />
  <Route exact path='/contact' component={Contact} />
</Router>
```

In order to grab this `page` variable in our `Header` component, we use the `useParams` [hook](https://reactrouter.com/web/api/Hooks/useparams).

`useParams().page` will return the value of our `page` variable, which is also the slug after the root URL. With this info, we can pass a `selected` prop to `HeaderLink`:

```jsx
// Header: Header.js
import { Link, useParams } from 'react-router-dom';

const Header = () => {
  const { page } = useParams();

  return (
    <div className='header'>
      <HeaderLink page='home' selected={page === 'home'} />
      <HeaderLink page='about' selected={page === 'about'} />
      <HeaderLink page='contact' selected={page === 'contact'} />
    </div>
  );
};
```

so that `HeaderLink` knows if its link is selected or not.

We currently have a slight bug. If we visit the root URL (usually http://localhost:3000), the nav bar doesn't show up. Why? Because `path='/:page'` doesn't apply since `page` is null.

We can catch that by hardcoding `Header` to show up for the root path:

```jsx
// Header: App.js
<Router>
  <Route path='/:page' component={Header} />
  <Route exact path='/' component={Header} />

  <Route exact path='/' component={Home} />
  <Route exact path='/home' component={Home} />
  <Route exact path='/about' component={About} />
  <Route exact path='/contact' component={Contact} />
</Router>
```

Since `useParams()` wouldn't return anything in this case, we have to tweak the `page` variable in `Header.js` to default to `'home'`:

```jsx
// Header: Header.js
const page = useParams().page || 'home';
```

Great, with that taken care of, we can finally style our hover and selected state!

Let's add some CSS classes to our `HeaderLink` component:

```jsx
// Header: Header.js
<Link to={`/${page}`} className='headerlink-title'>
  {title}
  <div className={selected ? 'headerlink-dot-active' : 'headerlink-dot'}>•</div>
</Link>
```

And their respective properties:

```css
// Header: Header.css
.headerlink-dot {
  margin-top: -0.5rem;
  opacity: 0;
  transition: opacity 200ms linear;
}
.headerlink-title:hover .headerlink-dot {
  opacity: 1;
}

.headerlink-dot-active {
  margin-top: -0.5rem;
  display: block;
}
```

This CSS allows the dot to show up when `headerlink-title` is hovered over. The `transition` property of `.headerlink-dot` lets the appearance look smoother.

If we play around with our new styled nav bar, we should see this:

![demo](/media/nav-bar-with-dot/demo.gif)

It looks so nice and smooth 😊

One final detail: we don't want `cursor: pointer` or any click events for the `HeaderLink` of the currently selected page.

We can easily fix that with the addition of another class:

```jsx
// Header: Header.js
  let className = selected ? 'headerlink-no-link ' : '';
  className += 'headerlink-title';

  return (
    <Link to={`/${page}`} className={className}>
```

```css
// Header: Header.css
.headerlink-no-link {
  pointer-events: none;
}
```

And we're officially done 🎉

## Conclusion

In this tutorial, we learned how to set up a nav bar with React Router. Then we added a hover/active state as visual feedback to the user.

If you got lost along the way, check out my GitHub [repo](https://github.com/karenying/nav-bar-with-dots). You can also see the live version [here](https://nav-bar-with-dots.netlify.app/).

If you decide to deploy your React app with [Netlify](https://www.netlify.com/), read about enabling redirects on Netlify to fix client-side routing for SPAs [here](https://www.blog.karenying.com/posts/404-react-page-not-found).

Thanks for reading. Happy hacking!
