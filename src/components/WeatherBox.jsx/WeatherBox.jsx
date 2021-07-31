import React, { useRef, useState, useEffect } from "react";
import "./WeatherBox.css";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import { api } from "./../../api";
import Loading from "../Loading/Loading";

export default function WeatherBox() {
  const searchField = useRef(null);
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const getWeatherFromSearch = (e) => {
    let place = searchField.current.value;
    setIsLoading(true);

    setTimeout(() => {
      if (place) {
        fetch(`${api.base}?q=${place}&units=metric&lang=he&appid=${api.key}`)
          .then((result) => result.json())
          .then((resObj) => {
            setIsLoading(false);

            if (resObj.cod == "404") {
              setWeather({});
              return alert("נתונים לא נמצאו");
            }

            setWeather({
              temp: resObj.main.temp,
              feelsLike: resObj.main.feels_like,
              description: resObj.weather[0].description,
            });
          })
          .catch((err) => {
            setIsLoading(false);
            if (err.cod) alert("נתונים לא נמצאו");
          });
      }
    }, 2000);
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
        {isLoading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Loading />
          </div>
        ) : (
          loadWeatherResult()
        )}
        <Button
          variant="primary"
          onClick={getWeatherFromSearch}
          disabled={isLoading}
        >
          בדוק
        </Button>
      </Card.Body>
    </Card>
  );
}
