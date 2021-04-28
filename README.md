<div align="center">
    <img src="https://raw.githubusercontent.com/SimGus/chrome-addon-v3-starter/master/logo/logo-128.png"/>
    <h1>Chrome Extension v3 Starter</h1>
    <h3>A minimal template of a Chrome v3 addon</h3>
</div>

This repository contains a minimal Chrome/Chromium extension that uses the newest version of the manifest (v3).

You can use it as a basis to develop an extension.
It can also give you more insights about how to turn a v2 extension to v3.

In other words, this is a **working, installable v3 extension** example meant for you to **jumpstart** the development of your own extension.


## Installation
- **Fork** this repo, then **clone your forked repo locally**. If you don't have a github account, you can simply download a zip of the repo and unzip it on your computer.
- **Open [the extensions page](chrome://extensions)** in your browser: `chrome://extensions`. This link works on any chromium-based browser.
- If you did not do it already, **toggle the "developer mode"**. This is usually a toggle button at the top right of the extensions page.
- Click the button **_load unpacked extension_**.
- In the window that pops up, **select the folder that contains this minimal extension**, then **click _ok_**.
- **Done!** A new extension called _Chrome Addon v3 Starter_ should have appeared in the list.

## Q&A
> Does this work only on Chrome or on **other web browsers** as well?

At the moment, this works on every chromium-based web browser that supports v3 extensions.
Therefore, you should be able to install this extension on any of the following browsers (as long as they are up-to-date):
- _Free and open-source browsers_:
    - Chromium
    - Brave
- _Proprietary browsers_:
    - Chrome
    - Edge
    - Vivaldi
    - Opera

> So it doesn't work on **Firefox** or **Safari**?

No, Firefox uses a different extension format. That being said, it is usually not too hard to port extensions from Chrome to Firefox.
Read [their porting documentation](https://extensionworkshop.com/documentation/develop/porting-a-google-chrome-extension/) for more information.

Safari uses yet another extension format and porting is usually harder.
You can find more information [here](https://bartsolutions.github.io/2020/11/20/safari-extension/).

> Does this work on **Chrome for Android/iOS**?

Chrome for mobile doesn't currently support extensions.

> I don't need a **popup tool** for my extension! Can I remove it?

Yes, simply delete the `popup` folder and remove the `default_popup` property from the manifest.

> I changed some code in the extension, but my **changes aren't taken into account**!

For most of the changes you make, you will need to reload your extension for the changes to be applied.
To do that, go to the chrome://extensions page and click the reload button of your extension.
Note that most of the changes you will make to the settings page or the popup don't require reloading the extension.

> Can I follow a **tutorial about a v2 extension** with this?

Most of what you will find in those tutorials still holds with v3.

However, a few things (notably best practices) have changed.
You should read the [official migration page (v2 to v3)](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/) before following such a tutorial.

> When I make an erroneous change in my service worker, the extension doesn't load! How can I **debug a service worker**?

Using the debugger if your service worker is not loaded is not possible.

However, if you want to test some piece of code before putting it in your service worker, you can:
- load your extension with a working version of the service worker.
- click on "service worker" on the page _chrome://extensions_. This will open the console attached to the service worker.
- paste your code in the console and see if any error is logged.

Note that in this console, you have access to anything your service worker has access to, including its variables, functions and chrome APIs.

> How do I **uninstall** this extension from my browser?

- Go to the [extensions page](chrome://extensions): chrome://extensions.
  There should be a card with the name of this extension as title.
  If you don't see such a card, it means the extension is not installed.
- Simply click the _Delete_ button at the bottom of the card. Click _ok_ if a popup asks you for confirmation. The extension is now uninstalled.

> I want to **push my changes to my own repo**, how do I do this?

- If you forked this repo and cloned your own fork locally, git will push to your fork on your account automatically (i.e. use the command `git push` or `git push origin <your-branch>`).

- If you downloaded a zip or simply cloned this repo locally, do the following:
    - Create a github account if you don't already have one and install git on your machine.
    - Create a new (empty) repo on your github and copy its url.
    - Open a terminal in the folder where the extension is cloned.
    - Run the command `git init`, then `git commit -am "Initial commit"`
    - Run the command `git remote add origin <url-of-your-repo>`
    - Run `git push -u origin master`. The extension code is now on your repo, on brnach _master_.
    - If you want, you can make the _master_ branch the default one and delete the _main_ branch in the settings of your repo.

## External resources
- [Official feature summary for manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)
- [Migrating from v2 to v3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/) + [very useful checklist once you think you are done](https://developer.chrome.com/docs/extensions/mv3/mv3-migration-checklist/)
- [Excellent write-ups of a migration](https://github.com/kentbrew/learning-manifest-v3)
- [Another example of a v3 extension (older code)](https://gist.github.com/dotproto/3a328d6b187621b445499ba503599dc0)
