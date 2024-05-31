import ReactDOM from 'react-dom/client'

import AnAmazingComponent, {
  IAnAmazingComponentProps,
} from './components/AnAmazingComponent'
import Editor from './components/HtmlEditor/Editor'

export const normalizeAttribute = (attribute: string) => {
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
}

class AnAmazingWebComponent extends HTMLElement {
  // constructor() {
  //   super()
  //   // this.attachShadow({ mode: 'open' })
  // }

  connectedCallback() {
    console.log('AnAmazingWebComponent connected.')
    const props = this.getPropsFromAttributes<IAnAmazingComponentProps>()
    const root = ReactDOM.createRoot(this)
    root.render(<Editor {...props} />)
  }

  private getPropsFromAttributes<T>(): T {
    const props: Record<string, string> = {}

    for (let index = 0; index < this.attributes.length; index++) {
      const attribute = this.attributes[index]
      props[normalizeAttribute(attribute.name)] = attribute.value
    }

    return props as T
  }
}

export default AnAmazingWebComponent
