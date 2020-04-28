import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css';

const Weather = ({weather, capital}) => {
  
  if (weather.current){
    return (
      <div>
        <h2>Weather in {capital}</h2>
        Temperature: {weather.current.temperature} Celsius
        <br></br>
        <img src={weather.current.weather_icons[0]} alt={weather.current.weather_description}/>
        <br></br>
        Wind: {weather.current.wind_speed} mph, direction {weather.current.wind_dir}
      </div>
      )
  } else {
    return (<div>Loading weather</div>)
  }
  
}

const ShowCountry = ({ country }) => {
  const [weather, setWeather] = useState({})

  const weatherHook = () => {
    console.log(`http://api.weatherstack.com/current?access_key=${process.env.weather_api_key}&query=${country.capital}`)
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }

  useEffect(weatherHook, [])

  console.log(weather)
  //console.log(country)
  return (
    <div>
      <h1>{country.name}</h1>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(l => <li key={l.name}>{l.name}</li>)}
      </ul>
      <img src={country.flag} alt="Flag of Switzerland" height="100"/>
      <Weather weather={weather} capital={country.capital}/>
    </div>)
}

const ListCountry = (props) => {

  const submitHandler = (event) => {
    event.preventDefault()
    props.setCountry(props.country.name)
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
      {props.country.name}
      <button type="submit">Show</button>
      </form>
      
    </div>
  )
}

const ShowCountries = (props) => {
  //console.log(props)

  if (props.countries.length > 10) {

    return (<div>Too many countries</div>)

  } else if (props.countries.length > 1) {

    return (
      <div>
        {props.countries.map(c => <div key={c.name}><ListCountry country={c} setCountry={props.buttonHandler}/></div>)}
      </div>
    )

  } else if (props.countries.length === 1) {
    return (
      <div>
        <ShowCountry country={props.countries[0]} />
      </div>
    )
  } else {
    return (<div>No countries matching search term</div>)
  }

}

function App() {

  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }

  useEffect(hook, [])
  //console.log(countries)

  const filterCountries = (event) => {
    setCountry(event.target.value)
  }

  const countryList = countries.filter(c => c.name.toLowerCase().search(country.toLowerCase()) !== -1)

  return (
    <div>
      <form onSubmit={(event) => event.preventDefault()}>
        Find countries: <input value={country} onChange={filterCountries} />
      </form>
      <ShowCountries countries={countryList} buttonHandler={setCountry}/>
    </div>
  );
}

export default App;
