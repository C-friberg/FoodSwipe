import { Route, Routes } from 'react-router-dom'
import './App.css'
import NavBar from './components/NavBar'
import HomePage from './pages/Home'
import DescriptionPage from './pages/About'
import ContactPage from './components/Contact'
import Footer from './components/Footer'
import SwipePage from './pages/Swipe'
import RecipesPage from './pages/SavedRecipes'
import { useEffect, useState } from 'react'
import RecipeFeedPage from './pages/temp'
import CreateRecipePage from "./pages/CreateRecipePage"

function App() {
  const [savedCount, setSavedCount] = useState(0)

  useEffect(() => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]")
    setSavedCount(savedRecipes.length)
  }, [])

  return (

    <div>
      <NavBar savedCount={savedCount} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<DescriptionPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/swipe" element={<SwipePage setSavedCount={setSavedCount} />} />
          <Route path="/recipes" element ={<RecipesPage />} />
          <Route path="/feed" element={<RecipeFeedPage />} />
          <Route path="/recipes/create" element={<CreateRecipePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
};

export default App
