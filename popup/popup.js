document.querySelector('body').addEventListener('click', event => {

  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, 'text', {}, function(timestamp) {
      console.log(tabs)

      const url = tabs[0].url;
      const videoID = url.match(/watch\?v=(.*)/)[1];

      const resultLink = 'https://youtu.be/' + videoID + '?t=' + timestamp;

      new QRious({
        element: document.getElementById('qrPlaceholder'),
        value: resultLink,
      })

    });
  });


})