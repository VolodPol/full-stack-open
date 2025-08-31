import {useState} from 'react'

const Button = ({text, command}) => <button onClick={command}>{text}</button>;

const CurrentAnecdote = ({anecdote, vote}) => {
    return (
        <>
            <div>{anecdote}</div>
            <div>has {vote} {vote === 1 ? 'vote' : 'votes'}</div>
        </>
    );
}

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(Array.from({ length: anecdotes.length }, () => 0))

    const randomAnecdote = () => {
        return Math.floor(Math.random() * anecdotes.length);
    }

    const upVote = () => {
        const updated = [...votes];
        updated[selected]++;
        setVotes(updated);
    }

    return (
        <div>
            <CurrentAnecdote anecdote={anecdotes[selected]} vote={votes[selected]}/>
            <Button text={'vote'} command={() => upVote()}/>
            <Button text={'next anecdote'} command={() => setSelected(randomAnecdote())}/>
        </div>
    )
}

export default App