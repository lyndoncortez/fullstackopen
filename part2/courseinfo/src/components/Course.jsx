const Header = (props) => {
  return (
      <>
      <h1>{props.course}</h1>
      </>
  )
}

const Part = ({ name, exercises }) => {
  return (
      <>
          <p>
          {name} {exercises}
      </p>
      </>
  )
}

const Content = ({ parts }) => {
  return (
      <>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      </>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0);

  return (
      <>
      <p style={{fontWeight: 'bold'}}>Total of {total} exercises</p>
      </>
  )
}

const Course = ({ course }) => {
  return (
      <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </>
  )
}

export default Course

