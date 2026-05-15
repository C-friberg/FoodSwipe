import { useEffect, useState } from "react";
import { getMyCreatedRecipes, deleteRecipe } from "../api/recipeApi";
import type { Recipe } from "../types/recipe";
import { Link } from "react-router-dom";

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
    <main>
      <h1>Mina skapade recept</h1>

      {recipes.length === 0 && (
        <p>Du har inte skapat några recept än.</p>
      )}

      {recipes.map((recipe) => (
        <article key={recipe.id} className="recipe-card">
          <h2>{recipe.name}</h2>
          <p>{recipe.description}</p>
          <p>Betyg: {recipe.averageRating ?? "Inga betyg än"}</p>

          <div>
            <Link to={`/recipes/edit/${recipe.id}`}>
              Redigera
            </Link>

            <button onClick={() => handleDelete(recipe.id)}>
              Ta bort
            </button>
          </div>
        </article>
      ))}
    </main>
  );
}