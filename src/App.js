import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button } from "reactstrap";
import { API_KEY } from "./utils";
import Weather from "./components/Weather";
import "./App.css";

function App() {
  const [weather, setWeather] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const [location, setLocation] = useState(80239);

  const onSubmit = (data) => {
    setLocation(data.zipcode);
    reset();
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?zip=${location},us&appid=${API_KEY}&units=imperial`
      )
      .then((res) => {
        const data = res.data;
        setWeather({
          data: data,
          city: data.name,
          temperature: data.main.temp,
          realFeel: data.main.feels_like,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
          error: "",
        });
      })

      .catch((err) => console.log(err));
  }, [location]);

  //form

  return (
    <div className="App">
      <h1 className="title ">Weather Guide</h1>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container ">
            <input name="zipcode" placeholder="Zipcode" ref={register} />

            <Button className="btn" color="primary" type="submit">
              Submit
            </Button>
            <h5>Enter a zipcode to check the weather</h5>
          </div>
        </form>
        <Weather
          temp={weather.temperature}
          feel={weather.realFeel}
          city={weather.city}
          icon={weather.icon}
          description={weather.description}
        />
      </div>
    </div>
  );
}

export default App;
