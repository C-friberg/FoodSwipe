Krav 1: Samma källkodsprojekt som innan.

Krav 2: Just nu så använder jag inte alla komponenter, men kravet med 15 komponenter uppfylls. 

Krav 3:

Krav 5: 

Krav 6: Använder ContextAPI i /context/AuthContext. 

Krav 7: Yes min frontend kommunicerar med REST API vid fler än 4 tillfällen.

Krav 8: 

Krav 9: För avancerad state hantering valde jag att använda React Context API. Jag använde Context för att hantera autentisieringen i hella applikationen med AuthContext. AuthContext används för att lagra vår JWT token och hålla koll på om användaren är inloggad eller inte. Jag wrappade applikationen med AuthProvider så att alla komponenter kan använda auth-state. 
Jag använde den på LoginPage och NavBar där login/logout och inloggningstatus delas mellan komponenter. 
Jag valde Context API eftersom att det är rätt simpelt att implementera, samt att den är inbyggd som passade bra till denna relativt lilla applikation. 

