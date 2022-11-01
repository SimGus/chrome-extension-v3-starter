chrome.runtime.onMessage.addListener(
    async (message, sender, _sendResponse) => {
        const LOCAL_STORAGE_ARTICLE_TO_PLACES_MAP = await chrome.storage.local.get("EATER_ARTICLE_TO_GOOGLE_MAPS_LIST");
        const STRINGIFIED_ARTICLE_TO_PLACES_MAP = LOCAL_STORAGE_ARTICLE_TO_PLACES_MAP["EATER_ARTICLE_TO_GOOGLE_MAPS_LIST"];
        const ARTICLE_TO_PLACES_MAP = JSON.parse(STRINGIFIED_ARTICLE_TO_PLACES_MAP);
        const currentMessage = message.message;

        if (currentMessage === "addListToGoogleMaps") {
            console.log("Creating Eater list in Google Maps");
            chrome.storage.local.set({"LIST_TO_CREATE": Object.keys(ARTICLE_TO_PLACES_MAP)[0]})
            chrome.tabs.create({url: "https://www.google.com/maps/@40.7271164,-73.994756,15z/data=!4m2!10m1!1e1"})
        } else if (currentMessage === "addPlacesToList" || currentMessage === "incrementList") {
            console.log("Adding place to Google Maps list");
            await chrome.tabs.remove(sender.tab.id);
            
            let currentLink;
            const googleMapsLinks = Object.values(ARTICLE_TO_PLACES_MAP)[0];
            
            if (currentMessage === "addPlacesToList") {
                currentLink = googleMapsLinks[0];
                chrome.storage.local.set({CURRENT_GOOGLE_MAPS_LINK_INDEX: 0})
            } else {
                const LOCAL_STORAGE_GOOGLE_MAPS_LIST_INDEX = await chrome.storage.local.get("CURRENT_GOOGLE_MAPS_LINK_INDEX");
                const STRINGIFIED_GOOGLE_MAPS_LIST_INDEX = LOCAL_STORAGE_GOOGLE_MAPS_LIST_INDEX["CURRENT_GOOGLE_MAPS_LINK_INDEX"];
                const CURRENT_GOOGLE_MAPS_LINK_INDEX = parseInt(STRINGIFIED_GOOGLE_MAPS_LIST_INDEX) + 1;
                
                if (CURRENT_GOOGLE_MAPS_LINK_INDEX === googleMapsLinks.length) {
                    chrome.storage.local.remove(["LIST_TO_CREATE", "EATER_ARTICLE_TO_GOOGLE_MAPS_LIST", "CURRENT_GOOGLE_MAPS_LINK_INDEX"])
                    return;
                }

                chrome.storage.local.set({CURRENT_GOOGLE_MAPS_LINK_INDEX: CURRENT_GOOGLE_MAPS_LINK_INDEX})
                currentLink = googleMapsLinks[CURRENT_GOOGLE_MAPS_LINK_INDEX]
            }

            chrome.tabs.create({url: currentLink})
        }
    }
)
