let selector;
let monitorDiv = document.getElementById('monitorClass');
let currentSelectorDiv = document.getElementById('currentSelector');
let optionsDiv = document.getElementById('optionsPage');
chrome.storage.sync.get('changeDetectorSelector', function (data) {
  selector = data.changeDetectorSelector
  currentSelectorDiv.textContent = data.changeDetectorSelector
});
optionsDiv.onclick = function (element) {
  window.open(chrome.runtime.getURL('options.html'));
}
monitorDiv.onclick = function (element) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        code:
          `var mutation = new MutationObserver( function (mutations) { 
            mutations.forEach(function (mutation) {
              if (Notification.permission !== 'granted'){
                Notification.requestPermission();
              };
              var note = new Notification('Content change detected!')  
              let url = chrome.runtime.getURL('audio/alert.mp3')
              let a = new Audio(url)
              a.play()
            });  
          }); 
          try { 
            mutation.observe(document.querySelector('${selector}'),
              {
                attributes: true,
                characterData: true, 
                childList: true, 
                subtree: true, 
                attributeOldValue: true, 
                characterDataOldValue: true 
              }
            )
            alert('Monitoring "'+ '${selector}' +'", Do not reload the page')
          } 
          catch{ 
            alert('Error: Target element for given selector not found!') 
          };`
      });
  });
};
