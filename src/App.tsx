import AppBar from './components/AppBar'
import BreakComponent from './components/BreakComponent/BreakComponent'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container md:mx-auto lg: mx-4 h-screen">
      <AppBar />
      <BreakComponent />
      <Footer />
    </div>
  )
}

export default App
