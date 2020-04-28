import React from 'react'

const Header = (props) => {
    return (
    <div>
      <h2>{props.course.name}</h2>
    </div>
    )
  
  }

const Part = (props) => {
    return (
      <div>
        <p>{props.part.name} {props.part.exercises}</p>
      </div>
    )
  
  }
  
const Content = (props) => {
  
  return (
    <div>
      {props.parts.map(part => <Part key={part.name} part={part}/>)}
    </div>
  )

}



const Total = (props) => {
  
  const sum = props.course.parts.reduce((a, b) => a + b.exercises, 0)
  
  return (
    <div>
      <b>total of exercises {sum}</b>
    </div>
  )
}

const Course = (props) => {


  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total course={props.course} />
    </div>
  )

}

export default Course