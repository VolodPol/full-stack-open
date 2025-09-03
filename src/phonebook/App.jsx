import { useState } from 'react'

const App = () => {
    const [id, setId] = useState(1);
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567', id: id }
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchQuery, setSearchQuery] = useState('');


    const updateNewName = (event) => {
        setNewName(event.target.value);
    }

    const updateNewNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const updateQuery = (event) => {
        setSearchQuery(event.target.value);
    }

    const submitPerson = (event) => {
        event.preventDefault();
        function refresh() {//why const behaves in a weird way?
            setNewName('');
            setNewNumber('');
        }

        if (persons.find(p => p.name === newName)) {
            alert(`${newName} is already added to phonebook`);
            refresh();
            return;
        }

        let newId = id + 1;
        setId(newId);
        let person = { name: newName, number: newNumber, id: newId };
        setPersons(persons.concat(person));
        refresh();
    }

    function filteredPersons() {
        return persons.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with <input value={searchQuery} onChange={updateQuery}/>
            </div>
            <h2>Add a new</h2>
            <form onSubmit={submitPerson}>
                <div>
                    name: <input value={newName} onChange={updateNewName} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={updateNewNumber}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {
                filteredPersons().map(p =>
                    <p key={p.id}>{p.name} {p.number}</p>
                )
            }
        </div>
    )
}

export default App