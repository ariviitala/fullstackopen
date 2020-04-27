import React from 'react'

const Header = (props) => {
    return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
    )
  
  }

const Part = (props) => {
    return (
      <div><p>{props.part.name} {props.part.exercises}</p></div>
    )
  
  }
  
  const Content = (props) => {
    const parts = props.course.parts
    
    return (
      <div>
        parts.map(part => <div><Part part={part}/></div>)
      </div>
    )
  
  }
  
  const Total = (props) => {
    const parts = props.course.parts
    return (
      <div>
        Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </div>
    )
  }

  const Course = (props) => {


    return (
      <div>
        <Header course={props.course} />
        <Content course={props.course} />
        <Total course={props.course} />
      </div>
    )

  }

  export default Course