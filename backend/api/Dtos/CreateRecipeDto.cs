using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;

namespace api.Dtos
{
    public class CreateRecipeDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "Receptets namn måste minst innehålla två tecken.")]
        [MaxLength(280, ErrorMessage = "Receptets namn får inte vara längre än 280 tecken.")]
        public string Name { get; set; } = string.Empty;
        [Required]
        [MinLength(10, ErrorMessage = "Beskrivningen för receptet är för kort.")]
        [MaxLength(2000, ErrorMessage = "Beskrivning är för lång, håll det till 2000 tecken.")]
        public string Description { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        [Required]
        public CostType CostType { get; set; }
        [Required]
        public RecipeType RecipeType { get; set; }
    }
}