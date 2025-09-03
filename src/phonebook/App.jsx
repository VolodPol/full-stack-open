import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ]);
    const [newName, setNewName] = useState('');


    const updateNewName = (event) => {
        setNewName(event.target.value);
    }

    const submitPerson = (event) => {
        event.preventDefault();
        let person = { name: newName };
        if (persons.find(p => p.name === person.name)) {
            alert(`${person.name} is already added to phonebook`);
            setNewName('');
            return;
        }
        setPersons(persons.concat(person));
        setNewName('');
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={submitPerson}>
                <div>
                    name: <input value={newName} onChange={updateNewName} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                persons.map(p =>
                    <p key={p.name}>{p.name}</p>
                )
            }
        </div>
    )
}

export default App