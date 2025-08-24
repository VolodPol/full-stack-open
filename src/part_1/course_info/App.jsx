
const Header = ( { course } ) => {
    return (
        <h1>{course}</h1>
    );
}

const Part = ( { name, numberOfExercises } ) => {
    return (
        <p>
            {name} {numberOfExercises}
        </p>
    );
}

const Content = (props) => {
    return (
        <div>
            {
                props.parts.map(
                    (part, index) => <Part key={index} name={part.name} numberOfExercises={part.exercises}/>
                )
            }
        </div>
    );
}

const Total = ( { list } ) => {
    let totalCount = list.reduce((sum, current) => sum + current, 0);
    return (
        <p>Number of exercises {totalCount}</p>
    );
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10
    }
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7
    }
    const part3 = {
        name: 'State of a component',
        exercises: 14
    }

    return (
        <div>
            <Header course={ course }/>
            <Content parts={[part1, part2, part3]} />
            <Total list={ [part1.exercises, part2.exercises, part3.exercises] }/>
        </div>
    )
}

export default App