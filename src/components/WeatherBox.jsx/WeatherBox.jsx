import React, { useRef, useState } from "react";
import "./WeatherBox.css";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { api } from "./../../api";

export default function WeatherBox() {
  const searchField = useRef(null);
  const [weather, setWeather] = useState({});

  const getWeatherFromSearch = (e) => {
    let place = searchField.current.value;
    if (place) {
      fetch(`${api.base}?q=${place}&units=metric&lang=he&appid=${api.key}`)
        .then((result) => result.json())
        .then((resObj) => {
          if (resObj.cod == "404") return alert("נתונים לא נמצאו");
          setWeather({
            temp: resObj.main.temp,
            feelsLike: resObj.main.feels_like,
            description: resObj.weather[0].description,
          });
        })
        .catch((err) => {
          if (err.cod) alert("נתונים לא נמצאו");
        });
    }
  };

  const loadWeatherResult = () => {
    let weatherResultDOM = [];
    if (weather.temp) {
      let temp = <p style={{ direction: "rtl" }}>{weather.temp} מעלות</p>;
      weatherResultDOM.push(temp);
    }

    if (weather.feelsLike) {
      let feelsLike = (
        <p style={{ direction: "rtl" }}>מרגיש כמו {weather.feelsLike} מעלות</p>
      );
      weatherResultDOM.push(feelsLike);
    }

    if (weather.description) {
      let description = (
        <p style={{ direction: "rtl" }}>{weather.description}</p>
      );
      weatherResultDOM.push(description);
    }
    return weatherResultDOM ?? "";
  };

  return (
    <Card className="container">
      <Card.Body className="weather-center-text">
        <Card.Title>מזג אוויר</Card.Title>
        <Card.Text>בדוק האם זה זמן טוב להוציא את חיית המחמד לטיול</Card.Text>
        <InputGroup className="mb-3" style={{ direction: "rtl" }}>
          <FormControl
            aria-label="Last name"
            placeholder="עיר, מדינה"
            ref={searchField}
          />
        </InputGroup>
        {loadWeatherResult()}
        <Button variant="primary" onClick={getWeatherFromSearch}>
          בדוק
        </Button>
      </Card.Body>
    </Card>
  );
}
