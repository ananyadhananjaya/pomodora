import { useEffect, useState } from 'react'
import AppBar from './components/AppBar'
import BreakComponent from './components/BreakComponent/BreakComponent'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
      console.log(document.documentElement.classList)
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="md:mx-auto lg: mx-4 h-screen bg:white dark:bg-slate-900">
      <AppBar theme={theme} setTheme={setTheme} />
      <BreakComponent />
      <Footer />
    </div>
  )
}

export default App
