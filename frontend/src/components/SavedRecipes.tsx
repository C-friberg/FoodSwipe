//Sparade recept

import { useEffect, useState } from "react";
import type { Recipe } from "../data/recipes";

const RecipesPage = () => {
    const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([])
    useEffect(() => {
        const storedRecipes = JSON.parse(localStorage.getItem("savedRecipes") || "[]")
        setSavedRecipes(storedRecipes)
    }, [])

    if (savedRecipes.length === 0) {
        return (
            <div>
                <h1>Sparade recept</h1>
                <p>Du har inga sparade recept</p>
            </div>
        )
    }
    return (
        <div>
            <h1>Sparade recept</h1>
            <div className="saved-recipes-list">
                {savedRecipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <img src={recipe.img} alt={recipe.title} className="recipe-img" />
                        <h2>{recipe.title}</h2>
                        <p>{recipe.description}</p>
                        <p>Kalorier: {recipe.calories}</p>
                        <p>{recipe.isVegan ? "Veganskt" : "Ej veganskt"}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecipesPage; 