import { useEffect, useState } from "react";
import { getSavedRecipes, rateRecipe, removeSavedRecipe } from "../api/recipeApi";
import type { Recipe } from "../types/recipe";
import "./SavedRecipes.css";

export default function SavedRecipes() {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeRatingId, setActiveRatingId] = useState<number | null>(null);

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
  <main className="saved-page">
    <h1>Sparade recept</h1>

    {recipes.length === 0 && <p>Du har inga sparade recept än.</p>}

    <section className="saved-grid">
      {recipes.map((recipe) => (
        <article key={recipe.id} className="saved-card">
          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="saved-card-img"
            />
          )}

          <div className="saved-card-content">
            <h2>{recipe.name}</h2>
            <p className="saved-description">{recipe.description}</p>

            <p className="saved-rating">
              Betyg:{" "}
              <strong>
                {recipe.averageRating != null
                  ? `${recipe.averageRating.toFixed(1)} ⭐`
                  : "Inga betyg än"}
              </strong>
            </p>

            <div className="rating-section">

  {activeRatingId === recipe.id ? (

    <div className="rating-buttons">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => {
            handleRate(recipe.id, value);
            setActiveRatingId(null);
          }}
        >
          {value}
        </button>
      ))}
    </div>

  ) : (

    <button
      onClick={() => setActiveRatingId(recipe.id)}
    >
      Betygsätt
    </button>

  )}

</div>

            <button
              className="remove-button"
              onClick={() => handleRemove(recipe.id)}
            >
              Ta bort från sparade
            </button>
          </div>
        </article>
      ))}
    </section>
  </main>
);
}