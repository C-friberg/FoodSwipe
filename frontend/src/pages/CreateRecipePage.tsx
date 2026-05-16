import { useState } from "react";
import { createRecipe } from "../api/recipeApi";
import { RecipeType, CostType } from "../types/recipe";
import type { RecipeType as RecipeTypeValue, CostType as CostTypeValue } from "../types/recipe";
import "./CreateRecipePage.css";

export default function CreateRecipePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [recipeType, setRecipeType] = useState<RecipeTypeValue>(RecipeType.Meat);
  const [costType, setCostType] = useState<CostTypeValue>(CostType.Cheap);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
        imageUrl: imageUrl || null,
      });

      setName("");
      setDescription("");
      setImageUrl(""); 
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
    <main className="create-recipe-page">
  <section className="create-recipe-card">
    <h1>Lägg upp recept</h1>
    <p className="create-recipe-intro">
      Dela ett recept som andra kan hitta i FoodSwipe.
    </p>

    <form className="create-recipe-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Namn</label>
        <input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Beskrivning</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="imageUrl">Bildlänk</label>
        <input
          id="imageUrl"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/bild.jpg"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
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

        <div className="form-group">
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
      </div>

      <button className="primary-button" disabled={loading}>
        {loading ? "Skapar..." : "Skapa recept"}
      </button>
    </form>

    {message && <p className="form-message">{message}</p>}
  </section>
</main>
  );
}