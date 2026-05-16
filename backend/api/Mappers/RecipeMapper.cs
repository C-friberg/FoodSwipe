using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Models;

namespace api.Mappers
{
    public static class RecipeMapper
    {
        public static RecipeDto ToRecipeDto(this Recipe recipeModel)
        {
            return new RecipeDto
            {
                Id = recipeModel.Id,
                Name = recipeModel.Name,
                Description = recipeModel.Description,
                ImageUrl = recipeModel.ImageUrl,
                CostType = recipeModel.CostType,
                RecipeType = recipeModel.RecipeType,
                CreatedByUserId = recipeModel.CreatedByUserId,
                AverageRating = recipeModel.AverageRating,
                RatingCount = recipeModel.RatingCount,
                BayesianScore = recipeModel.BayesianScore,
                CreatedAt = recipeModel.CreatedAt
            };
        }

        public static Recipe ToRecipeFromCreateDto(this CreateRecipeDto recipeDto)
        {
            return new Recipe
            {
                Name = recipeDto.Name,
                Description = recipeDto.Description,
                ImageUrl = recipeDto.ImageUrl,
                CostType = recipeDto.CostType,
                RecipeType = recipeDto.RecipeType
            };
        }
    }
}