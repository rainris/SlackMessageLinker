document.addEventListener('DOMContentLoaded', function () {
    const options = ['showSlackMessageButton', 'showCommitMessageButton', 'showLinkButton', 'showBTSNumberButton'];
    options.forEach(option => {
        chrome.storage.local.get(option, function (data) {
            const isChecked = data[option] === undefined ? true : data[option];
            document.getElementById(option).checked = isChecked;
        });
    });

    chrome.storage.local.get('showAlert', function (data) {
        const isAlertChecked = data.showAlert === undefined ? false : data.showAlert;
        document.getElementById('showAlert').checked = isAlertChecked;
    });

    document.querySelectorAll('.switch input').forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            chrome.storage.local.set({ [checkbox.id]: checkbox.checked });
        });
    });
});
