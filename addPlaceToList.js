console.log("ADD PLACE TO LIST");

window.addEventListener('load', async (event) => {
    const listToCreate = await chrome.storage.local.get("LIST_TO_CREATE");
    console.log("listToCreate in addPlaceToList", listToCreate["LIST_TO_CREATE"]);

    const listName = listToCreate["LIST_TO_CREATE"];

    if (listName) {
        console.log("settingTimeout")
        setTimeout(async () => {
            const saveButton = document.querySelector("button[data-value='Save']");
            saveButton.click();

            setTimeout(async () => {
                const lis = document.querySelectorAll("#action-menu > ul > li");

                let listLi;
                lis.forEach((li) => {
                    if (li.innerHTML.toString().includes(listName)) {
                        listLi = li;
                    }
                })

                listLi.click();
            }, 1000)
        }, 1000)
    }
})