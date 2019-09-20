let canvasEl = null;

(function createCanvas() {
  canvasEl = document.createElement('canvas');
  canvasEl.setAttribute('id', 'qrPlaceholder');
})();

document.querySelector('body').addEventListener('click', () => {

  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, '', {}, timestamp => {
    
      const url = new URL(tabs[0].url);
      const videoID = url.searchParams.get('v');

      const resultLink = 'https://youtu.be/' + videoID + '?t=' + timestamp;

      showQRCode(resultLink);

    });
  });

});

function showQRCode(text) {

  document.getElementById('qrContainer').appendChild(canvasEl);

  new QRious({
    element: canvasEl,
    value: text,
  });

}