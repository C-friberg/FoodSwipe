import { useState } from "react";
import { createRecipe } from "../api/recipeApi";
import { RecipeType, CostType } from "../types/recipe";
import type { RecipeType as RecipeTypeValue, CostType as CostTypeValue } from "../types/recipe";

export default function CreateRecipePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipeType, setRecipeType] = useState<RecipeTypeValue>(RecipeType.Meat);
  const [costType, setCostType] = useState<CostTypeValue>(CostType.Cheap);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      await createRecipe({
        name,
        description,
        recipeType,
        costType,
      });

      setName("");
      setDescription("");
      setRecipeType(RecipeType.Meat);
      setCostType(CostType.Cheap);

      setMessage("Receptet skapades!");
    } catch {
      setMessage("Något gick fel när receptet skulle skapas.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Lägg upp recept</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Namn</label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description">Beskrivning</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="recipeType">Typ</label>
          <select
            id="recipeType"
            value={recipeType}
            onChange={(e) =>
              setRecipeType(Number(e.target.value) as RecipeTypeValue)
            }
          >
            <option value={RecipeType.Meat}>Kött</option>
            <option value={RecipeType.Fish}>Fisk</option>
            <option value={RecipeType.Vegetarian}>Vegetariskt</option>
            <option value={RecipeType.Vegan}>Veganskt</option>
          </select>
        </div>

        <div>
          <label htmlFor="costType">Kostnad</label>
          <select
            id="costType"
            value={costType}
            onChange={(e) =>
              setCostType(Number(e.target.value) as CostTypeValue)
            }
          >
            <option value={CostType.Cheap}>Billigt</option>
            <option value={CostType.Medium}>Medel</option>
            <option value={CostType.Expensive}>Dyrt</option>
          </select>
        </div>

        <button disabled={loading}>
          {loading ? "Skapar..." : "Skapa recept"}
        </button>
      </form>

      {message && <p>{message}</p>}
    </main>
  );
}