console.log('script loaded')

const loadComponentButton = document.getElementById('loadComponentButton')
const closeComponentButton = document.getElementById('closeComponentButton')

loadComponentButton.addEventListener('click', function() {
  // window.AmazingComponentPlugin.createInstance('componentContainer', { name: 'Tiago' });
  window.AmazingComponentPlugin.createInstance({
    containerId: 'componentContainer', 
    props: { name: 'Tiago' },
    onSave: (e) => console.log('from componentContainer', e)
  });
});

closeComponentButton.addEventListener('click', function() {
  window.AmazingComponentPlugin.deleteInstance('componentContainer')
})

const loadAnotherComponentButton = document.getElementById('loadAnotherComponentButton')
const closeAnotherComponentButton = document.getElementById('closeAnotherComponentButton')

loadAnotherComponentButton.addEventListener('click', function() {
  // window.AmazingComponentPlugin.createInstance('anotherComponentContainer', { name: 'Ronaldo' });
  window.AmazingComponentPlugin.createInstance({
    containerId: 'anotherComponentContainer', 
    props: { name: 'Ronaldo' },
    onSave: (e) => console.log('from anotherComponentContainer', e.toUpperCase())
  });
});

closeAnotherComponentButton.addEventListener('click', function() {
  window.AmazingComponentPlugin.deleteInstance('anotherComponentContainer')
})
