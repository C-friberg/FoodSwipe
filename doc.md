Krav 1: Samma källkodsprojekt som innan.

Krav 2: Just nu så använder jag inte alla komponenter, men kravet med 15 komponenter uppfylls.

Krav 3: ErrorBoundry komponent tillagd. Vill man testa den så kan man
avkommentera raden över return i RecipeCard.tsx.

Krav 5: Min återanvändbara komponent är en Button, Button.tsx. Den är generellt återanvändningsbar .

Krav 6: Använder ContextAPI i /context/AuthContext.

Krav 7: Yes min frontend kommunicerar med REST API vid fler än 4 tillfällen.

Krav 8: Yes det är avgränsat.

Krav 9: Data och statehantering

För avancerad state hantering valde jag att använda React Context API. Jag använde Context för att hantera autentisieringen i hella applikationen med AuthContext. AuthContext används för att lagra vår JWT token och hålla koll på om användaren är inloggad eller inte. Jag wrappade applikationen med AuthProvider så att alla komponenter kan använda auth-state.
Jag använde den på LoginPage och NavBar där login/logout och inloggningstatus delas mellan komponenter.
Jag valde Context API eftersom att det är rätt simpelt att implementera, samt att den är inbyggd som passade bra till denna relativt lilla applikation.

Krav 10: Min återanvändningsbara komponent

Den återanvändningsbara komponent jag valde att skapa var en Button komponent i React. Syftet med den komponenten var att samla gemensam funktionlitet och styling för knappar på ett och samma ställe istället för att skriva samma kod flera gånger i olika komponenter. Komponenten används i login, registrering , logga ut, och för att ta bort recept.

Button komponenten är designad för att stödja flera olika egenskaper, till exempel visuella varainter som (primary, danger, secondary) loading state och disabled state.Vi kan använda samma komponent flera gånger i många olika situationer beroende på vilken funnktion knappen har i applikationen. T.ex danger variat för delete knappar.

En annan fördel är att styling och funktionalitet blir smidigare, om jag vill ändra utseendet eller beteendet för knappar i framtiden kan jag direkt ändra Button komponenten.

Krav 11.Kodstruktur och felhantering

För att göra frontend koden mer strukturerad valde jag att separera kommunikationen med REST APIet från React komponenterna. Istället för att skriva fetch anrop direkt i komponenterna så gjorde jag separata filer för API logik, t.ex AuthApi.ts och recipeApi.ts.

Jag implementerade även felhantering både i API lagret och i react komponenterna. Efter varje fetch kontrolleras response.ok, och om något går fel så fångas det av try/catch i komponenterna. Så användarna får tydliga felmeddelanden istället för att applikationen kraschar eller slutar funka utan feedback.

Även Error Boundry komponenten fångar upp oväntade renderingsfel och visar ett fallback gränssnitt.

Krav 12: Min Error Boundry

I min app så har jag implementerat en Error Boundry för att hantera oväntade fel som kan uppstå. När ett fel uppstår så visar komponenten ett eget fallback gränssnitt, användaren får ett felmeddelande och kan ladda om sidan med en knapp.

Error boundry komponenten bidrar till en bättre användarupplevelse eftersom användaren får feedback om att något gått fel istället för att applikationen slutar fungera utan någon info om varför. I RecipeCard.tsx kan du testa denhär komponenten genom att ta bort kommentarerna kring den utkommenterade raden ovan return.
