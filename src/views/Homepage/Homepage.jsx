import React from "react";
import "./Homepage.css";
import WeatherBox from "../../components/WeatherBox.jsx/WeatherBox";

export default function Homepage(props) {
  return (
    <div>
      <div className="top-content">
        <p>
          חנות החיות Pets-Digital הינה חנות חיות המוכרת ציוד ומזון לבעלי חיים. ב
          Pets-Digital תמצאו מגוון סוגי מזון לחתולים, כלבים, מכרסמים ותוכים.
        </p>
        <p>
          אנו מאמינים שלבעלי החיים שלכם מגיע את המזון והציוד הטוב ביותר, לכן
          מטרתינו היא לספק לחיות המחמד שלכם את המוצר הטוב והמתאים ביותר עבורו
          במחיר נוח בשבילכם!
        </p>
        <p>
          Pets-Digital מייבאת מגוון רחב של מוצרים ממיטב החברות והמותגים
          המובילים.
        </p>
      </div>
      <div className="weather-container">
        <WeatherBox />
      </div>
      <img
        src="/assets/images/header.jpg"
        style={{ backgroundSize: "cover", width: "100%" }}
        alt="homepage-img"
      />
    </div>
  );
}
