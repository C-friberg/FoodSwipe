import { useEffect, useState } from "react";
import {
  getRecipeFeed,
  saveRecipe as saveRecipeApi,
  swipeRecipe,
} from "../api/recipeApi";
import type { Recipe, RecipeType } from "../types/recipe";

export function useRecipeFeed(type?: RecipeType) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const currentRecipe = recipes[currentIndex];

  useEffect(() => {
    async function loadRecipes() {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipeFeed(type);
        setRecipes(data);
        setCurrentIndex(0);
      } catch {
        setError("Något gick fel när recepten skulle hämtas.");
      } finally {
        setLoading(false);
      }
    }

    loadRecipes();
  }, [type]);

  async function nextRecipe() {
    if (!currentRecipe) return;

    await swipeRecipe(currentRecipe.id, 2); // SwipedNo = 2
    setCurrentIndex((prev) => prev + 1);
  }

  async function saveRecipe() {
    if (!currentRecipe) return;

    await saveRecipeApi(currentRecipe.id);

    setSavedRecipes((prev) => [...prev, currentRecipe]);
    setCurrentIndex((prev) => prev + 1);
  }

  return {
    recipes,
    currentRecipe,
    savedRecipes,
    loading,
    error,
    nextRecipe,
    saveRecipe,
    hasMoreRecipes: currentIndex < recipes.length,
  };
}