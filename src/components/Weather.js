import React from "react";

const Weather = (props) => {
  return (
    <div className="weather shadow">
      <h2>{props.city}</h2>
      <img
        className="weather-img"
        src={`http://openweathermap.org/img/wn/${props.icon}@2x.png`}
        alt="weather icon"
      ></img>
      <p>
        Actual Temp: {Math.round(props.temp)}˚F Real Feel:{" "}
        {Math.round(props.feel)}˚F
      </p>
      <p>{props.description}</p>
    </div>
  );
};

export default Weather;
