document.addEventListener('DOMContentLoaded', function () {
    const alertOption = document.getElementById('alertOption');
    chrome.storage.local.get('slackMessageLinker_showAlert', function (data) {
        alertOption.checked = data.slackMessageLinker_showAlert || false; 
    });

    alertOption.addEventListener('change', function () {
        const showAlert = alertOption.checked;
        chrome.storage.local.set({ 'slackMessageLinker_showAlert': showAlert }, function () {
            console.log('Saved');
        });
    });
});
