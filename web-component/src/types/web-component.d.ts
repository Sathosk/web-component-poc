export type TPayload = {
  html: string
  json: string
}

export type TOnSave = {
  containerId: string
  payload: TPayload
}

export interface IAmazingComponentPlugin {
  createInstance(config: TConfig): void
  deleteInstance(containerId: string): void
  onSave(data: TOnSave): void
}

declare global {
  interface Window {
    AmazingComponentPlugin: IAmazingComponentPlugin
  }
}
