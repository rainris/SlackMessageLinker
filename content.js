function addButtonsToDivs() {
    const targetDivs = document.querySelectorAll('.aui-page-header-main');

    targetDivs.forEach(div => {
        chrome.storage.local.get(['showSlackMessageButton', 'showCommitMessageButton', 'showLinkButton', 'showBTSNumberButton'], function (options) {
            const ol = div.querySelector('ol');
            if (ol) {
                const showSlackMessageButton = options.showSlackMessageButton === undefined ? true : options.showSlackMessageButton;
                const showCommitMessageButton = options.showCommitMessageButton === undefined ? true : options.showCommitMessageButton;
                const showLinkButton = options.showLinkButton === undefined ? true : options.showLinkButton;
                const showBTSNumberButton = options.showBTSNumberButton === undefined ? true : options.showBTSNumberButton;

                if (showSlackMessageButton && !ol.querySelector('.slack-button')) {
                    const slackListItem = document.createElement('li');
                    const slackButton = document.createElement('button');
                    slackButton.textContent = 'Copy Slack Message';
                    slackButton.classList.add('slack-button');
                    slackButton.addEventListener('click', function () {
                        const slackMessage = generateSlackMessage(div);
                        navigator.clipboard.writeText(slackMessage).then(() => {
                            chrome.storage.local.get('showAlert', function (data) {
                                const showAlert = data.showAlert;
                                if (showAlert) {
                                    alert('The message has been successfully copied to your clipboard!');
                                }
                            });
                        }, (err) => {
                            alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
                        });
                    });
                    slackListItem.appendChild(slackButton);
                    ol.appendChild(slackListItem);
                }
                if (showCommitMessageButton && !ol.querySelector('.commit-button')) {
                    const commitListItem = document.createElement('li');
                    const commitButton = document.createElement('button');
                    commitButton.textContent = 'Copy Commit Message';
                    commitButton.classList.add('commit-button');
                    commitButton.addEventListener('click', function () {
                        const commitMessage = generateCommitMessage(div);
                        navigator.clipboard.writeText(commitMessage).then(() => {
                            chrome.storage.local.get('showAlert', function (data) {
                                const showAlert = data.showAlert;
                                if (showAlert) {
                                    alert('The message has been successfully copied to your clipboard!');
                                }
                            });
                        }, (err) => {
                            alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
                        });
                    });
                    commitListItem.appendChild(commitButton);
                    ol.appendChild(commitListItem);
                }
                if (showLinkButton && !ol.querySelector('.link-button')) {
                    const urlListItem = document.createElement('li');
                    const urlButton = document.createElement('button');
                    urlButton.textContent = 'Copy Link';
                    urlButton.classList.add('link-button');
                    urlButton.addEventListener('click', function () {
                        const absoluteUrl = extractAbsoluteUrl(div)
                        navigator.clipboard.writeText(absoluteUrl).then(() => {
                            chrome.storage.local.get('showAlert', function (data) {
                                const showAlert = data.showAlert;
                                if (showAlert) {
                                    alert('The url has been successfully copied to your clipboard!');
                                }
                            });
                        }, (err) => {
                            alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
                        });
                    });
                    urlListItem.appendChild(urlButton);
                    ol.appendChild(urlListItem);
                }
                if (showBTSNumberButton && !ol.querySelector('.bts-button')) {
                    const urlListItem = document.createElement('li');
                    const urlButton = document.createElement('button');
                    urlButton.textContent = 'Copy BTS Number';
                    urlButton.classList.add('bts-button');
                    urlButton.addEventListener('click', function () {
                        const absoluteUrl = extractBTSNumber(div)
                        navigator.clipboard.writeText(absoluteUrl).then(() => {
                            chrome.storage.local.get('showAlert', function (data) {
                                const showAlert = data.showAlert;
                                if (showAlert) {
                                    alert('The url has been successfully copied to your clipboard!');
                                }
                            });
                        }, (err) => {
                            alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
                        });
                    });
                    urlListItem.appendChild(urlButton);
                    ol.appendChild(urlListItem);
                }
            }
        });
    });
}

function generateSlackMessage(targetDiv) {
    const title = document.querySelector('title').textContent;
    const absoluteUrl = extractAbsoluteUrl(targetDiv);
    return `${title}\n\`BTS\` ${absoluteUrl}`;
}

function generateCommitMessage(targetDiv) {
    const ol = targetDiv.querySelector('ol');
    const secondLi = ol.querySelectorAll('li')[1];
    const btsNumber = secondLi.textContent

    const h1 = targetDiv.querySelector('h1');
    const btsTitle = h1.textContent;

    const absoluteUrl = extractAbsoluteUrl(targetDiv);

    return `[${btsNumber}]${btsTitle}\n- ${absoluteUrl}`;
}

function extractAbsoluteUrl(targetDiv) {
    const ol = targetDiv.querySelector('ol');
    const secondLi = ol.querySelectorAll('li')[1];

    const link = secondLi.querySelector('a');
    const url = link.getAttribute('href');
    const absoluteUrl = new URL(link.getAttribute('href'), window.location.href).href;

    return absoluteUrl;
}

function extractBTSNumber(targetDiv) {
    const urlString = extractAbsoluteUrl(targetDiv)
    const url = new URL(urlString);
    const pathname = url.pathname;
    const pathSegments = pathname.split('/');
    const lastPath = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];

    return lastPath;
}

// MutationObserver를 사용하여 DOM 변경을 감지하고 버튼을 다시 추가
const observer = new MutationObserver(addButtonsToDivs);
observer.observe(document.body, { childList: true, subtree: true });

// 초기 로드 시 버튼 추가
addButtonsToDivs();