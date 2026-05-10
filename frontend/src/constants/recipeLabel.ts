import { RecipeType, CostType } from "../types/recipe";

export const recipeTypeLabels = {
  [RecipeType.Meat]: "Meat",
  [RecipeType.Fish]: "Fish",
  [RecipeType.Vegetarian]: "Vegetarian",
  [RecipeType.Vegan]: "Vegan",
};

export const costTypeLabels = {
  [CostType.Cheap]: "Cheap",
  [CostType.Medium]: "Medium",
  [CostType.Expensive]: "Expensive",
};