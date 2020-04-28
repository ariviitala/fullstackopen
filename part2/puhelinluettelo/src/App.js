import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Person = (props) => {
    return (
        <div>{props.name} {props.number}</div>
    )
}

const Filter = (props) => {

    return (
        <div>
            <form onSubmit={(event) => event.preventDefault()}>
                Filter shown with: <input value={props.value} onChange={props.changeHandler} />
            </form>
        </div>
    )
}

const AddContact = (props) => {

    return (
        <form onSubmit={props.submitHandler}>
            <div>
                name: <input value={props.nameValue} onChange={props.nameHandler} />
            </div>
            number: <input value={props.numberValue} onChange={props.numberHandler} />
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterString, setFilterString] = useState('')

    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }

    useEffect(hook, [])

    const addPerson = (event) => {
        event.preventDefault()
        if (persons.filter(p => p.name === newName).length > 0) {
            alert(`${newName} is already added to phonebook.`)
        } else {
            const newPerson = { name: newName, number: newNumber }
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    const handlePersonChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const filterPersons = (event) => {
        event.preventDefault()
        setFilterString(event.target.value)
    }

    const personsToShow = persons.filter(p => p.name.toLowerCase().search(filterString.toLowerCase()) !== -1)

    return (
        <div>
            <h1>Phonebook</h1>
            <h2>Find</h2>
            <Filter value={filterString} changeHandler={filterPersons} />
            <h2>Add New</h2>
            <AddContact nameValue={newName} numberValue={newNumber} nameHandler={handlePersonChange}
                numberHandler={handleNumberChange} submitHandler={addPerson} />
            <h2>Numbers</h2>
            {personsToShow.map(p => <Person key={p.name} name={p.name} number={p.number} />)}
        </div>
    )

}

export default App