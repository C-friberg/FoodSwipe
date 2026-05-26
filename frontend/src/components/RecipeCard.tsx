import type { Recipe } from "../types/recipe";
import {recipeTypeLabels, costTypeLabels } from "../constants/recipeLabel";
import { motion } from "framer-motion";
import "./RecipeCard.css";
import ErrorBoundary from "./ErrorBoundry";

type Props = {
  recipe: Recipe;
  onSave: () => void;
  onNext: () => void;
};

export default function RecipeCard({ recipe, onSave, onNext }: Props) {
  /* throw new Error("Test error boundary"); */
  return (
    <motion.article
      className="recipe-card"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      whileDrag={{ scale: 1.03, rotate: 3 }}
      onDragEnd={(_, info) => {
        if (info.offset.x > 120) {
          onSave();
        }

        if (info.offset.x < -120) {
          onNext();
        }
      }}
    >
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
    </motion.article>
  );
}