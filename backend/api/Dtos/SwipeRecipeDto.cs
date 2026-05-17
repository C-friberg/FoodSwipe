using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Enums;
using api.Models;

namespace api.Dtos
{
    public class SwipeRecipeDto
    {
        public RecipeInteractionType InteractionType {get; set;}
    }
}