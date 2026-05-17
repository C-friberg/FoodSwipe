import { useEffect, useState } from "react";
import { getRecipeFeed, saveRecipe, swipeRecipe } from "../api/recipeApi";
import type { Recipe } from "../types/recipe";
import RecipeCard from "../components/RecipeCard";

type SwipePageProps = {
  setSavedCount: React.Dispatch<React.SetStateAction<number>>;
};

const SwipePage = ({ setSavedCount }: SwipePageProps) => {

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchRecipes() {
      try {
        const data = await getRecipeFeed();
        setRecipes(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipes();

  }, []);

async function handleSave(recipeId: number) {
  console.log("Klickade spara:", recipeId);

  try {
    await saveRecipe(recipeId);

    setRecipes(prev =>
      prev.filter(recipe => recipe.id !== recipeId)
    );

    setSavedCount(prev => prev + 1);

  } catch (error) {
    console.error(error);
  }
}

  async function handleSkip(recipeId: number) {
  try {
    await swipeRecipe(recipeId, 2);

    setRecipes(prev =>
      prev.filter(recipe => recipe.id !== recipeId)
    );
  } catch (error) {
    console.error(error);
  }
}

  if (loading) {
    return <p>Laddar recept...</p>;
  }

  if (recipes.length === 0) {
    return (
      <div>
        <h2>Inga fler recept just nu</h2>
      </div>
    );
  }

  const currentRecipe = recipes[0];

  return (
  <div>
    <h1>Swipea recept</h1>

    <RecipeCard
      recipe={currentRecipe}
      onNext={() => handleSkip(currentRecipe.id)}
      onSave={() => handleSave(currentRecipe.id)}
    />
  </div>
  );
};

export default SwipePage;