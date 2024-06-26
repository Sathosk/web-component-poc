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
;(function () {
  let instances: TInstance[] = []

  function createComponent(config: TConfig) {
    const component = document.createElement('amazing-component')

    // Set props
    component.setAttribute('name', config.props.name)
    component.setAttribute('container-id', config.containerId)
    component.setAttribute('id', config.containerId + '-target')

    // Listen for the custom event
    component.addEventListener('save', (event) => {
      const customEvent = event as CustomEvent<string>
      config.onSave(customEvent.detail)
    })

    return component
  }

  function addInstance(config: TConfig, component: HTMLElement) {
    instances.push({
      containerId: config.containerId,
      component,
      onSave: config.onSave,
    })
  }

  function removeInstance(containerId: string) {
    instances = instances.filter(
      (instance) => instance.containerId !== containerId,
    )
  }

  function findInstance(containerId: string) {
    return instances.find((instance) => instance.containerId === containerId)
  }

  class AmazingComponentPlugin {
    createInstance(config: TConfig) {
      if (!config) return console.error('Config object is required')
      if (!config.containerId) return console.error('Container id is required')
      if (!config.props) return console.error('Props are required')
      if (!config.props.name) return console.error('Prop Name is required')
      if (!config.onSave) return console.error('onSave callback is required')

      console.log('Checking if instance already exists')
      const instance = findInstance(config.containerId)
      if (instance)
        return console.error(
          `Instance with id ${config.containerId} already exists.`,
        )

      const container = document.getElementById(config.containerId)

      if (container) {
        console.log(`Creating instance on ${config.containerId} container`)
        const component = createComponent(config)

        container.appendChild(component)

        addInstance(config, component)
        console.log('Instance created', instances)
      } else {
        console.error(`Container with id ${config.containerId} not found.`)
      }
    }

    deleteInstance(containerId: string) {
      if (containerId) {
        const container = document.getElementById(containerId)
        const instance = findInstance(containerId)

        if (!instance)
          return console.error(`Instance with id ${containerId} not found`)

        console.log('Deleting instance')
        container?.removeChild(instance.component)
        removeInstance(containerId)

        console.log(`Instance ${containerId} deleted`)
      } else {
        console.error('Container id is required')
      }
    }
  }

  // Expose a single instance of the plugin
  ;(window as any).AmazingComponentPlugin = new AmazingComponentPlugin()
  console.log('Amazing plugin loaded')
})()
