document.getElementById('copyInfoBtn').addEventListener('click', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { action: "collectInfo" }, function (response) {
            if (response.info) {
                navigator.clipboard.writeText(response.info).then(() => {
                    // 복사 성공 시 처리
                    alert('Information copied to clipboard!');
                }, (err) => {
                    // 복사 실패 시 처리
                    console.error('Failed to copy information: ', err);
                });
            }
        });
    });
});
