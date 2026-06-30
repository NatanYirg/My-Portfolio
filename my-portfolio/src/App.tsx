import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Nav from './components/Nav'
import Home from './pages/Home'
import { pageVariants } from './lib/variants'
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Nav />
        <AnimatePresence mode="wait">
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            style={{ flex: 1 }}
          >
            <Routes>
              <Route path="*" element={<Home />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </div>
    </BrowserRouter>
  )
}
