import { useEffect, useState } from "react";
import { getMyCreatedRecipes, deleteRecipe } from "../api/recipeApi";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router-dom";
import "./MyRecipePage.css";

export default function MyRecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyRecipes() {
      try {
        const data = await getMyCreatedRecipes();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMyRecipes();
  }, []);

  async function handleDelete(recipeId: number) {

    const confirmed = confirm(
        "Är du säker på att du vill ta bort receptet?"
    );

    if (!confirmed)
        return;

    try {

        await deleteRecipe(recipeId);

        setRecipes(prev =>
        prev.filter(recipe => recipe.id !== recipeId)
        );

    } catch (error) {
        console.error(error);
    }
}

  if (loading) {
    return <p>Laddar dina recept...</p>;
  }

  return (
  <main className="my-recipes-page">

    <h1>Mina skapade recept</h1>

    {recipes.length === 0 && (
      <p>Du har inte skapat några recept än.</p>
    )}

    <section className="my-recipes-grid">

      {recipes.map((recipe) => (

        <article key={recipe.id} className="my-recipe-card">

          {recipe.imageUrl && (
            <img
              src={recipe.imageUrl}
              alt={recipe.name}
              className="my-recipe-img"
            />
          )}

          <div className="my-recipe-content">

            <h2>{recipe.name}</h2>

            <p className="my-recipe-description">
              {recipe.description}
            </p>

            <p className="my-recipe-rating">
              Betyg:{" "}
              <strong>
                {recipe.averageRating != null
                  ? recipe.averageRating.toFixed(1)
                  : "Inga betyg än"}
              </strong>
            </p>

            <div className="my-recipe-actions">

              <Link
                to={`/recipes/edit/${recipe.id}`}
                className="edit-button"
              >
                Redigera
              </Link>

              <button
                className="delete-button"
                onClick={() => handleDelete(recipe.id)}
              >
                Ta bort
              </button>

            </div>

          </div>

        </article>

      ))}

    </section>

  </main>
);
}