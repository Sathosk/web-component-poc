type TProps = {
  name: string
  containerId: string
}

type TConfig = {
  containerId: string
  props: TProps
  onSave: (payload: string) => void
}

type TInstance = {
  containerId: string
  component: HTMLElement
  onSave: TConfig['onSave']
}

(function() {
  console.log('Amazing plugin loaded');
  let instances: TInstance[] = [];

  class AmazingComponentPlugin {

    createInstance(config: TConfig) {
      console.log('Checking if instance already exists');
      const instance = instances.find(instance => instance.containerId === config.containerId);
      if (instance) return console.error(`Instance with id ${config.containerId} already exists.`);
      
      const container = document.getElementById(config.containerId);

      if (container) {
        console.log(`Creating instance on ${config.containerId} container`);
        const component = document.createElement('amazing-component');

        // Set props
        component.setAttribute('name', config.props.name);
        component.setAttribute('container-id', config.containerId);
        component.setAttribute('id', config.containerId + '-target');

        // Listen for the custom event
        component.addEventListener('save', (event) => {
          const customEvent = event as CustomEvent<string>;
          config.onSave(customEvent.detail);
        });

        container.appendChild(component);
        instances.push(
          { 
            containerId: config.containerId, 
            component, 
            onSave: config.onSave
          }
        );
        console.log('Instance created', instances);
      } else {
        console.error(`Container with id ${config.containerId} not found.`);
      }
    }

    deleteInstance(containerId: string) {
      if (containerId) {
        const container = document.getElementById(containerId);
        const instance = instances.find(instance => instance.containerId === containerId);

        if (!instance) return console.error('Instance not found');

        console.log('Deleting instance');
        container?.removeChild(instance.component);
        instances = instances.filter(instance => instance.containerId !== containerId);

        console.log(`Instance ${containerId} deleted`);
      }
    }
  }

  // Expose a single instance of the plugin
  (window as any).AmazingComponentPlugin = new AmazingComponentPlugin();
})();