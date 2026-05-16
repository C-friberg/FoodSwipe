import type { RecipeType, Recipe, CostType } from "../types/recipe";

const API_URL = "http://localhost:5143/api";

function getAuthHeaders() {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export type CreateRecipeRequest = {
  name: string;
  description: string;
  recipeType: RecipeType;
  costType: CostType;
  imageUrl: string | null; 
};

export async function getRecipeFeed(recipeType?: RecipeType, limit: number = 10): Promise<Recipe[]> {

  let url = `${API_URL}/recipe/feed?limit=${limit}`;

  if (recipeType !== undefined) {
    url += `&recipeType=${recipeType}`;
  }

  console.log("Fetching recipe feed:", url);

  const response = await fetch(url, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta recept");
  }

  return response.json();
}

export async function getSavedRecipes(): Promise<Recipe[]> {

  const response = await fetch(`${API_URL}/recipe/saved`, {
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error("Kunde inte hämta sparade recept.");
  }

  return response.json();
}

export async function createRecipe(data: CreateRecipeRequest) {
  const response = await fetch(`${API_URL}/recipe`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Kunde inte skapa recept.");
  }

  return response.json();
}

export async function saveRecipe(recipeId: number) {
  console.log("saveRecipe körs med id:", recipeId);

  const response = await fetch(`${API_URL}/recipe/${recipeId}/save`, {
    method: "POST",
    headers: getAuthHeaders(),
  });

  console.log("saveRecipe status:", response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.log("Save error:", errorText);
    throw new Error("Kunde inte spara recept.");
  }

  return response.text();
}

export async function rateRecipe(recipeId: number, ratingValue: number) {
  const response = await fetch(`${API_URL}/recipe/${recipeId}/rate`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ ratingValue }),
  });

  if (!response.ok) {
    throw new Error("Kunde inte betygsätta recept.");
  }

  return response.json();
}

export async function removeSavedRecipe(recipeId: number) {

  const response = await fetch(
    `${API_URL}/recipe/${recipeId}/save`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte ta bort sparat recept.");
  }
}

export async function getMyCreatedRecipes(): Promise<Recipe[]> {

  const response = await fetch(
    `${API_URL}/recipe/created-by-me`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta dina recept.");
  }

  return response.json();
}

export async function deleteRecipe(recipeId: number) {

  const response = await fetch(
    `${API_URL}/recipe/${recipeId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte ta bort recept.");
  }
}

export async function swipeRecipe(recipeId: number, interactionType: number) {
  const response = await fetch(`${API_URL}/recipe/${recipeId}/swipe`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ interactionType }),
  });

  if (!response.ok) {
    throw new Error("Kunde inte spara swipe.");
  }

  return response.text();
}

export async function updateRecipe(
  recipeId: number,
  data: CreateRecipeRequest
) {
  const response = await fetch(
    `${API_URL}/recipe/${recipeId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte uppdatera recept.");
  }

  return response.json();
}

export async function getRecipeById(id: number) {

  const response = await fetch(
    `${API_URL}/recipe/${id}`,
    {
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error("Kunde inte hämta recept.");
  }

  return response.json();
}