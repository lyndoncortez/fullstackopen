import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({name: '', number: ''})
  const [filterName, setFilterName] = useState('');
  const [notifMessage, setNotifMessage] = useState('');
  const [notifClass, setNotifClass] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleInputNameChange = (event) => {
    setNewPerson({...newPerson, name: event.target.value});
  }

  const handleInputNumberChange = (event) => {
    setNewPerson({...newPerson, number: event.target.value});
  }

  const addPerson = (event) => {
    event.preventDefault();

    const existingPerson = persons.find(person => person.name === newPerson.name && person.number !== newPerson.number);

    if(existingPerson) {
      const confirmUpdate = window.confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
      
      if(confirmUpdate) {
        const toUpdatePerson = persons.filter(person => person.name === newPerson.name)[0];

        personService
          .update(toUpdatePerson.id, newPerson)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
            setNotifMessage(`Updated ${updatedPerson.name}`)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons([...persons, createdPerson])
          setNotifMessage(`Added ${createdPerson.name}`)
        })
    }

    setNotifClass('success');

    setTimeout(() => {
      setNotifMessage(null);
      setNotifClass('');
    }, 4000)
    
    setNewPerson({name: '', number: ''});
  }

  const filterPhoneBook = (event) => {
    setFilterName(event.target.value)
  }

  const deletePerson = (toDeletePerson) => {
    if(window.confirm(`Delete ${toDeletePerson.name}?`)) {
      personService
      .deleteResource(toDeletePerson.id)
      .then(response => {
        setPersons(persons.filter(person => person.id !== toDeletePerson.id))
        setNotifMessage(`Deleted ${toDeletePerson.name}`)
        setNotifClass('success')
      })
      .catch(error => {
        setPersons(persons.filter(person => person.id !== toDeletePerson.id))
        setNotifMessage(`Information of ${toDeletePerson.name} has already been removed from server`)
        setNotifClass('error')
      })

      setTimeout(() => {
        setNotifMessage(null);
        setNotifClass('');
      }, 4000)
    }
  }

  const personToShow = filterName
    ? persons.filter(person => person.name.toLowerCase().includes(filterName.toLowerCase()))
    : persons

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notifMessage} className={notifClass}/>
      <Filter handleChange={filterPhoneBook} value={filterName} />
      <PersonForm handleName={handleInputNameChange} handleNumber={handleInputNumberChange} name={newPerson.name} number={newPerson.number} handleClick={addPerson} />
      <h2>Numbers</h2>
      <Persons persons={personToShow} handleDelete={deletePerson}/>
    </div>
  )
}

export default App