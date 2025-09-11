import Country from "./Country.jsx";
import {useState} from "react";


const Toggleable = ( { countryName } ) => {
    const [isToggled, setIsToggled] = useState(false);

    return (
        <>
            <div key={countryName}>{countryName} <button
                key={countryName}
                onClick={() => setIsToggled(!isToggled)}>{isToggled ? 'Hide' : 'Show'}</button></div>
            {
                isToggled &&
                <>
                    <hr/>
                    <Country name={countryName}/>
                    <hr/>
                </>
            }
        </>
    );
};


const Countries = ({ countries }) => {
    if (!countries)
        return null;

    if (countries.length === 1)
        return <Country name={countries[0]}/>;

    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>;

    return (
        <>
            {
                countries.map(c =>
                    <Toggleable key={c} countryName={c}/>
                )
            }
        </>
    );
};

export default Countries;

