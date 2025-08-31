
const Header = ( { course } ) => {
    return (
        <h1>{course.name}</h1>
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
                props.course.parts.map(
                    (part, index) => <Part key={index} name={part.name} numberOfExercises={part.exercises}/>
                )
            }
        </div>
    );
}

const Total = ( { course } ) => {
    let totalCount = course.parts.map(p => p.exercises).reduce((sum, current) => sum + current, 0);
    return (
        <p>Number of exercises {totalCount}</p>
    );
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
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
        ]
    };

    return (
        <div>
            <Header course={ course }/>
            <Content course={ course } />
            <Total course={ course }/>
        </div>
    )
}

export default App