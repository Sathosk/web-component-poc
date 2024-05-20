interface IFormProps {
  name: string
}

export default function Form({ name }: IFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log(event.currentTarget.document.value)
  }

  return (
    <form className="flex flex-col gap-2 w-fit" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center">Olá {name}</h2>
      <label htmlFor="document" className="text-sm font-semibold">Digite seu documento</label>
      <input type="text" id="document" name="document" className="rounded-sm px-4 py-2" required/>
      <button type="submit" className="bg-blue-500 text-white rounded-sm px-4 py-2">Enviar</button>
    </form>
  )
}
