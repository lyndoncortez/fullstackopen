import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <>
      <button onClick={handleClick}>{text}</button>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const points = new Array(anecdotes.length).fill(0);
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(points);

  const Header = ({text}) => <><h1>{text}</h1></>

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const highestVotesIndex = votes.indexOf(Math.max(...votes));

  const generateAnecdote = () => {
    let newSelected;

    do {
      newSelected = getRandomNumber(0, anecdotes.length - 1);
    } while (newSelected == selected)

    setSelected(newSelected);
  }

  const addVote = () => {
    setVotes((prevVotes) => {
      prevVotes[selected] += 1;
      return [...prevVotes];
    })
  }

  const Anecdotes = ({anecdotes, votes}) => {
    return (
      <>
        {anecdotes}
        <br />
        <p>has {votes} votes</p>
      </>
    )
  }

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdotes anecdotes={anecdotes[selected]} votes={votes[selected]}/>
      <Button handleClick={generateAnecdote} text="next anecdote"/>
      <Button handleClick={addVote} text="vote"/>
      <br />
      <Header text="Anecdote with most votes" />
      <Anecdotes anecdotes={anecdotes[highestVotesIndex]} votes={votes[highestVotesIndex]}/>
    </div>
  )
}

export default App