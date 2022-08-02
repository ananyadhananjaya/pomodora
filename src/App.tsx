import { useEffect, useState } from 'react'
import AppBar from './components/AppBar'
import BreakComponent from './components/BreakComponent/BreakComponent'
import Footer from './components/Footer'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <div className="md:px-14 lg:px-36 xl:px-80 h-screen bg-slate-50 dark:bg-slate-900">
      <AppBar theme={theme} setTheme={setTheme} />
      <BreakComponent />
      <Footer />
    </div>
  )
}

export default App
