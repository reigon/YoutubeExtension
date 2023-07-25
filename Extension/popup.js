function getVideoID(url) {
  var videoID = url.split('v=')[1];
  var ampersandPosition = videoID.indexOf('&');
  if(ampersandPosition != -1) {
    videoID = videoID.substring(0, ampersandPosition);
  }
  return videoID;
}

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  var url = activeTab.url;
  
  if (url.includes("youtube.com/watch?v=")) {
    const videoID = getVideoID(url);
    const lang = 'en'; // replace with desired language or input field
    chrome.runtime.sendMessage({videoID, lang}, function(response) {
      document.getElementById('captions').innerText = response.concatenatedText;
    });
  }
});




/*
document.getElementById('captionForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const videoID = document.getElementById('videoID').value;
    const lang = document.getElementById('lang').value;
  
    chrome.runtime.sendMessage({videoID, lang}, function(response) {
      document.getElementById('captions').innerText = response.concatenatedText;
    });
  });
  */