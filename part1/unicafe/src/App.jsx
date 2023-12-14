import { useState } from 'react'

const Header = ({headerText}) => <h1>{headerText}</h1>

const Button = ({text, handleClick}) => <button onClick={handleClick}>{text}</button>

const Buttons = ({handleGood, handleNeutral, handleBad}) => {
  return (
    <>
      <Button text="good" handleClick={handleGood}/>
      <Button text="neutral" handleClick={handleNeutral}/>
      <Button text="bad" handleClick={handleBad}/>
    </>
  )
}

const StatisticLine = ({text, result}) => {
  return (
    <>
      <td>{text}</td>
      <td>{text == 'positive' ? result+'%'  : result}</td>
    </>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive, feedback}) => {
  if(feedback) {
    return(
      <>
        <table>
          <tbody>
            <tr><StatisticLine text="good" result={good}/></tr>
            <tr><StatisticLine text="neutral" result={neutral}/></tr>
            <tr><StatisticLine text="bad" result={bad}/></tr>
            <tr><StatisticLine text="all" result={all}/></tr>
            <tr><StatisticLine text="average" result={average}/></tr>
            <tr><StatisticLine text="positive" result={positive}/></tr>
          </tbody>
        </table>
      </>
    )
  } else {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);
  const [feedback, setFeedback] = useState(false);

  const addGood = () => {
    setGood(good + 1);
    updateStatistics();
  }
  const addNeutral = () => {
    setNeutral(neutral + 1);
    updateStatistics();
  }
  const addBad = () => {
    setBad(bad + 1);
    updateStatistics();
  }
  const updateStatistics = () => {
    setAll(good + neutral + bad);
    setAverage(() => ((good - bad) / all )|| 0);
    setPositive(() => ((good / all) * 100) || 0);
    setFeedback((prevFeedback) => prevFeedback = true);
  }

  return (
    <div>
      <Header headerText="give feedback"/>
      <Buttons 
        handleGood={addGood} 
        handleBad={addBad} 
        handleNeutral={addNeutral} 
        />
      <Header headerText="statistics"/>
      <Statistics 
          good={good} 
          neutral={neutral} 
          bad={bad} 
          all={all} 
          average={average} 
          positive={positive}
          feedback={feedback}
        />
      
    </div>
  )
}

export default App