import { useState } from 'react'

const Header = () => <h1>give feedback</h1>;

const Button = ({text, command}) => <button onClick={command}>{text}</button>;

const Statistics = ({goodCount, neutralCount, badCount}) => {
    function total() {
        return goodCount + neutralCount + badCount;
    }
    const average = () => (goodCount - badCount) / total();
    const positive = () => goodCount / total();

    return (
        <>
            <h1>statistics</h1>
            <div>good {goodCount}</div>
            <div>neutral {neutralCount}</div>
            <div>bad {badCount}</div>

            <div>all {total()}</div>
            <div>average {average()}</div>
            <div>positive {positive()} %</div>
        </>
    );
}

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <Header/>

            <Button text={'good'} command={() => setGood(good + 1)}/>
            <Button text={'neutral'} command={() => setNeutral(neutral + 1)}/>
            <Button text={'bad'} command={() => setBad(bad + 1)}/>

            <Statistics goodCount={good} neutralCount={neutral} badCount={bad}/>
        </div>
    )
}

export default App