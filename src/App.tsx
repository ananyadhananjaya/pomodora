import AppBar from './components/AppBar'
import BreakComponent from './components/BreakComponent/BreakComponent'
import Footer from './components/Footer'
import TimeComponent from './components/TimeComponent'

function App() {
  return (
    <div className="mx-28 h-screen">
      <AppBar />
      <BreakComponent />
      <TimeComponent />
      <Footer />
    </div>
  )
}

export default App
