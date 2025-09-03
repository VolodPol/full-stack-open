import {Person} from "./Person.jsx";

const People = ( {persons} ) => {
    return (
        <>
            {
                persons.map(p =>
                    <Person key={p.id} person={p}/>
                )
            }
        </>
    );
}

export default People;