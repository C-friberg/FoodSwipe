import type { Recipe } from "../types/recipe";
import "./RecipeCard.css";
import {recipeTypeLabels, costTypeLabels } from "../constants/recipeLabel";

type Props = {
  recipe: Recipe;
  onSave: () => void;
  onNext: () => void;
};

export default function RecipeCard({ recipe, onSave, onNext }: Props) {
  return (
    <article className="recipe-card">
        {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.name}
          className="recipe-img"
        />
  )}
        <div className="recipe-rating-badge">
            {recipe.averageRating !== null ? recipe.averageRating.toFixed(1) : "Ny"}
        </div>

        <div className="recipe-card-content">
            <p className="recipe-type">{recipeTypeLabels[recipe.recipeType]}</p>

            <h2>{recipe.name}</h2>

            <p className="recipe-description">{recipe.description}</p>

            <div className="recipe-meta">
            <span>{costTypeLabels[recipe.costType]}</span>
            <span>{recipe.ratingCount} betyg</span>
            </div>
        </div>

        <div className="recipe-actions">

          <button
            className="swipe-btn swipe-no"
            onClick={onNext}>
            ✕
          </button>

          <button
            className="swipe-btn swipe-yes"
            onClick={onSave}>
            ✓
          </button>

        </div>
    </article>
  );
}