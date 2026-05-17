using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class Recipe
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public CostType CostType { get; set; }
        public RecipeType RecipeType { get; set; }
        public string CreatedByUserId { get; set; } = string.Empty;
        public decimal? AverageRating { get; set; }
        public string? ImageUrl { get; set; }
        public int RatingCount { get; set; }
        public decimal BayesianScore { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public ICollection<RecipeInteraction> Interactions { get; set; } = new List<RecipeInteraction>();

    }
}