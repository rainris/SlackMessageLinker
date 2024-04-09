// 웹사이트 정보를 수집하고 포맷팅하는 함수
function collectAndFormatWebsiteInfo(targetDiv) {
    const title = document.title;

    // targetDiv 내부의 첫 번째 ol 요소 찾기
    const ol = targetDiv.querySelector('ol');

    // ol 내의 두 번째 li 요소 찾기
    const secondLi = ol.querySelectorAll('li')[1]; // 인덱스는 0부터 시작하므로, 두 번째 요소는 인덱스 1입니다.

    // 두 번째 li 내부의 a 태그 찾기
    const link = secondLi.querySelector('a');
    const url = link.getAttribute('href');
    const absoluteUrl = new URL(link.getAttribute('href'), window.location.href).href;

    return `{Summary or} ${title}\n\`BTS ${absoluteUrl}\n\`PR {PR Link}`;
}



// 'target-div' 클래스를 가진 모든 div 요소 찾기
const targetDivs = document.querySelectorAll('.aui-page-header-main');

// 찾은 div 요소들을 순회
targetDivs.forEach(div => {
    // div 내부의 첫 번째 ol 요소 찾기
    const ol = div.querySelector('ol');
    if (ol) {
        // ol 내에 새로운 li 요소 추가
        const newListItem = document.createElement('li');
        const button = document.createElement('button');
        button.textContent = 'Copy Slack Message';

        // 버튼에 클릭 이벤트 리스너 추가
        button.addEventListener('click', function () {
            // 버튼 클릭 시 수행할 동작
            const infoToCopy = collectAndFormatWebsiteInfo(div);
            navigator.clipboard.writeText(infoToCopy).then(() => {
                alert('The message has been successfully copied to your clipboard!');
            }, (err) => {
                alert(`Oops! Couldn't sneak that link into your clipboard. Try again?\nError: ${err}`);
            });
        });

        // li 요소에 버튼 추가하고 ol에 li 추가
        newListItem.appendChild(button);
        ol.appendChild(newListItem);
    }
});
