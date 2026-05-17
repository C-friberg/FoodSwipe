using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Enums;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly AppDbContext _context;
        public RecipeRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<RecipeInteraction> AddInteractionAsync(RecipeInteraction recipeInteraction)
        {
            await _context.RecipeInteractions.AddAsync(recipeInteraction);
            await _context.SaveChangesAsync();
            return recipeInteraction;
        }

        public async Task<Recipe> CreateAsync(Recipe recipeModel)
        {
            await _context.Recipes.AddAsync(recipeModel);
            await _context.SaveChangesAsync();
            return recipeModel;
        }

        public async Task<Recipe?> DeleteAsync(int id)
        {
            var recipeModel = await _context.Recipes.FirstOrDefaultAsync(x => x.Id == id);
            if (recipeModel == null)
            {
                return null;
            }
            _context.Recipes.Remove(recipeModel);
            await _context.SaveChangesAsync();

            return recipeModel;
        }

        public async Task<Recipe?> GetByIdAsync(int id)
        {
            return await _context.Recipes.Include(x => x.Interactions).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Recipe>> GetFeedAsync(string userId, RecipeType? recipeType, int limit)
        {
            var query = _context.Recipes.AsQueryable();

            if (recipeType.HasValue)
            {
                query = query.Where(x => x.RecipeType == recipeType.Value);
            }

            query = query.Where(recipe => !recipe.Interactions.Any(interaction => interaction.UserId == userId));

            return await query.OrderByDescending(x => x.BayesianScore).Take(limit).ToListAsync();
        }

        public async Task<List<Recipe>> GetSavedRecipesAsync(string userId)
        {
            return await _context.Recipes.Include(x => x.Interactions)
                .Where(recipe => recipe.Interactions.Any(interaction =>
                interaction.UserId == userId &&
                interaction.ActionType == RecipeInteractionType.Saved)).ToListAsync();
        }

        public async Task<RecipeInteraction?> GetUserInteractionAsync(string userId, int recipeId, RecipeInteractionType interactionType)
        {
            return await _context.RecipeInteractions.FirstOrDefaultAsync(x => x.UserId == userId && x.RecipeId == recipeId && x.ActionType == interactionType);
        }

        public async Task<Recipe?> UpdateAsync(int id, Recipe recipeModel)
        {
            var existingRecipe = await _context.Recipes.FindAsync(id);
            if (existingRecipe == null)
            {
                return null;
            }
            existingRecipe.Name = recipeModel.Name;
            existingRecipe.Description = recipeModel.Description;
            existingRecipe.CostType = recipeModel.CostType;
            existingRecipe.ImageUrl = recipeModel.ImageUrl;
            existingRecipe.RecipeType = recipeModel.RecipeType;

            await _context.SaveChangesAsync();
            return existingRecipe;
        }

        public async Task<RecipeInteraction> UpdateRecipeInteractionAsync(RecipeInteraction recipeInteraction)
        {
            recipeInteraction.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return recipeInteraction;
        }

        public async Task<RecipeInteraction?> DeleteInteractionAsync(string userId, int recipeId, RecipeInteractionType interactionType)
        {
            var interaction = await _context.RecipeInteractions
                .FirstOrDefaultAsync(x =>
                    x.UserId == userId &&
                    x.RecipeId == recipeId &&
                    x.ActionType == interactionType);

            if (interaction == null)
                return null;

            _context.RecipeInteractions.Remove(interaction);

            await _context.SaveChangesAsync();

            return interaction;
        }

        public async Task<List<Recipe>> GetRecipesCreatedByUserAsync(string userId)
        {
            return await _context.Recipes
                .Where(x => x.CreatedByUserId == userId)
                .OrderByDescending(x => x.CreatedAt)
                .ToListAsync();
        }
    }
}