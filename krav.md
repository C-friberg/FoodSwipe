1. Ditt inlämnade git-repo är samma som i tidigare inlämningsuppgift, men med tydligt noterat hur versionshantering mellan de olika "releaserna" är hanterade. Tex med en branching-strategi eller releaser.
   ajemen

2. Ditt inlämnade git-repo ska innehålla en readme.md fil som kort beskriver vad som behöver göras för att man ska kunna bygga och besöka applikationen via webbläsaren. Den givna beskrivningen ska vara utförlig och korrekt.
   yep

3. Ditt repo skall vara lanserad (produktionssatt) och readme.md filen innehåller en länk till den publicerade applikationen.
   japp

4. Din källkod (javascript-filer, och ev. andra filer) ska kunna transpileras med ett byggsystem beskrivet i readme.md-filen.
   yes

5. Endast lämpliga filer som inte kan genereras av byggsystemet, eller som kan installeras, ska vara versionshanterade.
   yes

6. Projektet innehåller en fil döpt till krav.md som innehåller en lista med svar på de krav som finns för App med en beskrivning över vilka krav som är lösta med en kort förklaring hur.

japp

7. När app besöks i webbläsaren ska din prototyp renderas med React
   yes.

8. React-trädet som renderas som ska bestå av minst 5st komponenter som du skrivit själv och som finns med i källkoden. (alla komponenter behöver inte renderas samtidigt)

Jag har 8 komponenter med.

9. Dina React komponenter är skrivna med JSX syntaxen.
   Jag använde mig av TSX men tekniskt sätt ja.

10. Minst två av dina komponenter ska hantera ett "event" i Javascript, exempelvis från användaren.

event hanteras i SwipePage för att spara eller hoppa över ett recept. och i homepage för en navigations knapp för en bättre UX upplevelse, samma navigation finns i nav men eftersom appens huvudsyfte är just swipe funktionen så ville jag att den skulle vara så lätt att hitta som möjligt.

11. Minst två av dina komponenter ska använda sig av state för att rendera tillståndsbaserad information. (i.e. "conditional rendering")

state används i flera komponeneter. I SwipePage för CurrentIndex. I RecipesPage för sparade recept och i app.tsx för antal sparade recept.

12. En av dina komponenter använder sig av en Lifecycle metod eller hook för att påverka en annan komponents tillstånd. Render räknas inte som en lifecycle metod.
    State används i app.tsx, SwipePage uppdaterar state vilken påverkar NavBar som visar hur många recept som finns i "mina recept".

13. Via en av komponenterna ska användaren kunna spara information i LocalStorage.
    Recepten man väljer att spara läggs i localstorage.

14. Informationen i LocalStorage används vid renderingen av React-trädet.
    De sparade recepten renderas på sidan Mina Recept.

15. I app används egen css, eller ett bibliotek för att ge dina komponenter stil och form
    Yes, jag tog bort VITE boilerplaten eftersom den bara innebar problem vid deploy men designen är sig lik.

16. I app används egen css för att ge dina komponenter rörelser

Korten för recepten som presenteras har en "fadein" på sig för att representera rörelse.
