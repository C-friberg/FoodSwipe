import { useState } from "react"
import { recipes } from "../data/recipes"

type SwipePageProps = {
  setSavedCount: React.Dispatch<React.SetStateAction<number>>
}

const SwipePage = ({ setSavedCount }: SwipePageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentRecipe = recipes[currentIndex]

  const handleNext = () => {
    if (currentIndex < recipes.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleSave = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]")

    const alreadySaved = savedRecipes.find(
      (recipe: any) => recipe.id === currentRecipe.id
    )

    if (!alreadySaved) {
      savedRecipes.push(currentRecipe)
      localStorage.setItem("savedRecipes", JSON.stringify(savedRecipes))
      setSavedCount(savedRecipes.length)
    }

    handleNext()
  }

  if (!currentRecipe) {
    return (
      <div>
        <h2>Inga fler recept just nu</h2>
        <p>Du har gått igenom alla recept</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Swipea recept</h1>

      <div className="recipe-card">
        <img
          src={currentRecipe.img}
          alt={currentRecipe.title}
          className="recipe-img"
        />
        <h2>{currentRecipe.title}</h2>
        <p>{currentRecipe.description}</p>
        <p>Kalorier: {currentRecipe.calories}</p>
        <p>{currentRecipe.isVegan ? "Veganskt" : "Ej veganskt"}</p>

        <button onClick={handleNext}>Hoppa över</button>
        <button onClick={handleSave}>Spara</button>
      </div>
    </div>
  )
}

export default SwipePage