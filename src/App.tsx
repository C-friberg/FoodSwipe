import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './components/Home'
import DescriptionPage from './components/About'
import ContactPage from './components/Contact'
import Footer from './components/Footer'
import SwipePage from './components/Swipe'
import RecipesPage from './components/SavedRecipes'

function App() {

  return (

    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<DescriptionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/swipe" element={<SwipePage />} />
          <Route path="/recipes" element ={<RecipesPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
};

export default App
