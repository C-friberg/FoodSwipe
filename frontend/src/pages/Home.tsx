import { useNavigate } from "react-router-dom";
import demoImg from "../assets/demo.png"; 

const HomePage = () => {
    const navigate = useNavigate(); 
    return (
    <div>
        <h1>FoodSwipe</h1>
        <button className = "navBtn" onClick={() => navigate("/swipe")}>Börja Swipea på recept här</button>
        <h2>Upptäck ditt nästa favoritrecept</h2>
        <p>Ladda ner appen nu på App Store eller Google Play</p>
        <img src={demoImg} className = "demo-img" ></img>
    </div>
)
}

export default HomePage; 