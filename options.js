let inputArea = document.getElementById('inputArea');
let saveButton = document.getElementById('saveSelector');
let current = document.getElementById('current');
let inputBar = document.createElement('input');
inputBar.placeholder = " Enter selector name"
let Sbutton = document.createElement('button');
Sbutton.textContent = "Save"
chrome.storage.sync.get('changeDetectorSelector', function (data) {
  current.textContent = data.changeDetectorSelector
});
Sbutton.addEventListener('click', function () {
  chrome.storage.sync.set({ changeDetectorSelector: inputBar.value }, function () {
    if (inputBar.value !== undefined) {
      current.textContent = inputBar.value
      window.alert('Selector "' + inputBar.value + '" saved.')
    }
  })
});
inputArea.appendChild(inputBar);
saveButton.appendChild(Sbutton);


