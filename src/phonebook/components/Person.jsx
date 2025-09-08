export const Person = ( {person, onClick} ) => {
    return <div>
        {person.name} {person.number} <button onClick={() => onClick(person.id)} type="submit">delete</button>
    </div>;
}