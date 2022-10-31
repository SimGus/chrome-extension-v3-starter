console.log("CREATE MAPS LIST");

window.addEventListener('load', async (event) => {
    const listToCreate = await chrome.storage.local.get("LIST_TO_CREATE");
    console.log("listToCreate", listToCreate["LIST_TO_CREATE"]);

    const listName = listToCreate["LIST_TO_CREATE"];
    
    if (listName) {
        console.log("settingTimeout")
        setTimeout(async () => {
            const addListButton = document.querySelector('[aria-label="New list"]')
            console.log("addListButton", addListButton);
            addListButton.click();

            setTimeout(async () => {
                const listNameInput = document.querySelector("input[aria-label='List name']");
                listNameInput.focus();
                listNameInput.value = `Eater - ${listName}`;

                const createButton = document.querySelector("#last-focusable-in-modal");
                createButton.disabled = false;
                createButton.click();

                chrome.runtime.sendMessage({
                    message: "addPlacesToList"
                });
            }, 500)
        }, 1000)
    }
})