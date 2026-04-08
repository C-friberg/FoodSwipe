type Recipe = {
  id: number
  title: string
  description: string
  img: string
  calories: number
  isVegan: boolean
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: "Tacos",
    description: "Klassisk fredags tacos",
    img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092",
    calories: 650,
    isVegan: false
  },
  {
    id: 2,
    title: "Vegansk Buddha Bowl",
    description: "Näringsrik och färgglad vegansk rätt",
    img: "https://images.unsplash.com/photo-1546069901-eacef0df6022",
    calories: 500,
    isVegan: true
  },
  {
    id: 3,
    title: "Kyckling med ris",
    description: "Proteinrik och enkel vardagsrätt",
    img: "https://images.unsplash.com/photo-1604908554025-4b47b5e3c2c5",
    calories: 700,
    isVegan: false
  },
  {
    id: 4,
    title: "Pasta pesto",
    description: "Snabb och smakrik pastarätt",
    img: "https://images.unsplash.com/photo-1525755662778-989d0524087e",
    calories: 600,
    isVegan: true
  },
  {
    id: 5,
    title: "Laxsallad",
    description: "Fräsch sallad med ugnsbakad lax",
    img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    calories: 550,
    isVegan: false
  }
]