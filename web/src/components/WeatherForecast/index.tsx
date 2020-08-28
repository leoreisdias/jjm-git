import React, { useEffect, useState } from 'react';

import weatherApi from '../../services/weatherApi';
import './styles.css';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { GiWaterDrop } from 'react-icons/gi';
import { FiWind } from 'react-icons/fi';

interface WeatherProps {
    cid: string;
    city_name: string;
    condition_code: string;
    condition_slug: string;
    currently: string,
    date: string,
    humidity: number;
    img_id: string;
    sunrise: string;
    sunset: string;
    time: string;
    wind_speedy: string;
    city: string;
    description: string,
    forecast: [any]
    temp: number
}

function WeatherForecast() {
    const [weather, setWeather] = useState<WeatherProps>();

    async function getWeather() {
        const response = await weatherApi.get(`weather?format=json-cors&key=${process.env.FORECAST_KEY}&woeid=457649`)
        setWeather(response.data.results)
    }

    useEffect(() => {
        getWeather();
    }, [])

    return (
        <fieldset className="weatherFieldset">
            <legend>Previsão do Tempo</legend>
            <div className="today">
                <div className="cityname">
                    <strong>{weather?.city_name}</strong>
                    <p>
                        <FaArrowUp size={18} color="green" /> {weather?.forecast[0].max}º
                        <br />
                        <FaArrowDown size={18} color="red" /> {weather?.forecast[0].min}º
                    </p>
                </div>

                <div className="infoDay">
                    <div className="subInfo">
                        <p lang="pt-br">
                            <strong>{weather?.forecast[0].weekday}</strong>
                            <br />
                            {weather?.date}
                        </p>
                        <span><FiWind />: {weather?.wind_speedy}</span>
                        <span><GiWaterDrop />: {weather?.humidity}</span>
                    </div>

                    <div className="iconWeather">
                        <img src={`https://assets.hgbrasil.com/weather/images/${weather?.img_id}.png`} alt="Weather Icon" />
                        <strong>{weather?.description}</strong>
                    </div>

                    <div className="temp">
                        <strong>{weather?.temp}º</strong>
                    </div>

                </div>

            </div>

            <div className="nextDays">
                {weather?.forecast.map((weather, index) => {
                    return index !== 0 && index !== 9 ? (
                        <div key={index} className="eachDay">
                            <strong lang="pt-br">
                                {weather.weekday}
                                <br />
                                {weather.date}
                            </strong>
                            <br />
                            <p>
                                <span>
                                    <p className="max">
                                        <span><FaArrowUp size={15} color="green" />{weather.max}º</span>
                                        <FaArrowDown size={15} color="red" />{weather.min}º
                                    </p>
                                </span>
                                <strong>{weather.description}</strong>
                            </p>
                        </div>
                    ) : ''


                })}



            </div>
        </fieldset>
    )
}

export default WeatherForecast;