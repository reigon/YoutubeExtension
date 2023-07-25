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
    // Show the loading indicator
    // Show the loading indicator and change the title
    document.getElementById('loader').style.display = 'block';
    let title = document.querySelector('#title');
    title.textContent = 'Summarizing';
    title.insertAdjacentHTML('beforeend', '<span class="dot dot1">.</span><span class="dot dot2">.</span><span class="dot dot3">.</span>');
    
    const videoID = getVideoID(url);
    const lang = 'en'; // replace with desired language or input field
    chrome.runtime.sendMessage({videoID, lang}, function(response) {
      // Hide the loading indicator and change the title back
      document.getElementById('loader').style.display = 'none';
      document.querySelector('#title').textContent = 'Summary';
      let captionBox = document.getElementById('captions');
      captionBox.style.display = 'block';
      captionBox.innerText = response.concatenatedText;
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