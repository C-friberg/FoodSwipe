import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditRecipePage.css";

import {
  getRecipeById,
  updateRecipe,
} from "../api/recipeApi";

import {
  RecipeType,
  CostType,
} from "../types/recipe";

export default function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipeType, setRecipeType] = useState<RecipeType>(RecipeType.Meat);
  const [costType, setCostType] = useState<CostType>(CostType.Cheap);
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchRecipe() {

      try {

        if (!id) return;

        const recipe = await getRecipeById(Number(id));

        setName(recipe.name);
        setDescription(recipe.description);
        setImageUrl(recipe.imageUrl ?? "");
        setRecipeType(recipe.recipeType);
        setCostType(recipe.costType);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();

  }, [id]);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {

      if (!id) return;

      await updateRecipe(Number(id), {
        name,
        description,
        recipeType,
        costType,
        imageUrl: imageUrl || null
      });

      navigate("/my-recipes");

    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return <p>Laddar recept...</p>;
  }

  return (
  <main className="edit-recipe-page">

    <section className="edit-recipe-card">

      <h1>Redigera recept</h1>

      <form
        className="edit-recipe-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>Namn</label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>Beskrivning</label>

          <textarea
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label htmlFor="imageUrl">
            Bildlänk
          </label>

          <input
            id="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) =>
              setImageUrl(e.target.value)
            }
            placeholder="https://example.com/bild.jpg"
          />

        </div>

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            className="edit-image-preview"
          />
        )}

        <div className="form-row">

          <div className="form-group">

            <label>Typ</label>

            <select
              value={recipeType}
              onChange={(e) =>
                setRecipeType(Number(e.target.value) as RecipeType)
              }
            >
              <option value={RecipeType.Meat}>
                Meat
              </option>

              <option value={RecipeType.Fish}>
                Fish
              </option>

              <option value={RecipeType.Vegetarian}>
                Vegetarian
              </option>

              <option value={RecipeType.Vegan}>
                Vegan
              </option>
            </select>

          </div>

          <div className="form-group">

            <label>Kostnad</label>

            <select
              value={costType}
              onChange={(e) =>
                setCostType(Number(e.target.value) as CostType)
              }
            >
              <option value={CostType.Cheap}>
                Cheap
              </option>

              <option value={CostType.Medium}>
                Medium
              </option>

              <option value={CostType.Expensive}>
                Expensive
              </option>
            </select>

          </div>

        </div>

        <button
          className="update-button"
          type="submit"
        >
          Uppdatera recept
        </button>

      </form>

    </section>

  </main>
);
}