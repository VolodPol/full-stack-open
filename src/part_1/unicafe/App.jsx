import { useState } from 'react'


const Header = () => <h1>give feedback</h1>;


const Button = ({text, command}) => <button onClick={command}>{text}</button>;


const StatisticLine = ({text, value}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{value}</td>
        </tr>
    );
}

const Statistics = ({goodCount, neutralCount, badCount}) => {
    function total() {
        return goodCount + neutralCount + badCount;
    }
    const average = () => (goodCount - badCount) / total();
    const positive = () => goodCount / total() * 100;

    let data =
        <table>
            <tbody>
                <StatisticLine text='good' value={goodCount}/>
                <StatisticLine text='neutral' value={neutralCount}/>
                <StatisticLine text='bad' value={badCount}/>

                <StatisticLine text='all' value={total()}/>
                <StatisticLine text='average' value={average()}/>
                <StatisticLine text='positive' value={positive() + '%'}/>
            </tbody>
        </table>;
    return (
        <>
            <h1>statistics</h1>
            {total() ? data : <div>No feedback give</div>}
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

            <Button text='good' command={() => setGood(good + 1)}/>
            <Button text='neutral' command={() => setNeutral(neutral + 1)}/>
            <Button text='bad' command={() => setBad(bad + 1)}/>

            <Statistics goodCount={good} neutralCount={neutral} badCount={bad}/>
        </div>
    )
}


export default App