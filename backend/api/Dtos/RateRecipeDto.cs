using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos
{
    public class RateRecipeDto
    {
        [Required]
        [Range(1, 5)]
        public int RatingValue { get; set; }
    }
}