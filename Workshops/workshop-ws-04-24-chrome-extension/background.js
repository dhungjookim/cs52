//Setting badge/button of the extension.
chrome.browserAction.setBadgeText({ text: 'OFF' });

// boolean for on/off 
var enable=false;
// store enable in local storage if you wanted to access in content.js
chrome.storage.sync.set({"enable": enable});

// onclick method
chrome.browserAction.onClicked.addListener((tab) => {
    enable = !enable;
    // if enabled run content.js else, reload page
    if (enable) {
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.tabs.executeScript(null, { file: 'content.js'});
    } else {
        chrome.browserAction.setBadgeText({ text: 'OFF'});
        chrome.tabs.executeScript(tab.id, {code: 'window.location.reload();'});
    }

    // store state of button
    // with callback for debugging
    // chrome.storage.sync.set({"enable": enable}, () => console.log('Enable set to: ', enable));
    // w/o callback 
    chrome.storage.sync.set({"enable": enable});
})