import Country from "./Country.jsx";

const Countries = ({ countries }) => {
    if (!countries)
        return null;

    if (countries.length > 10)
        return <div>Too many matches, specify another filter</div>;
    else if (countries.length === 1)
        return <Country name={countries[0]}/>;


    return (
        <>
            {
                countries.map(c =>
                    <div key={c}>{c}</div>
                )
            }
        </>
    );
};

export default Countries;

