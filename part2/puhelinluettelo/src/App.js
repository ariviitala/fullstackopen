import React, { useState } from 'react'

const Person = (props) => {
    return (
        <div>{props.name} {props.number}</div>
    )
}

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
      ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filterString, setFilterString] = useState('')
  

  const addPerson = (event) => {
      event.preventDefault()
      if (persons.filter(p => p.name === newName).length > 0){
        alert(`${newName} is already added to phonebook.`)
      } else {
        const newPerson = {name: newName, number: newNumber}
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
      <form>
          Filter shown with: <input value={filterString} onChange={filterPersons}/>
      </form>
      <h2>Add New</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange}/>
        </div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(p =><Person key={p.name} name={p.name} number={p.number}/>)}
    </div>
  )

}

export default App