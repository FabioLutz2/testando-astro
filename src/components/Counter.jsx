import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button className="bg-blue-500 hover:bg-blue-400 text-white p-2 m-5 rounded-sm cursor-pointer border-none" onClick={() => setCount(count + 1)}>
      Você clicou {count} vezes
    </button>
  );
}
