import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NetflixPage from './pages/Netflix'
import { Route, Routes } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path='/binge-stream' element={<NetflixPage />} />
      </Routes>
      Coming Soon Nice
    </>
  )
}

export default App
