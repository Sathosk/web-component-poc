console.log('script loaded')

const loadComponentButton = document.getElementById('loadComponentButton')
const closeComponentButton = document.getElementById('closeComponentButton')

loadComponentButton.addEventListener('click', function() {
  window.AmazingComponentPlugin.createInstance('componentContainer', { name: 'Tiago' });
});

closeComponentButton.addEventListener('click', function() {
  window.AmazingComponentPlugin.deleteInstance('componentContainer')
})

const loadAnotherComponentButton = document.getElementById('loadAnotherComponentButton')
const closeAnotherComponentButton = document.getElementById('closeAnotherComponentButton')

loadAnotherComponentButton.addEventListener('click', function() {
  window.AmazingComponentPlugin.createInstance('anotherComponentContainer', { name: 'Ronaldo' });
});

closeAnotherComponentButton.addEventListener('click', function() {
  window.AmazingComponentPlugin.deleteInstance('anotherComponentContainer')
})
