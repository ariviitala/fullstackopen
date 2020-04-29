import React, { useState, useEffect } from 'react'
import personService from './services/persons'

const ShowPeople = (props) => {
    return (
        <div>
            {props.persons.map(p => <Person key={p.name} person={p} deleteHandler={props.deleteHandler}/>)}
        </div> 
    )
} 

const Person = ({person, deleteHandler}) => {

    const submitHandler = (event) => {
        event.preventDefault()
        deleteHandler(person.name)
    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                {person.name} {person.number} <button type="submit">Delete</button>
            </form>
        </div>
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
        personService.getAll()
        .then(people => {
            setPersons(people)
        })
    }

    useEffect(hook, [])

    const addPerson = (event) => {
        event.preventDefault()

        const alreadyExists = persons.filter(p => p.name === newName).length > 0
        let replace = false

        if (alreadyExists) {
            replace = window.confirm(`${newName} is already added to phonebook. Replace old number with a new one?`)
        } 
        
        if (replace) {
            const person = persons.find(p => p.name === newName)
            const newPerson = {...person, number: newNumber}
            console.log(person)
            personService.update(person.id, newPerson)
            .then(response => {
                setPersons(persons.map(p => p.id !== person.id ? p : response))
            })
            console.log(persons)
            setNewName('')
            setNewNumber('')
        }

        if(!alreadyExists) {
            const newPerson = { name: newName, number: newNumber }
            setPersons(persons.concat(newPerson))
            personService.create(newPerson)
            setNewName('')
            setNewNumber('')
        }


    }

    const deletePerson = (name) => {
        const result = window.confirm(`Delete ${name}?`)
        if (result) {
            const person = persons.filter(p => p.name === name)[0]
            console.log(person)
            personService.remove(person.id)
            setPersons(persons.filter(p => p.name !== name))
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

    console.log(persons)
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
            <ShowPeople persons={personsToShow} deleteHandler={deletePerson}/>
        </div>
    )

}

export default App