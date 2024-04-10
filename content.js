const targetDivs = document.querySelectorAll('.aui-page-header-main');

targetDivs.forEach(div => {
    const ol = div.querySelector('ol');
    if (ol) {
        const slackListItem = document.createElement('li');
        const slackButton = document.createElement('button');
        slackButton.textContent = 'Copy Slack Message';
        slackButton.addEventListener('click', function () {
            const infoToCopy = collectAndFormatWebsiteInfo(div);
            navigator.clipboard.writeText(infoToCopy).then(() => {
                alert('The message has been successfully copied to your clipboard!');
            }, (err) => {
                alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
            });
        });
        slackListItem.appendChild(slackButton);
        ol.appendChild(slackListItem);

        const urlListItem = document.createElement('li');
        const urlButton = document.createElement('button');
        urlButton.textContent = 'Copy Link';
        urlButton.addEventListener('click', function () {
            const absoluteUrl = extractAbsoluteUrl(div)
            navigator.clipboard.writeText(absoluteUrl).then(() => {
                alert('The url has been successfully copied to your clipboard!');
            }, (err) => {
                alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
            });
        });
        urlListItem.appendChild(urlButton);
        ol.appendChild(urlListItem);
    }
});

function collectAndFormatWebsiteInfo(targetDiv) {
    const absoluteUrl = extractAbsoluteUrl(targetDiv)
    return `{Summary or} ${title}\n\`BTS ${absoluteUrl}\n\`PR {PR Link}`;
}

function extractAbsoluteUrl(targetDiv) {
    const title = document.title;
    const ol = targetDiv.querySelector('ol');
    const secondLi = ol.querySelectorAll('li')[1]; 

    const link = secondLi.querySelector('a');
    const url = link.getAttribute('href');
    const absoluteUrl = new URL(link.getAttribute('href'), window.location.href).href;

    return absoluteUrl;
}
