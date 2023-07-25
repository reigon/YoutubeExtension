chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    fetch(`http://localhost:3000/get-captions?videoID=${request.videoID}&lang=${request.lang}`)
      .then(response => response.json())
      .then(data => {
        sendResponse(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  
    return true;  // Will respond asynchronously.
  });
  