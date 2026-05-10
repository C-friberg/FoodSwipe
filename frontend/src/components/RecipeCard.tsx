import type { Recipe } from "../types/recipe";
import {recipeTypeLabels, costTypeLabels } from "../constants/recipeLabel";

type Props = {
  recipe: Recipe;
  onSave: () => void;
  onNext: () => void;
};

export default function RecipeCard({ recipe, onSave, onNext }: Props) {
  return (
    <article>
      <h2>{recipe.name}</h2>

      <p>{recipe.description}</p>

      <p>{recipeTypeLabels[recipe.recipeType]}</p>

        <p>{costTypeLabels[recipe.costType]}</p>

      <p>
        Betyg:{" "}
        {recipe.averageRating !== null
          ? recipe.averageRating.toFixed(1)
          : "Inga betyg ännu"}
      </p>

      <button onClick={onNext}>Nästa</button>
      <button onClick={onSave}>Spara</button>
    </article>
  );
}