import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const apiKey = "f27fd8797ed10c21ea956ee00acdaa98";
  const [inputCity , setInputCity] =useState ("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    if (!cityName) return null;


    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
     return("err", err);
      });
  };

  const handleChangeInput = (e)=>{
    setInputCity(e.target.value)

  }

  const handleSearch =()=>{
    getWetherDetails( inputCity)
  }

  useEffect(() => {
    getWetherDetails("Delhi");
  }, []);

  return (
    <div className="col=md-12">
      <div className="whetherBg">
        <h1 className="text-center"> Weatherapp </h1>
        <div className="d-grid col-4 mt-4 gap-3">
          <input type="text" className="form-control" placeholder="Enter city name" value={inputCity} onChange={handleChangeInput}  />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            {" "}
            search
          </button>
        </div>
      </div>

      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded wetherResultbox">
          <img className="icon" src="./image/weatherzone.jpg" alt="" />
          <h5 className="whethercity">{data?.name}</h5>
          <h6 className="weatherTemp">
            {" "}
            {(data?.main?.temp - 273.15).toFixed(2)}°C
          </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
