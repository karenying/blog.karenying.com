---
title: 'GitHub Commit Bot to Stack Your Contributions Graph'
date: '2021-01-03T19:45:07-0500'
template: 'post'
draft: false
slug: 'github-commit-bot'
tags:
  - 'Apps'
  - 'Shitpost'
description: 'How to become the guy she told you not to worry about'
socialImage: '/media/socialImages/github-commit-bot.jpg'
category: 'ahh'
minutes: '4'
---

![meme](/media/socialImages/github-commit-bot.jpg)

_**Disclaimer**: This is a dumb post. I like making useless things. No one cares what your contributions graph looks like._

Are you trying to impress recruiters and / or that cute coworker you noticed on a company-wide Zoom call last week? Do you feel inadequate when you have a dick-measuring contest with the boys via how many commits you push up daily? Or do you just have commitment issues? Don't worry, I'm not here to judge.

## Implementation

_**⚠️ Warning**: This bot was configured on macOS Catalina. It has **NOT** been tested on anything else. Setting it up can also cause security vulnerabilities. **Implement at your own risk.** ⚠️_

We use a python script to randomize and execute the commits -- it'd be weird if you committed the same amount of times every day. Then we run a daily local cron job to execute the script.

### 1. Clone my repo

```bash
git clone https://github.com/karenying/commit-bot.git
```

There are two files in this repo: `app.py` and `output.txt`.

Let's take a look at `app.py`:

```python
# Header: app.py

from os import system
from random import randint

THRESHOLD = 3
MAX_COMMITS = 3

def commit():
  system("echo $(date) >> output.txt")
  system("git add output.txt")
  system("git commit -m Update output.txt")
  system("git push")

if (randint(0, 10) > THRESHOLD):
  for i in range(randint(0, MAX_COMMITS)):
    commit()
```

We use the `os` module to execute bash commands. The `commit` function writes the current datetime to `output.txt`, adds, commits, and pushes the change.

In order to randomize, we generate a random integer between 0 and 10, check if it's greater than a set threshold; The larger the threshold, the **less** frequently the commits will occur. If it so happens that the random int passes the threshold on this certain day, we generate another random int between 0 and `MAX_COMMITS`, and commit that many times.

**Change `THRESHOLD` and `MAX_COMMITS` to suit your needs.** Feel free to change the commit message as well.

### 2. Create a new private repo

Go to https://github.com/ and create a new repo. Name it whatever you want but make sure you hit private:

![private repo](/media/github-commit-bot/private_repo.png)

Now we need to connect our cloned repo to this newly created repo repo:

```bash
rm -rf .git
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/[USERNAME]/[REPO NAME].git
git push --set-upstream origin master
```

Great. Now if you visit your new repo on GitHub, you should see `app.py` and `output.txt`.

**One more thing.** On your profile, check that private contributions are on:
![private contriutions](/media/github-commit-bot/private_contributions.png)

### 3. Grant Full Disk Access to cron

We need to give cron access to your files in order for it to run `app.py`.

_**⚠️ Warning**: This is **NOT** a great security practice. A malicious person / program could create cron jobs that also have Full Disk Access and modify your data. ⚠️_

Navigate to **System Preferences > Security & Privacy > Privacy > Full Disk Access**:

![full disk access](/media/github-commit-bot/full_disk_access.png)

Click the 🔒 and then the + sign. Open _Go to Folder_ with `⌘ + ⇧ + G` and enter the path `/usr/sbin/cron`. Select the cron program and click _Open_. Click the lock again.

### 4. Save GitHub credentials on disk

Cron also needs access to your GitHub credentials. So we're gonna cache them on your computer.

_**⚠️ Warning**: This is **NOT** a great security practice. It stores your GitHub credentials as plaintext on your computer. This means that everyone on your computer can access them including malicious NPM packages. ⚠️_

```bash
git config credential.helper store
```

### 5. Create a cron job

Finally, we're ready to schedule our cron job. We'll be using crontab which is native to macOS / linux.

First, pick when you want the cron job to run. For example, I picked 10:30 AM every day because I know my computer will most likely be active then. You can see this [site](https://crontab.guru/) if you're unfamiliar with cron syntax. For 10:30 AM daily, the cron job time prefix would be `30 10 * * *`.

Then following this prefix, we have the command that we want the job to execute: `cd [PATH TO FOLDER] && python3 app.py`.

Here's my job with the time and command together:

```bash
30 10 * * * cd ~/Documents/commit-bot && python3 app.py
```

Now we need to add this job.

In your terminal:

```bash
crontab -e
```

This will open up a Vim editor. Paste the one line from above into the file. Write and quit with `:wq`.

And that's it! Hopefully after these steps, you've successfully set up your commit bot.

## Conclusion

Security vulnerabilities aside, this commit bot will stack your contributions graph. You're welcome. Now when people see your GitHub profile, they will think _damn this person codes_.

Congrats, you are now officially the guy she told you not to worry about.

_Thanks for reading. Happy hacking!_
