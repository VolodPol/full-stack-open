import axios from 'axios'
import { useEffect, useState} from "react";

const API_KEY = import.meta.env.VITE_OPEN_WTHR_KEY;


const Country = ( { name } ) => {
    const [country, setCountry] = useState(null);
    const [weather, setWeather] = useState(null);
    const [units, setUnits] = useState('metric');

    function formURI(data) {
        const code = data.current['weather'][0]['icon'];
        return `https://openweathermap.org/img/wn/${code}@2x.png`;
    }

    useEffect(() => {
        let newCountry;
        let newUnits = units;

        axios.get(`https://sudies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                const data = response.data;
                newCountry = {
                    area: data.area,
                    languages: Object.values(data.languages),
                    flag: data.flags['png'],
                    region: data.region,

                    capital: {
                        name: data.capital[0],
                        lat: data['capitalInfo']['latlng'][0],
                        lng: data['capitalInfo']['latlng'][1]
                    },
                };
                setCountry(newCountry);
                if (newCountry.region === 'Americas')
                    newUnits = 'imperial';
                setUnits(newUnits);

                axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${newCountry.capital.lat}&lon=${newCountry.capital.lng}&units=${newUnits}&appid=${API_KEY}`)
                    .then(response => {
                        const data = response.data;
                        setWeather({
                            temperature: data.current['temp'],
                            icon: formURI(data),
                            wind: data.current['wind_speed']
                        });
                    });
            });
    }, [name]);

    if (country && weather) {
        return (
            <div>
                <h1>{name}</h1>
                <div>Capital {country.capital.name}</div>
                <div>Area {country.area}</div>

                <h2>Languages</h2>
                <ul>
                    {
                        country.languages.map(l => <li key={l.toString()}>{l}</li>)
                    }
                </ul>
                <div>
                    <img src={country.flag} alt={'National Flag'}/>
                </div>

                <h2>Weather in {country.capital.name}</h2>
                <p>Temperature {weather.temperature} {units === 'imperial' ? 'Fahrenheit' : 'Celsius'}</p>
                <div>
                    <img src={weather.icon} alt='Weather icon'/>
                </div>
                <p>Wind {weather.wind} {units === 'imperial' ? 'miles/hour' : 'meter/sec'}</p>
            </div>

        );
    }
    return null;
};

export default Country;