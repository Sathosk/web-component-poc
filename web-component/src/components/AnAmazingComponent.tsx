import Editor from './HtmlEditor/Editor'

export interface IAnAmazingComponentProps {
  name: string
  containerId: string
}

export default function AnAmazingComponent({
  name,
  containerId,
}: IAnAmazingComponentProps) {
  return (
    <>
      <Editor name={name} containerId={containerId} />
    </>
  )
}
