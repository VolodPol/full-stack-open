import { useState } from 'react'
import {SearchBar} from "./components/SearchBar.jsx";
import PersonForm from "./components/PersonForm.jsx";
import People from "./components/People.jsx";

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
            <SearchBar value={searchQuery} onChange={updateQuery}/>
            <h2>Add a new</h2>

            <PersonForm newName={newName} newNumber={newNumber} onNameChange={updateNewName} onNumberChange={updateNewNumber} onSubmit={submitPerson}/>

            <h2>Numbers</h2>
            <People persons={filteredPersons()}/>
        </div>
    )
}

export default App