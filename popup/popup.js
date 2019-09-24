const POPUP_MESSAGES = {
  scanQRCode: 'Scan QR code to continue watching',
  wrongPage: 'Start watching youtube video to use this extension',
};
const YOUTUBE_DOMAIN = 'www.youtube.com/watch';
const RESULT_LINK = (videoID, timestamp) => `https://youtu.be/${videoID}?t=${timestamp}`;

let labelEl = null;
let canvasEl = null;

(function setElements() {
  labelEl = document.getElementById('textLabel');
  canvasEl = document.createElement('canvas');
  canvasEl.setAttribute('id', 'qrPlaceholder');
})();

window.onload = () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const currentTab = tabs[0];

    if (currentTab.url.includes(YOUTUBE_DOMAIN)) {
      labelEl.innerHTML = POPUP_MESSAGES.scanQRCode;
      updatePopUpView(currentTab);
      setInterval(() => updatePopUpView(currentTab), 2000);

    } else {
      labelEl.innerHTML = POPUP_MESSAGES.wrongPage;

    }

  });
};

function updatePopUpView(tab) {
  chrome.tabs.sendMessage(tab.id, '', {}, timestamp => {

    if (timestamp) {
      const link = createLink(tab, timestamp);
      updateQRCode(link);
    }

  });
}

function createLink(tab, timestamp) {
  const url = new URL(tab.url);
  const videoID = url.searchParams.get('v');
  return RESULT_LINK(videoID, timestamp);
}

function updateQRCode(text) {
  document.getElementById('qrContainer').appendChild(canvasEl);
  new QRious({ element: canvasEl, value: text });
}