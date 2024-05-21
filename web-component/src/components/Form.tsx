interface IFormProps {
  name: string
  containerId: string
}

export default function Form({ name, containerId }: IFormProps) {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const parent = document.getElementById(`${containerId}-target`);

    if (!parent) return console.error('Parent not found')

    const form = event.currentTarget;
    const inputValue = form.document.value;

    console.log('Form submitted, dispatching custom event');

    const customEvent = new CustomEvent('save', {
      detail: inputValue,
    });

    parent?.dispatchEvent(customEvent);
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
