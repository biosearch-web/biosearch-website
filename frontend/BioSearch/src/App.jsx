import { useState } from 'react'
import BiosearchLogo from './assets/logo-amarela.png'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center bg-[#D4A832]">
        <div className="">
            <img src={BiosearchLogo} className="logo" alt="Biosearch logo" />
        </div>
        <h1 className="text-3xl font-bold">Biosearch</h1>
      </div>
    </>
  )
}

export default App
