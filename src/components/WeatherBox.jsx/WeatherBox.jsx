import React, { useRef, useState } from "react";
import "./WeatherBox.css";
import { Card, Button, InputGroup, FormControl } from "react-bootstrap";
import AlertModal from "../../components/AlertModal/AlertModal";

import Loading from "../Loading/Loading";
import { v4 as uuidv4 } from "uuid";

export default function WeatherBox() {
  const searchField = useRef(null);
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertErrMsg, setAlertErrMsg] = useState("");

  const setShowAlertModalHandler = () => {
    setShowAlertModal(!showAlertModal);
  };

  const getWeatherFromSearch = (e) => {
    let place = searchField.current.value;
    setIsLoading(true);

    setTimeout(() => {
      if (place) {
        fetch(
          `${process.env.REACT_APP_API_BASE_ADDRESS}?q=${place}&units=metric&lang=he&appid=${process.env.REACT_APP_API_KEY}`
        )
          .then((result) => result.json())
          .then((resObj) => {
            setIsLoading(false);

            if (resObj.cod === "404") {
              setAlertErrMsg("עיר לא נמצאה");
              setShowAlertModal(!showAlertModal);
              setWeather({});
              return false;
            }

            setWeather({
              temp: resObj.main.temp,
              feelsLike: resObj.main.feels_like,
              description: resObj.weather[0].description,
            });
          })
          .catch((err) => {
            setAlertErrMsg("עיר לא נמצאה");
            setShowAlertModal(!showAlertModal);
            setIsLoading(false);
          });
      }
    }, 2000);
  };

  const loadWeatherResult = () => {
    let weatherResultDOM = [];
    if (weather.temp) {
      let temp = (
        <p style={{ direction: "rtl" }} key={uuidv4()}>
          {weather.temp} מעלות
        </p>
      );
      weatherResultDOM.push(temp);
    }

    if (weather.feelsLike) {
      let feelsLike = (
        <p style={{ direction: "rtl" }} key={uuidv4()}>
          מרגיש כמו {weather.feelsLike} מעלות
        </p>
      );
      weatherResultDOM.push(feelsLike);
    }

    if (weather.description) {
      let description = (
        <p style={{ direction: "rtl" }} key={uuidv4()}>
          {weather.description}
        </p>
      );
      weatherResultDOM.push(description);
    }
    return weatherResultDOM ?? "";
  };

  return (
    <>
      <AlertModal
        showAlertModal={showAlertModal}
        setShowAlertModalHandler={setShowAlertModalHandler}
        errMsg={alertErrMsg}
      />
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
    </>
  );
}
