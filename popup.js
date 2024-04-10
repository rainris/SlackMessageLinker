document.getElementById('copyInfoBtn').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "collectInfo" }, function (response) {
            if (response.info) {
                navigator.clipboard.writeText(response.info).then(() => {
                    alert('Information copied to clipboard!');
                }, (err) => {
                    console.error('Failed to copy information: ', err);
                });
            }
        });
    });
});
