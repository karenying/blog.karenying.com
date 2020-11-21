---
title: 'Nav Bar with Dot'
date: '2020-11-21T03:16:38Z'
template: 'post'
draft: false
slug: 'nav-bar-with-dot'
tags:
  - 'React'
  - 'Tutorial'
description: 'Using React Router to create a nav bar with dots to show active status'
socialImage: ''
minutes: '5'
category: 'anotha react tutorial'
---

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

```bash
npm install react-router-dom
```

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

### 3. Creating Nav Bar

```jsx
// Header: Header.js
import { Link } from 'react-router-dom';

import './Header.css';

const HeaderLink = ({ page }) => {
  const title = page.charAt(0).toUpperCase() + page.slice(1);

  return <Link to={`/${page}`}>{title}</Link>;
};

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

![bare bones nav bar](/media/nav-bar-with-dot/basic-nav-bar.png#width=300px)<br>_Bare bones nav bar_

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

![slightly styled nav bar](/media/nav-bar-with-dot/slightly-styled-nav-bar.png#width=300px)<br>_Slightly styled nav bar_

### 4. Adding Hover/Selected Indicator

```jsx
// Header: App.js
<Route path={'/:page'} render={({ match }) => <Header match={match} />} />
```

```jsx
// Header: App.js
<Router>
  <Switch>
    <Route path={'/:page'} render={({ match }) => <Header match={match} />} />
    <Redirect to={'/home'} />
  </Switch>
  <Switch>
    <Route exact path='/' component={Home} />
    <Route exact path='/home' component={Home} />
    <Route exact path='/about' component={About} />
    <Route exact path='/contact' component={Contact} />
  </Switch>
</Router>
```

```jsx
// Header: Header.js
const Header = ({ match }) => {
  console.log(match);

  return (
    <div className='header'>
      <HeaderLink page='home' />
      <HeaderLink page='about' />
      <HeaderLink page='contact' />
    </div>
  );
};
```

![console](/media/nav-bar-with-dot/console.png)_Peeping `match`_

```jsx
// Header: Header.js
const Header = ({ match }) => {
  const { page } = match.params;

  return (
    <div className='header'>
      <HeaderLink page='home' selected={page === 'home'} />
      <HeaderLink page='about' selected={page === 'about'} />
      <HeaderLink page='contact' selected={page === 'contact'} />
    </div>
  );
};
```

```jsx
// Header: Header.js
<Link to={`/${page}`} className='headerlink-title'>
  {title}
  <div className={selected ? 'headerlink-dot-active' : 'headerlink-dot'}>•</div>
</Link>
```

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

![demo](/media/nav-bar-with-dot/demo.gif)_It works!_

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

## Conclusion

Read about enabling redirects on Netlify to fix client-side routing for SPAs [here](https://www.blog.karenying.com/posts/404-react-page-not-found).
