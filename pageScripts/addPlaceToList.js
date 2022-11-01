const pollForCondition = (pollFn, validateFn = (result) => !!result, interval = 100, maxRetries = 20) => {
    let attempts = 0;
  
    const executePoll = async (resolve, reject) => {
      const result = await pollFn();
      attempts = attempts + 1;
  
      if (validateFn(result)) {
        return resolve(result);
      } else if (maxRetries && attempts === maxRetries) {
        return reject(new Error('Exceeded max retries'));
      } else {
        setTimeout(executePoll, interval, resolve, reject);
      }
    };
  
    return new Promise(executePoll);
}

window.addEventListener('load', async (event) => {
    const LIST_TO_CREATE = await chrome.storage.local.get("LIST_TO_CREATE");
    const LIST_NAME = LIST_TO_CREATE["LIST_TO_CREATE"];

    if (LIST_NAME) {
        try {
            const saveButton = await pollForCondition(() => document.querySelector("button[data-value='Save']"));
            saveButton.click();
        } catch {
            
            chrome.runtime.sendMessage({
                message: "incrementList"
            });
            return;
        }

        const listOptions = await pollForCondition(
            () => document.querySelectorAll("#action-menu > ul > li"), 
            (nodeList) => Array.from(nodeList).length > 0
        );

        const correctList = Array.from(listOptions).find((list) => list.innerHTML.toString().includes(LIST_NAME))
        correctList.click();

        await pollForCondition(
            () => document.querySelector("img[alt='Saved']"),
            result => !!result,
            100,
            50
        );

        console.log("sending incrementList message");
        chrome.runtime.sendMessage({
            message: "incrementList"
        });
    }
})