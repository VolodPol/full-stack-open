import {Person} from "./Person.jsx";

const People = ( {persons, deletePerson} ) => {
    return (
        <>
            {
                persons.map(p =>
                    <Person key={p.name} person={p} onClick={deletePerson}/>
                )
            }
        </>
    );
}

export default People;