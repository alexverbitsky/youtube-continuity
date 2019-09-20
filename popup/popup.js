let canvasEl = null;

(function createCanvas() {
  canvasEl = document.createElement('canvas');
  canvasEl.setAttribute('id', 'qrPlaceholder');
})();

window.onload = () => {
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    const currentTab = tabs[0];
    updatePopUpView(currentTab);
    setInterval(() => updatePopUpView(currentTab), 2000);
  });

};

function updatePopUpView(tab) {
  chrome.tabs.sendMessage(tab.id, '', {}, timestamp => {
    const url = new URL(tab.url);
    const videoID = url.searchParams.get('v');
    const resultLink = `https://youtu.be/${videoID}?t=${timestamp}`;
    showQRCode(resultLink);
  });

}

function showQRCode(text) {
  document.getElementById('qrContainer').appendChild(canvasEl);

  new QRious({
    element: canvasEl,
    value: text,
  });

}