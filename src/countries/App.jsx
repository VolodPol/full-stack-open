import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from "./components/Countries.jsx";


const App = () => {
    const [input, setInput] = useState('');
    const [country, setCountry] = useState(null);
    const [countries, setCountries] = useState([]);

    const updateInput = (event) => {
        const value = event.target.value;
        setInput(value);
        setCountry(value);
    };

    const filterCountries = () => {
        return countries.filter(c => c.toLowerCase().includes(input.toLowerCase()));
    };

    useEffect(() => {
        if (country) {
            axios.get(
                `https://studies.cs.helsinki.fi/restcountries/api/all`,
                {
                    transformResponse: [data =>
                        JSON.parse(data).map( i => i.name['official'] )
                    ]
                })
                .then(response => setCountries(response.data));
        }


    }, [country]);


    return (
        <div>
            <div>find countries <input value={input} onChange={updateInput}/></div>
            <Countries countries={filterCountries()}/>
        </div>
    );

};

export default App;