Beskriv projektet och hur det ska startas och användas

Kort beskrivning

Detta är ett projekt som skrivs med hjälp av React. Projektet är en recept applikation som ska presentera användaren med olika recept. Till en början så är det tänkt att hämta dessa recept från öppna och allmäna API'er. Men man ska även kunna lägga in sina egna recept för andra användare att hitta. Ett recept åt gången kommer presenteras för användare, sveper man höger så sparar man det, och sveper man vänster så avfärdas det.

Syftet är att underlätta användarens dag genom att inte behöva fundera vad man ska äta. Användaren ska kunna ställa in preferenser så som t.ex allergier, tillgängliga ingredienser i hemmet, kostnad osv.
Men i framtiden så vill jag även att man ska kunna ställa in saker såsom proteinrik mat för den som tränar osv.

---

Hur startar man igång projektet?

För att starta denna sida, se till så du navigerar till mappen "FoodSwipe", observera att det finns två stycken mappar med samma namn, men du vill navigera till /FoodSwipe/FoodSwipe. För att starta applikationen så går du till 'Terminal' -> 'New Terminal'. När terminalen öppnar sig så skriver du in 'npm run dev' och klistrar in localhost som visas in i din sökmotor (alternativt ctrl + klick).

Just nu finns det bara information om projektet. Men jag kommer uppdatera denna texten under projektets gång om fler instruktioner behövs gå igenom.

OBS 2026-04-10
Den aktuella koden ligger på branch swipefeature så för att starta koden, se till så att hämta koden från branch "swipefeature". Resten av stegen är demsamma.

---

Deployad version finns här:

Länk till digitalocean app: https://foodswipe-app-eb5y8.ondigitalocean.app/

Hur hänger frontend och backend ihop?

Projektet består av React i frontend, och ett Web Api byggt med ASP .NET.

Frontend ansvarar för användargränssnittet, till exempel login, receptkort, swipe-funktion, sparade recept och formulär för att skapa/redigera recept.

Backend ansvarar för datalagring, autentisering, recept logik och interaktioner. Frontend kommunicerar med backend via HTTP fetch anrop.

Exempel:

- POST /api/account/login loggar in användaren och returnerar en JWT-token.
- GET /api/recipe/feed hämtar receptflödet.
- POST /api/recipe/{id}/save sparar ett recept.
- POST /api/recipe/{id}/rate betygsätter ett recept.
- POST /api/recipe skapar ett nytt recept.

När användaren är inloggad sparas JWT-token i localStorage och skickas med i API-anrop via 'Authorization: Bearer <token>'.

Hur startas backend? Vilka portar skall användas för frontend som backend samt databas?

Navigera till cd foodswipe/frontend, kör 'npm install' för att hämta paketen som tillhör. 

Starta frontend med 'npm run dev', och shift + click (alternativt kopiera in: http://localhost:5173/) i webbläsaren. 

Starta även backend genom att navigera till cd foodswipe/backend/api.
Starta igång genom att skriva in 'dotnet run' i terminalen. 
Backend kommer köras på http://localhost:5143 när backend är igång. 

Jag har använt mig av SQL server i programmet, så för att koppla till databasen så kan du kopiera följande över '"Logging": {/* koden som är här i */}' :  

 "ConnectionStrings": {
    "DefaultConnection": "Server=DITT-NAMN-HÄR\\SQLEXPRESS;Database=FoodSwipe;Trusted_Connection=True;TrustServerCertificate=True"

  },

  I t.ex SQL Server Management Studio så skapar du en ny databas genom att högerklicka på Databses -> 
  New Database -> Välj ett namn, t.ex FoodSwipe", Byt ut "DITT-NAMN-HÄR" mot din dators namn. 
  Sedan kan du köra migrations: "dotnet ef database update". 
