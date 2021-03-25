<div align="center">
    <img src="https://raw.githubusercontent.com/SimGus/chrome-addon-v3-starter/master/logo/logo-128.png"/>
    <h1>Chrome Addon v3 Starter</h1>
    <h3>A minimal template of a Chrome v3 extension</h3>
</div>

This repository contains a minimal Chrome/Chromium extension that uses the newest version of the manifest (v3).

You can use it as a basis to develop an extension.
It can also give you more insights about how to turn a v2 extension to v3.

In other words, this is a **working, installable v3 extension** meant for you to **jumpstart** the development of your own extension.


## Installation
- **Clone** this repo.
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

> How do I **uninstall** this extension from my browser?

- Go to the [extensions page](chrome://extensions): chrome://extensions.
  There should be a card with the name of this extension as title.
  If you don't see such a card, it means the extension is not installed.
- Simply click the _Delete_ button at the bottom of the card. Click _ok_ if a popup asks you for confirmation. The extension is now uninstalled.

## External resources
- [Official feature summary for manifest v3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-overview/)
- [Migrating from v2 to v3](https://developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/) + [very useful checklist once you think you are done](https://developer.chrome.com/docs/extensions/mv3/mv3-migration-checklist/)
- [Excellent write-ups of a migration](https://github.com/kentbrew/learning-manifest-v3)
- [Another example of a v3 extension (older code)](https://gist.github.com/dotproto/3a328d6b187621b445499ba503599dc0)
