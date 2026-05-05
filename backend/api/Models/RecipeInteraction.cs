using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Models
{
    public class RecipeInteraction
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; } = null!;
        public RecipeInteractionType ActionType { get; set; }
        public int? RatingValue { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

    }
}