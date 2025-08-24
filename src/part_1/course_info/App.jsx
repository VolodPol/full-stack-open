
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

const Total = ( { parts } ) => {
    let totalCount = parts.map(p => p.exercises).reduce((sum, current) => sum + current, 0);
    return (
        <p>Number of exercises {totalCount}</p>
    );
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ];

    return (
        <div>
            <Header course={ course }/>
            <Content parts={ parts } />
            <Total parts={ parts }/>
        </div>
    )
}

export default App