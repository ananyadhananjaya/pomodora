import { useEffect, useState } from 'react'

function App() {
  const [date, setDate]= useState()

  return (
    <>
      <h1 className="text-blue-300">Hello world!</h1>
      {date}
    </>
  )
}

export default App
