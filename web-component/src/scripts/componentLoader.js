(function() {
  console.log('Amazing plugin loaded');

  class AmazingComponentPlugin {
    #instances = [];

    createInstance(containerId, props) {
      console.log('Checking if instance already exists');
      const instance = this.#instances.find(instance => instance.containerId === containerId);
      if (instance) return console.log('Instance already exists');
      
      const container = document.getElementById(containerId);
      if (container) {
        console.log(`Creating instance on ${containerId} container`);
        const component = document.createElement('amazing-component');
        component.setAttribute('name', props.name);

        container.appendChild(component);
        this.#instances.push({ containerId, component });
        console.log('Instance created', this.#instances);
      }
    }

    deleteInstance(containerId) {
      if (containerId) {
        const container = document.getElementById(containerId);
        const instance = this.#instances.find(instance => instance.containerId === containerId);

        if (!instance) return console.log('Instance not found');

        console.log('Deleting instance');
        container.removeChild(instance.component);
        this.#instances = this.#instances.filter(instance => instance.containerId !== containerId);

        console.log(`Instance ${containerId} deleted`);
      }
    }
  }

  // Expose a single instance of the plugin
  window.AmazingComponentPlugin = new AmazingComponentPlugin();
})();