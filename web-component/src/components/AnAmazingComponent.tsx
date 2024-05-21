import Counter from "./Counter";
import Form from "./Form";
import style from '../index.css?inline'

export interface IAnAmazingComponentProps {
  name: string
  containerId: string
}

export default function AnAmazingComponent({ name, containerId }: IAnAmazingComponentProps) {
  return (
    <>
      <style>{style}</style>
      <section id={containerId + '-child'} className="h-full py-10 flex justify-center items-center flex-col gap-5 w-full bg-gray-400">
        <Counter />
        <Form name={name} containerId={containerId}/>
      </section>
    </>
  )
}
