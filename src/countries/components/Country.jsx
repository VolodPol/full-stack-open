import axios from 'axios'
import {useEffect, useState} from "react";


const Country = ( { name } ) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
            .then(response => {
                const data = response.data;

                setCountry({
                    capital: data.capital[0],
                    area: data.area,
                    languages: Object.values(data.languages),
                    flag: data.flags['png']
                });
            });
    }, [name]);

    if (country) {
        return (
            <div>
                <h1>{name}</h1>
                <div>Capital {country.capital}</div>
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
            </div>

        );
    }
    return null;
};

export default Country;