import {useEffect, useState} from 'react'
import {SearchBar} from "./components/SearchBar.jsx";
import PersonForm from "./components/PersonForm.jsx";
import People from "./components/People.jsx";
import personService from "./services/persons.js";
import "./index.css";
import Notification from "./components/Notification.jsx";


const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        personService.getAll()
            .then(data => {
                setPersons(data);
            });
    }, []);

    const updateNewName = (event) => {
        setNewName(event.target.value);
    }

    const updateNewNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const updateQuery = (event) => {
        setSearchQuery(event.target.value);
    }

    const successNotification = ( isExisting, name ) => {
        isExisting ? setNotification(`Updated ${name}`) : setNotification(`Added ${name}`);
        setTimeout(
            () => setNotification(null),
            3000
        );
    }

    const submitPerson = (event) => {
        event.preventDefault();
        function refresh() {
            setNewName('');
            setNewNumber('');
        }

        const found = persons.findIndex(p => p.name === newName);
        if (found !== -1) {
            if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                personService.updatePerson(
                    {
                        name: newName,
                        number: newNumber,
                        id: persons[found].id
                    }
                ).then(updated => {
                    setPersons(persons.map(p => p.id === updated.id ? updated : p));
                    successNotification(true, updated.name);
                });
            }
            refresh();
            return;
        }

        let person = { name: newName, number: newNumber };
        personService.createPerson(person)
            .then(newPerson => {
                setPersons(persons.concat(newPerson));
                successNotification(false, newName);
                refresh();
            });
    }

    const deletePerson = (id) => {
        let toDelete = persons.findIndex(p => p.id === id);
        if (window.confirm(`Delete ${persons[toDelete].name}`)) {
            personService.removePerson(id);
            setPersons(persons.toSpliced(toDelete));
        }
    };

    function filteredPersons() {
        return persons.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification}/>
            <SearchBar value={searchQuery} onChange={updateQuery}/>
            <h2>Add a new</h2>

            <PersonForm newName={newName} newNumber={newNumber} onNameChange={updateNewName} onNumberChange={updateNewNumber} onSubmit={submitPerson}/>

            <h2>Numbers</h2>
            <People persons={filteredPersons()} deletePerson={deletePerson}/>
        </div>
    )
}

export default App