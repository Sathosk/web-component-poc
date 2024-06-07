import MyEmailEditor from './HtmlEditor/Editor'

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
      <MyEmailEditor name={name} containerId={containerId} />
    </>
  )
}
