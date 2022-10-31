// This script gets injected into any opened page
// whose URL matches the pattern defined in the manifest
// (see "content_script" key).
// Several foreground scripts can be declared
// and injected into the same or different pages.

console.log("-------------------------------------------")
console.log("This prints to the console of the page (injected only if the page url matched)")
console.log("-------------------------------------------")

let button = document.createElement("button");
document.body.appendChild(button);
button.innerHTML = "Add list to Google Maps";
button.id = "add-to-google-maps-button";

let articleTitle = document.querySelector('#content > section:nth-child(1) > div.c-mapstack__lede-image > div.c-mapstack__headline-wrap > div > h1').innerHTML

button.addEventListener("click", async () => {
    const listContainer = document.getElementById("content");
    const googleMapsLinks = listContainer.querySelectorAll("a.p-button[href^='https://www.google.com/maps/search/']");
    const googleMapsLinkURLs = Array.from(googleMapsLinks).map((link) => {
        return link.href;
    })
    const articleTitle = document.querySelector('#content > section:nth-child(1) > div.c-mapstack__lede-image > div.c-mapstack__headline-wrap > div > h1').innerHTML

    const localStorageDict = {
        [articleTitle]: [
            googleMapsLinkURLs
        ]
    }
    
    chrome.storage.local.set({"eaterToGoogleMapsList": JSON.stringify(localStorageDict)})

    console.log("sendMessage");
    chrome.runtime.sendMessage({
        message: "addListToGoogleMaps"
    });
});
