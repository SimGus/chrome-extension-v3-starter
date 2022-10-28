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

button.addEventListener("click", () => {
    const listContainer = document.getElementById("content");
    console.log(listContainer);
    const googleMapsLinks = listContainer.querySelectorAll("a.p-button[href^='https://www.google.com/maps/search/']");
    console.log(googleMapsLinks);
    
    googleMapsLinks.forEach((link) => {
        link.click();
    })
});
