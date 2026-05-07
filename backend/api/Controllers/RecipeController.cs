using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos;
using api.Enums;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/recipe")]
    public class RecipeController : ControllerBase
    {
        private readonly IRecipeRepository _recipeRepo;
        public RecipeController(IRecipeRepository recipeRepo)
        {
            _recipeRepo = recipeRepo;
        }

        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById([FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipe = await _recipeRepo.GetByIdAsync(id);
            if (recipe == null)
            {
                return NotFound();
            }

            return Ok(recipe.ToRecipeDto());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateRecipeDto recipeDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var recipeModel = recipeDto.ToRecipeFromCreateDto();

            // Ta bort när vi har JWT i framtiden.
            recipeModel.CreatedByUserId = "testuser";

            recipeModel.AverageRating = null;
            recipeModel.RatingCount = 0;
            recipeModel.BayesianScore = 3.5m;

            await _recipeRepo.CreateAsync(recipeModel);
            return CreatedAtAction(nameof(GetById), new { id = recipeModel.Id }, recipeModel.ToRecipeDto());
        }

        [HttpGet("feed")]
        public async Task<IActionResult> GetFeed([FromQuery] RecipeType? recipeType, [FromQuery] int limit = 10)
        {
            if (limit <= 0)
                return BadRequest("Limit måste vara större än 0.");

            if (limit > 50)
                limit = 50;

            // Tills vi har JWT
            var userId = "testuser";

            var recipes = await _recipeRepo.GetFeedAsync(userId, recipeType, limit);

            var recipeDtos = recipes.Select(r => r.ToRecipeDto()).ToList();

            return Ok(recipeDtos);
        }

        [HttpPost("{id:int}/swipe")]
        public async Task<IActionResult> Swipe([FromRoute] int id, [FromBody] SwipeRecipeDto swipeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipe = await _recipeRepo.GetByIdAsync(id);

            if (recipe == null)
                return NotFound("Receptet hittades inte.");

            // Tills riktig JWT
            var userId = "testuser";

            var existingInteraction = await _recipeRepo.GetUserInteractionAsync(
                userId,
                id,
                swipeDto.InteractionType
            );

            if (existingInteraction != null)
                return BadRequest("Du har redan gjort denna interaktion på receptet.");

            var interaction = new RecipeInteraction
            {
                UserId = userId,
                RecipeId = id,
                ActionType = swipeDto.InteractionType,
                CreatedAt = DateTime.UtcNow
            };

            await _recipeRepo.AddInteractionAsync(interaction);

            return Ok("Interaktion sparad.");
        }

        [HttpPost("{id:int}/rate")]
        public async Task<IActionResult> Rate(
            [FromRoute] int id,
            [FromBody] RateRecipeDto rateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipe = await _recipeRepo.GetByIdAsync(id);

            if (recipe == null)
                return NotFound("Receptet hittades inte.");

            if (rateDto.RatingValue < 1 || rateDto.RatingValue > 5)
                return BadRequest("Rating måste vara mellan 1 och 5.");

            // Byt när vi kör JWT
            var userId = "testuser";

            var existingRating = await _recipeRepo.GetUserInteractionAsync(
                userId,
                id,
                RecipeInteractionType.Rated
            );

            if (existingRating == null)
            {
                var ratingInteraction = new RecipeInteraction
                {
                    UserId = userId,
                    RecipeId = id,
                    ActionType = RecipeInteractionType.Rated,
                    RatingValue = rateDto.RatingValue,
                    CreatedAt = DateTime.UtcNow
                };

                await _recipeRepo.AddInteractionAsync(ratingInteraction);
            }
            else
            {
                existingRating.RatingValue = rateDto.RatingValue;
                await _recipeRepo.UpdateRecipeInteractionAsync(existingRating);
            }

            var allRatings = recipe.Interactions
                .Where(x => x.ActionType == RecipeInteractionType.Rated && x.RatingValue.HasValue)
                .Select(x => x.RatingValue!.Value)
                .ToList();

            if (!allRatings.Any())
            {
                allRatings.Add(rateDto.RatingValue);
            }

            recipe.RatingCount = allRatings.Count;
            recipe.AverageRating = (decimal)allRatings.Average();

            var globalAverage = 3.5m;
            var minVotes = 5m;
            var ratingCount = recipe.RatingCount;
            var averageRating = recipe.AverageRating ?? globalAverage;

            recipe.BayesianScore =
                ((ratingCount / (ratingCount + minVotes)) * averageRating) +
                ((minVotes / (ratingCount + minVotes)) * globalAverage);

            await _recipeRepo.UpdateAsync(id, recipe);

            return Ok(recipe.ToRecipeDto());
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] CreateRecipeDto recipeDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var recipeModel = recipeDto.ToRecipeFromCreateDto();

            var updatedRecipe = await _recipeRepo.UpdateAsync(id, recipeModel);

            if (updatedRecipe == null)
                return NotFound();

            return Ok(updatedRecipe.ToRecipeDto());
        }

        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var deletedRecipe = await _recipeRepo.DeleteAsync(id);

            if (deletedRecipe == null)
                return NotFound();

            return NoContent();
        }
    }
}