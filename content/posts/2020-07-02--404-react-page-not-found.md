---
title: '404: React Page Not Found'
date: '2020-07-02T22:12:03.284Z'
template: 'post'
draft: false
slug: '404-react-page-not-found'
tags:
  - 'React'
  - 'Tutorial'
  - 'Web Dev'
description: 'How to avoid the dreaded "Page Not Found" bug for apps using React Router on Netlify'
socialImage: '/media/socialImages/404-react-page-not-found.png'
minutes: '5'
category: 'lol'
---

![Netlify’s 404 Page](https://miro.medium.com/max/1000/1*SykPj2Btn7Tff_I9S_oPNA.png)_Netlify’s 404 Page_

You just deployed your first [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) to Netlify. `Site is live` shows up in the scrolling deployment log. Success 🎉

You happily visit your new site and click around the relative links. Nice, [React Router](https://www.npmjs.com/package/react-router) has been putting in the work. Everything looks great.

You enter a path in the address bar that you know is handled with React Router... and get hit with "Page Not Found". Huh?

Convinced that you must’ve done something wrong, you spin up your app in your local dev environment and try to replicate the bug. But the routing is perfectly fine locally. It even works for the production version: `npm run build` and `serve -s build`. So what’s the problem here?

## Routing in Single-Page Applications

If you used [Create React App](https://reactjs.org/docs/create-a-new-react-app.html) (CRA) and [React Router](https://www.npmjs.com/package/react-router), your site is most likely a single-page application (SPA).

As opposed to traditional multi-page applications, SPAs only maintain one HTML file, commonly `index.html`. Instead of serving a different HTML file for each path, SPAs depend on _client-side routing_. With almost [3 million weekly downloads](https://www.npmjs.com/package/react-router), React Router is a popular client-side routing library.

In the simplest terms, React Router connects a path to a component. When the path is hit, React Router inserts the associated elements into the DOM tree, all without a page refresh.

However, for this process to work, the HTTP GET requests must only ever retrieve data from `index.html` — all the React Router logic is handled here. This means the server must direct all requests to `index.html`.

So why does this work locally? This is where Webpack comes in.

## Webpack

Ever wonder what exactly happens when you run `npm start` in your CRA?

`npm start` runs `react-scripts start` under the hood (check it out in your `package.json`). If we peek into the `react-scripts` folder under `/node_modules`, we see that CRA uses [Webpack](https://webpack.js.org/) to bundle and serve your app.

All of your app’s Webpack "settings" live in `webpackDevServer.config.js` and `webpack.config.js` under `/react-scripts/config`.

For the dev version of the app, Webpack sets the [History API Fallback option](https://webpack.js.org/configuration/dev-server/#devserverhistoryapifallback) as true. In `webpackDevServer.config.js`, Webpack is instructed to redirect all requests to paths.`publicUrlOrPath` which is the base url, http://localhost:3000/, that serves index.html:

![*Examining *webpackDevServer.config.js](https://cdn-images-1.medium.com/max/2000/1*O4aSF0dvgT5eOCSbCZaW2Q.png)_Examining `webpackDevServer.config.js`_

For the prod version which is served when you `npm run build` and `serve -s build`, we turn to `webpack.config.js`. Here, we have the [Navigate Fallback option](https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-webpack-plugin.GenerateSW) set to `paths.publicUrlOrPath + 'index.html'`:

![*Examining webpack.config.js*](https://cdn-images-1.medium.com/max/2000/1*LtOYcrdTX4B1f5l2RgjbdA.png)_Examining `webpack.config.js`_

Voila! Again, Webpack directs all traffic to `index.html`.

Great, this explains why it’s all good in your local environment but what about on Netlify?

## Netlify

Let’s go back to your production build on your local machine. When you run `npm run build`, Webpack bundles and minifies all your organized code into the `build` folder in your root directory. The contents of this folder are precisely what Webpack serves as the prod version locally, and what Netlify serves to the internet.

But have you ever tried serving your app with Python’s [http.server](https://docs.python.org/3.0/library/http.server.html)? It requires an `index.html` file so we can run it in your prod `build` folder:

```bash
$ cd /build
$ python3 -m http.server
```

Head over to http://localhost:8000/. Enter a path that you specified in React Router or click on a relative link and hit refresh. You should experience deja vu and see this 404 error message:

![Another 404 page 😞](https://cdn-images-1.medium.com/max/2000/1*O7lWHWWlnF3Ce3-B9TtOOA.png)_Another 404 page 😞_

**This is exactly what happens on Netlify.**

Netlify’s servers and Python’s http.server do not handle redirects to `index.html`. Even though Netlify serves what Webpack bundled, it doesn’t use Webpack to actually serve the page.

Everything works perfectly if you don’t manually enter an address or refresh the page. This is because you aren’t making a new request for these two actions. You’re not navigating away from `index.html` and React Router is doing its thing correctly. However, the moment you refresh or enter a URL, the site breaks.

What can you do about this?

### The Solution

Luckily, you can use Netlify’s [Redirect options](https://docs.netlify.com/routing/redirects/). To implement this, Netlify requires a file titled `\redirects` in the root directory. This one liner is where the magic happens:

```
/* /index.html 200
```

This rule specifies that all paths (`/*`) redirect to `/index.html` [without changing the URL in the browser address bar](https://docs.netlify.com/routing/redirects/redirect-options/) (`200`).

You can **either**

- put this `_redirects` file with the above line in the `public` folder of your app. Everything in this folder goes untouched into the root directory of `/build`.

**OR**

- add `&& echo ‘/* /index.html 200’ | cat >build/_redirects` to your `build` script in `package.json`. If you check the deployment logs, Netlify runs `npm build` before every deploy. This way, Netlify manually creates the `_redirects` file in the root directory every time.

With the addition of the `_redirects` file, we’ve replicated what Webpack does on your local machine.

## Conclusion

You’ve just successfully fixed the dreaded 404 Netlify bug! In the process we learned about how React Router works for SPAs, Webpack configurations, and Netlify redirection rules.

Since this is a [common](https://stackoverflow.com/search?q=react+router+404) problem, I found the fix easily by just Googling. It’s a one-liner after all. However, I couldn’t find a solid explanation for _why_ it worked. Hopefully this post fills in that hole.

Netlify isn’t alone! As we saw above, Python’s http.server is another culprit. This sneaky bug happens with any statically hosted SPA. As an alternative to redirects, [hash routing](https://itnext.io/why-using-hash-based-urls-in-your-react-spa-will-save-you-more-time-than-you-think-a21e2c560879) also allows SPA client-side routing. Definitely check it out if you’re interested.

### Further Reading

- [Solution for GitHub Pages](https://github.com/rafrex/spa-github-pages)

- [Solution for Heroku](https://hackernoon.com/deploying-any-react-app-to-heroku-1ee6db9b97d3)

- [Solution for Apache](https://www.sej-ko.dk/2017/03/29/routing-single-page-application-on-apache-with-htaccess/)

- [Solution with hash routing](https://itnext.io/why-using-hash-based-urls-in-your-react-spa-will-save-you-more-time-than-you-think-a21e2c560879)

Thanks for reading. Happy hacking!

---

<i>Originally [published](https://medium.com/javascript-in-plain-english/404-react-page-not-found-355b9352041e?source=friends_link&sk=df8e7824a1c93cd1604afc464282f78c) in [JavaScript In Plain English](https://medium.com/javascript-in-plain-english) on Medium<i>.
