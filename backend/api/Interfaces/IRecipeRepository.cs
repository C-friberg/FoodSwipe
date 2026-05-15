using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;

namespace api.Interfaces
{
    public interface IRecipeRepository
    {
        Task<Recipe?> GetByIdAsync(int id);
        Task<Recipe> CreateAsync(Recipe recipeModel);
        Task<Recipe?> UpdateAsync(int id, Recipe recipeModel);
        Task<Recipe?> DeleteAsync(int id);
        Task<List<Recipe>> GetFeedAsync(string userId, RecipeType? recipeType, int limit);
        Task<RecipeInteraction> AddInteractionAsync(RecipeInteraction recipeInteraction);
        Task<RecipeInteraction?> GetUserInteractionAsync(string userId, int recipeId, RecipeInteractionType interactionType);
        Task<RecipeInteraction> UpdateRecipeInteractionAsync(RecipeInteraction recipeInteraction);
        Task<List<Recipe>> GetSavedRecipesAsync(string userId);
        Task<RecipeInteraction?> DeleteInteractionAsync(string userId, int recipeId, RecipeInteractionType interactionType);
        Task<List<Recipe>> GetRecipesCreatedByUserAsync(string userId);
    }
}