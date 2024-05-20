import { Minus, Plus } from "lucide-react"
import { useState } from "react"

export default function Counter() {
  const [counter, setCounter] = useState(0)

  const increment = () => setCounter((prev) => prev + 1)
  const decrement = () => setCounter((prev) => prev < 1 ? 0 : prev - 1)

  return (
    <section className="w-fit flex justify-center items-center flex-col gap-5">
      <span className="font-bold text-5xl">Clicks: <span>{counter}</span></span>
      <div className="flex gap-3">
        <button type="button" onClick={decrement} className="border-2 border-black">
          <Minus />
        </button>
        <button type="button" onClick={increment} className="border-2 border-black">
          <Plus/>
        </button>
      </div>
    </section>
  )
}
