import { useState } from "react";

function PractisePage() {

    const [count, setCount] = useState(0)

    function handleClick()
    {
        setCount(count + 1)
    }

    return (
         <div className="flex h-screen items-center justify-around">
            <div className="bg-blue-400 rounded-xl p-64 flex flex-col">
                <p className="text-5xl text-white"  >Counter: {count}</p>
                <button className="p-6 rounded-xl bg-blue-700 text-white hover:bg-blue-900 text-xl mt-12" onClick={handleClick}> Counter++</button>
            </div>
         </div>
  );
}

export default PractisePage;