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

    const resetNotification = () => {
        setTimeout(
            () => setNotification(null),
            3000
        );
    };

    const fetchPersons = () =>
        personService.getAll()
            .then(data => {
                setPersons(data);
            });

    useEffect(() => fetchPersons(), []);

    const updateNewName = (event) => {
        setNewName(event.target.value);
    }

    const updateNewNumber = (event) => {
        setNewNumber(event.target.value);
    }

    const updateQuery = (event) => {
        setSearchQuery(event.target.value);
    }

    const notifySuccess = ( isExisting, name ) => {
        const newNotification = {
            message: isExisting ? `Updated ${name}` : `Added ${name}`,
            isSuccess: true
        };
        setNotification(newNotification)
        resetNotification();
    }

    const notifyMissing = ( name ) => {
        const newNotification = {
            message: `Information of ${name} has already been removed from server`,
            isSuccess: false
        };
        setNotification(newNotification);
        resetNotification();
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
                    notifySuccess(true, updated.name);
                }).catch(error => {
                    if (error.response.status === 404) {
                        notifyMissing(newName);
                        fetchPersons();
                    }
                });
            }
            refresh();
            return;
        }

        let person = { name: newName, number: newNumber };
        personService.createPerson(person)
            .then(newPerson => {
                setPersons(persons.concat(newPerson));
                notifySuccess(false, newName);
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
            <Notification notification={notification}/>
            <SearchBar value={searchQuery} onChange={updateQuery}/>
            <h2>Add a new</h2>

            <PersonForm newName={newName} newNumber={newNumber} onNameChange={updateNewName} onNumberChange={updateNewNumber} onSubmit={submitPerson}/>

            <h2>Numbers</h2>
            <People persons={filteredPersons()} deletePerson={deletePerson}/>
        </div>
    )
}

export default App