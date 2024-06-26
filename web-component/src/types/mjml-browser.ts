interface IAttributes {
  [key: string]: any
}

interface IChildrenItem {
  file?: string
  absoluteFilePath?: string
  line: number
  includedIn: any[]
  tagName: string
  children?: IChildrenItem[]
  attributes: IAttributes
  content?: string
}

interface MjmlBlockItem {
  file: string
  absoluteFilePath: string
  line: number
  includedIn: any[]
  tagName: string
  children: IChildrenItem[]
  attributes: IAttributes
  content?: string
}

declare module 'mjml-browser' {
  const transform: (
    vml: string,
    options?: {
      beautify?: boolean
      minify?: boolean
      keepComments?: boolean
      validationLevel: 'strict' | 'soft' | 'skip'
    },
  ) => {
    json: MjmlBlockItem
    html: string
    errors: string[]
  }
  export default transform
}
