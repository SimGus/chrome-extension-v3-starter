// This is the service worker script, which executes in its own context
// when the extension is installed or refreshed (or when you access its console).
// It would correspond to the background script in chrome extensions v2.

console.log("This prints to the console of the service worker (background script)")

// Importing and using functionality from external files is also possible.
importScripts('service-worker-utils.js')

// If you want to import a file that is deeper in the file hierarchy of your
// extension, simply do `importScripts('path/to/file.js')`.
// The path should be relative to the file `manifest.json`.

chrome.runtime.onMessage.addListener(
    async (message, sender, sendResponse) => {
        if (message.message === "addListToGoogleMaps") {
            console.log("adding list to Google maps");
            const localStorageDict = await chrome.storage.local.get("eaterToGoogleMapsList");
            console.log("localStorageDict", localStorageDict);
            const stringifiedStoredDict = localStorageDict["eaterToGoogleMapsList"];
            console.log("stringifiedStoredDict", stringifiedStoredDict)
            const storedDict = JSON.parse(stringifiedStoredDict);
            console.log("storedDict", storedDict);

            chrome.storage.local.set({"LIST_TO_CREATE": Object.keys(storedDict)[0]})
            chrome.tabs.create({url: "https://www.google.com/maps/@40.7271164,-73.994756,15z/data=!4m2!10m1!1e1"})
        } else if (message.message === "addPlacesToList") {
            console.log("adding places to list");
        }
    }
)
