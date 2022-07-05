import { motion } from 'framer-motion'

function App() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
        <motion.div
          animate={{
            y: [20, -20, 20],
          }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <h3 className="font-bold font-mono">Pomodora is being built!</h3>
        </motion.div>
      </div>
    </div>
  )
}

export default App
