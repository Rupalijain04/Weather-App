/* https://api.openweathermap.org/data/2.5/weather?q=aurangabad&appid=3b431f04cf94dce760aeff1962e97d79 */

import React, { useEffect, useState } from 'react';
import WeatherCard from './weatherCard';
import "./temp.css";


const Temp = () => {
  const [searchValue, setSearchValue] = useState("aurangabad");
  const [tempInfo, setTempInfo] = useState({});

  const getWeatherInfo = async() => {
    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=3b431f04cf94dce760aeff1962e97d79`;

      let res = await fetch(url);
      let data = await res.json();
        
      const { temp, humidity, pressure } = data.main;
      const { main:weathermood } = data.weather[0];
      const { name } = data;  
      const { speed } = data.wind;
      const { country, sunset } = data.sys;

      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,
        speed,
        country, 
        sunset,
      };
        
      setTempInfo(myNewWeatherInfo);

    } catch (error) {
      console.log(error);
    }
  };

    useEffect(() => {
      getWeatherInfo();
    }, []);

  return (
    <>
      <div className='wrap'>
        <div className='search'>
          <input type="search" placeholder="Search..." autofocus id="search" className="searchTerm" value={searchValue} onChange={(e) => setSearchValue(e.target.value)}/>

          <button className='searchButton' type='button' onClick={getWeatherInfo}>Search</button>
        </div>
      </div>
      <WeatherCard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
