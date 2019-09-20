chrome.runtime.onMessage.addListener((message, sender, callback) => {

  const player = document.querySelector('video');
  const currentTime = Number(player.currentTime);
  callback(Math.ceil(currentTime));

});