const targetDivs = document.querySelectorAll('.aui-page-header-main');

targetDivs.forEach(div => {
    const ol = div.querySelector('ol');
    if (ol) {
        const slackListItem = document.createElement('li');
        const slackButton = document.createElement('button');
        slackButton.textContent = 'Copy Slack Message';
        slackButton.addEventListener('click', function () {
            const slackMessage = generateSlackMessage(div);
            navigator.clipboard.writeText(slackMessage).then(() => {
                alert('The message has been successfully copied to your clipboard!');
            }, (err) => {
                alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
            });
        });
        slackListItem.appendChild(slackButton);
        ol.appendChild(slackListItem);

        const commitListItem = document.createElement('li');
        const commitButton = document.createElement('button');
        commitButton.textContent = 'Copy Commit Message';
        commitButton.addEventListener('click', function () {
            const commitMessage = generateCommitMessage(div);
            navigator.clipboard.writeText(commitMessage).then(() => {
                alert('The message has been successfully copied to your clipboard!');
            }, (err) => {
                alert(`Oops! Couldn't sneak that link into your clipboard.\nError: ${err}`);
            });
        });
        commitListItem.appendChild(commitButton);
        ol.appendChild(commitListItem);

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

function generateSlackMessage(targetDiv) {
    const absoluteUrl = extractAbsoluteUrl(targetDiv)
    return `{Summary or} ${title}\n\`BTS ${absoluteUrl}\n\`PR {PR Link}`;
}

function generateCommitMessage(targetDiv) {
    const ol = targetDiv.querySelector('ol');
    const secondLi = ol.querySelectorAll('li')[1]; 
    const btsNumber = secondLi.textContent

    const h1 = targetDiv.querySelector('h1');
    const btsTitle = h1.textContent;

    return `[${btsNumber}]${btsTitle}`;
}

function extractAbsoluteUrl(targetDiv) {
    const ol = targetDiv.querySelector('ol');
    const secondLi = ol.querySelectorAll('li')[1]; 

    const link = secondLi.querySelector('a');
    const url = link.getAttribute('href');
    const absoluteUrl = new URL(link.getAttribute('href'), window.location.href).href;

    return absoluteUrl;
}
