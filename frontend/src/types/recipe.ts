export const RecipeType = {
  Meat: 1,
  Fish: 2,
  Vegetarian: 3,
  Vegan: 4,
} as const;

export type RecipeType = (typeof RecipeType)[keyof typeof RecipeType];

export const CostType = {
  Cheap: 1,
  Medium: 2,
  Expensive: 3,
} as const;

export type CostType = (typeof CostType)[keyof typeof CostType];

export type Recipe = {
  id: number;
  name: string;
  description: string;
  imageUrl?: string | null; 
  recipeType: RecipeType;
  costType: CostType;
  averageRating: number | null;
  ratingCount: number;
  bayesianScore: number;
};


