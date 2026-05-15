import { useEffect, useState } from "react";
import { getSavedRecipes, rateRecipe, removeSavedRecipe } from "../api/recipeApi";
import type { Recipe } from "../types/recipe";

export default function SavedRecipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchRecipes() {
      try {
        const data = await getSavedRecipes();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();

  }, []);

  if (loading) {
    return <p>Laddar...</p>;
  }

  async function handleRate(recipeId: number, ratingValue: number) {
  try {
    const updatedRecipe = await rateRecipe(recipeId, ratingValue);

    setRecipes(prev =>
      prev.map(recipe =>
        recipe.id === recipeId ? updatedRecipe : recipe
      )
    );
  } catch (error) {
    console.error(error);
  }
}

async function handleRemove(recipeId: number) {
  try {

    await removeSavedRecipe(recipeId);

    setRecipes(prev =>
      prev.filter(recipe => recipe.id !== recipeId)
    );

  } catch (error) {
    console.error(error);
  }
}

  return (
    <main>
        <h1>Sparade recept</h1>

        {recipes.length === 0 && <p>Du har inga sparade recept än.</p>}

        {recipes.map(recipe => (
        <div key={recipe.id}>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>Betyg: {recipe.averageRating ?? "Inga betyg än"}</p>
            <button onClick={() => handleRemove(recipe.id)}>Ta bort från sparade</button>

            <div>
            {[1, 2, 3, 4, 5].map(value => (
                <button key={value} onClick={() => handleRate(recipe.id, value)}>
                {value}
                </button>
            ))}
            </div>
        </div>
        ))}
    </main>
  );
}