import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

  const [recipeType, setRecipeType] =
    useState<RecipeType>(RecipeType.Meat);

  const [costType, setCostType] =
    useState<CostType>(CostType.Cheap);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchRecipe() {

      try {

        if (!id) return;

        const recipe = await getRecipeById(Number(id));

        setName(recipe.name);
        setDescription(recipe.description);
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
    <main>

      <h1>Redigera recept</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

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

        <button type="submit">
          Uppdatera recept
        </button>

      </form>

    </main>
  );
}