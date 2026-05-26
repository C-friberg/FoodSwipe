Krav 1: Samma källkodsprojekt som innan.

Krav 2: Just nu så använder jag inte alla komponenter, men kravet med 15 komponenter uppfylls.

Krav 3: ErrorBoundry komponent tillagd. Vill man testa den så kan man
avkommentera raden över return i RecipeCard.tsx.

Krav 5:

Krav 6: Använder ContextAPI i /context/AuthContext.

Krav 7: Yes min frontend kommunicerar med REST API vid fler än 4 tillfällen.

Krav 8:

Krav 9: Data och statehantering

För avancerad state hantering valde jag att använda React Context API. Jag använde Context för att hantera autentisieringen i hella applikationen med AuthContext. AuthContext används för att lagra vår JWT token och hålla koll på om användaren är inloggad eller inte. Jag wrappade applikationen med AuthProvider så att alla komponenter kan använda auth-state.
Jag använde den på LoginPage och NavBar där login/logout och inloggningstatus delas mellan komponenter.
Jag valde Context API eftersom att det är rätt simpelt att implementera, samt att den är inbyggd som passade bra till denna relativt lilla applikation.

Krav 12: Min Error Boundry

Min Error Boundary

I min app så har jag implementerat en Error Boundry för att hantera oväntade fel som kan uppstå. När ett fel uppstår så visar komponenten ett eget fallback gränssnitt, användaren får ett felmeddelande och kan ladda om sidan med en knapp.

Error boundry komponenten bidrar till en bättre användarupplevelse eftersom användaren får feedback om att något gått fel istället för att applikationen slutar fungera utan någon info om varför. I RecipeCard.tsx kan du testa denhär komponenten genom att ta bort kommentarerna kring den utkommenterade raden ovan return.
