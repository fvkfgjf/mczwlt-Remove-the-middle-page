// ==UserScript==
// @name         红石中继站去中间页
// @version      0.1
// @description  红石中继站去中间页
// @author       28074
// @match        *://www.mczwlt.net/*
// @updateURL    https://raw.githubusercontent.com/fvkfgjf/mczwlt-Remove-the-middle-page/main/mczwlt-Remove-the-middle-page.meta.js
// @downloadURL  https://raw.githubusercontent.com/fvkfgjf/mczwlt-Remove-the-middle-page/main/mczwlt-Remove-the-middle-page.user.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=mczwlt.net
// ==/UserScript==


(function() {
    'use strict';

    function processLinks() {
        const links = document.querySelectorAll('a[href*="/go-external?url="]');
        links.forEach(link => {
            const href = link.getAttribute('href');
            const match = href.match(/\/go-external\?url=([^&]+)/);
            if (match && match[1]) {
                try {
                    const decodedUrl = decodeURIComponent(decodeURIComponent(match[1]));
                    link.href = decodedUrl;
                    link.onclick = null;
                    link.addEventListener('click', e => {
                        e.stopImmediatePropagation();
                    }, true);
                } catch (e) {
                    console.error('URL解码失败:', e);
                }
            }
        });
    }

    processLinks();

    const observer = new MutationObserver(processLinks);
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();