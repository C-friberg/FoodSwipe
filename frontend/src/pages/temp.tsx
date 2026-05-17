import { useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { useRecipeFeed } from "../hooks/useRecipeFeed";
import { RecipeType } from "../types/recipe";
import type { RecipeType as RecipeTypeValue } from "../types/recipe";

export default function RecipeFeedPage() {
  const [selectedType, setSelectedType] = useState<RecipeTypeValue | undefined>();

  const {
    currentRecipe,
    loading,
    error,
    nextRecipe,
    saveRecipe,
    hasMoreRecipes,
  } = useRecipeFeed(selectedType);

  if (loading) return <p>Laddar recept...</p>;
  if (error) return <p>{error}</p>;

  return (
    <main>
      <h1>FoodSwipe</h1>

      <select
        value={selectedType ?? ""}
        onChange={(e) => {
          const value = e.target.value;

          setSelectedType(
            value === "" ? undefined : Number(value) as RecipeTypeValue
          );
        }}
      >
        <option value="">Alla recept</option>
        <option value={RecipeType.Meat}>Kött</option>
        <option value={RecipeType.Fish}>Fisk</option>
        <option value={RecipeType.Vegetarian}>Vegetariskt</option>
        <option value={RecipeType.Vegan}>Veganskt</option>
      </select>

      {!hasMoreRecipes || !currentRecipe ? (
        <p>Inga fler recept att visa.</p>
      ) : (
        <RecipeCard
          recipe={currentRecipe}
          onNext={nextRecipe}
          onSave={saveRecipe}
        />
      )}
    </main>
  );
}