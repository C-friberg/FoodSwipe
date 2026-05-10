import type { RecipeType, Recipe, CostType } from "../types/recipe";

const API_URL = "http://localhost:5143/api";

export type CreateRecipeRequest = {
  name: string;
  description: string;
  recipeType: RecipeType;
  costType: CostType;
};

export async function getRecipeFeed(
  recipeType?: RecipeType,
  limit: number = 10
): Promise<Recipe[]> {
  let url = `${API_URL}/recipe/feed?limit=${limit}`;

  if (recipeType !== undefined) {
    url += `&recipeType=${recipeType}`;
  }

  console.log("Fetching recipe feed:", url);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Kunde inte hämta recept");
  }

  return response.json();
}

export async function createRecipe(data: CreateRecipeRequest): Promise<Recipe> {
  const response = await fetch(`${API_URL}/recipe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa recept");
  }

  return response.json();
}