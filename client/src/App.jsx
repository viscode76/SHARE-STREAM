import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NetflixPage from './pages/Netflix'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Test from './pages/Test'

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/stream' element={<NetflixPage />} />
        <Route path='/test' element={<Test />} />
      </Routes>
      <button onClick={() => navigate("/test")}
        className='px-6 py-3 rounded-2xl shadow-lg bg-black text-white'>
        Test
      </button>

      <button onClick={() => navigate("/stream")}
        className='px-6 py-3 rounded-2xl shadow-lg bg-black text-white'>
        Stream
      </button>
    </>
  )
}

export default App
