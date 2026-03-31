import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './components/Home'
import AboutPage from './components/About'

function App() {

  return (

    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </div>
  )
};

export default App
