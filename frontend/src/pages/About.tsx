import { useState } from "react";
import Summary from "../components/Summary";

const figmaLink = "https://www.figma.com/make/MVlUsbZA5MBzbRQ8Cw9mRs/FoodSwipe-Landing-Page?t=q3jHjg6VTxvRQonV-20&fullscreen=1";  


const DescriptionPage = () => {
    const [showSummary, setShowSummary] = useState(false); 
    return (
    <div>
        {!showSummary ? (
            <>
        <h1>Projektidé</h1>
        <p>
            FoodSwipe är en recept-applikation som presenterar användaren med recept utifrån
            relevanta parametrar satta av användaren. <br />
            Min prototyp som jag kommer att bygga i denna kursen är en mobilapplikation
            som funkar likt populära swipe-appar. Användaren kommer att swipea på olika recept och de som 
            intresserar en sparas och de som inte intresserar avfärdas. 
            Appidén uppstod för att lösa problemet "vad ska vi äta idag?" eftersom att många
            människor precis som jag har beslutsångest när det kommer till val av mat. 
             
            <br /> <br />
            Det som jag vill åstadkomma med detta projektet är ett fungerande swipe-gränsnitt 
            med en simpel UI som vem som helst ska kunna använda. Det ska även finnas en partner funktion
            där man bjuder in sin respektive för att hitta ett recept som båda gillar. De recept som båda
            partner swipear på kommer sparas och utifrån det så blir beslutet av mat enklare. 
        </p>
        <p>Se min figma här: <a href={figmaLink} target = "_blank">Figma</a></p>
        <p>Se sammanfattning av affärsplanen här:  </p>
        <button className="summary-btn" onClick = {() => setShowSummary(true)}>Affärsplan </button>
        </>
        ) : (
            <>
                <Summary />
                <button className="summary-btn" onClick = {() => setShowSummary(false)}>
                    Tillbaka
                </button>
            </>

        )}
        
        
    </div>
)}

export default DescriptionPage; 