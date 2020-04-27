import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
  <button onClick={props.handleClick}>{props.text}</button>
  )
}

const StatisticLine = (props) => {
  return (<tr><td>{props.name}</td><td>{props.value}</td></tr>)
}

const Statistics = (props) => {
  const sum = props.good + props.neutral + props.bad
  
  if (sum === 0) {
    return (
      <div>No feedbacks given</div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine name="Good" value={props.good}/>
          <StatisticLine name="Neutral" value={props.neutral}/>
          <StatisticLine name="Bad" value={props.bad}/>
          <StatisticLine name="All" value={sum}/>
          <StatisticLine name="Average" value={(props.good - props.bad) / sum}/>
          <StatisticLine name="Positive" value={props.good / sum * 100 + "%"}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button text="Good" handleClick={() => setGood(good + 1)}/>
      <Button text="Neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="Bad" handleClick={() => setBad(bad + 1)}/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)