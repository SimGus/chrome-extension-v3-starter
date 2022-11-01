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
    await pollForCondition(() => document.querySelector("div.fontBodyLarge"));

    const LIST_TO_CREATE = await chrome.storage.local.get("LIST_TO_CREATE");
    const LIST_NAME = LIST_TO_CREATE["LIST_TO_CREATE"];

    const listExists = Array.from(document.querySelectorAll("span")).some(node => node.innerHTML.toString().includes(LIST_NAME));
    
    if (LIST_NAME && !listExists) {
        const addListButton = await pollForCondition(() => document.querySelector('[aria-label="New list"]'));
        addListButton.click();

        const listNameInput = await pollForCondition(() => document.querySelector("input[aria-label='List name']"));
        listNameInput.focus();
        listNameInput.value = `Eater - ${LIST_NAME}`;

        const createButton = document.querySelector("#last-focusable-in-modal");
        createButton.disabled = false;
        createButton.click();

        await pollForCondition(() => document.querySelector("button[aria-label='Add a place']"))
    }

    chrome.runtime.sendMessage({
        message: "addPlacesToList"
    });
})