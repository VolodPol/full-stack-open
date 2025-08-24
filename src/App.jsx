
const Header = ( {course} ) => {
    return (
        <h1>{course}</h1>
    );
}

const Part = ( {name, numberOfExercises} ) => {
    return (
        <p>
            {name} {numberOfExercises}
        </p>
    );
}

const Content = ( props ) => {
    const { part1, part2, part3 } = props
    const { exercises1, exercises2, exercises3 } = props

    return (
        <div>
            <Part name={part1} numberOfExercises={exercises1}/>
            <Part name={part2} numberOfExercises={exercises2}/>
            <Part name={part3} numberOfExercises={exercises3}/>
        </div>
    );
}

const Total = ( {list} ) => {
    let totalCount = list.reduce((sum, current) => sum + current, 0);
    return (
        <p>Number of exercises {totalCount}</p>
    );
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    return (
        <div>
            <Header course={course}/>
            <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
            <Total list={ [exercises1, exercises2, exercises3] }/>
        </div>
    )
}

export default App