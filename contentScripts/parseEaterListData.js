let button = document.createElement("button");
document.body.appendChild(button);
button.innerHTML = "Add list to Google Maps";
button.id = "add-to-google-maps-button";

let articleTitle = document.querySelector('#content > section:nth-child(1) > div.c-mapstack__lede-image > div.c-mapstack__headline-wrap > div > h1').innerHTML

button.addEventListener("click", async () => {
    const listContainer = document.getElementById("content");

    // Get the Google Maps links
    const googleMapsLinks = listContainer.querySelectorAll("a.p-button[href^='https://www.google.com/maps/search/']");
    const googleMapsLinkURLs = Array.from(googleMapsLinks).map((link) => link.href)
    
    // Get the title of the article so we can use it for the name of the Google Maps list
    const articleTitle = document.querySelector('#content > section:nth-child(1) > div.c-mapstack__lede-image > div.c-mapstack__headline-wrap > div > h1').innerHTML

    const localStorageDict = {
        [articleTitle]: googleMapsLinkURLs
    }
    
    chrome.storage.local.set({EATER_ARTICLE_TO_GOOGLE_MAPS_LIST: JSON.stringify(localStorageDict)})

    console.log("Sending addListToGoogleMaps message");
    chrome.runtime.sendMessage({
        message: "addListToGoogleMaps"
    });
});
