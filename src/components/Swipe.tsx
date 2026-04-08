import { useState } from "react";
import { recipes } from "../data/recipes";

const SwipePage = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const currentRecipe = recipes[currentIndex]

    const handleNext = () => {
        if (currentIndex < recipes.length - 1) {
            setCurrentIndex(currentIndex + 1)
        }
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
                <img src={currentRecipe.img} alt={currentRecipe.title} className="recipe-img" />
                <h2>{currentRecipe.title}</h2>
                <p>{currentRecipe.description}</p>
                <p>Kalorier: {currentRecipe.calories}</p>
                <p>{currentRecipe.isVegan ? "Veganskt" : "Ej veganskt"}</p>

                <button onClick={handleNext}>Nästa recept</button>
                <button>Spara</button>
            </div>
        </div>
    )
}; 

export default SwipePage;  