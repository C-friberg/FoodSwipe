import { useEffect, useState } from "react";
import { getRecipeFeed } from "../api/recipeApi";
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

  function nextRecipe() {
    setCurrentIndex((prev) => prev + 1);
  }

  function saveRecipe() {
    if (!currentRecipe) return;

    setSavedRecipes((prev) => [...prev, currentRecipe]);
    nextRecipe();
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