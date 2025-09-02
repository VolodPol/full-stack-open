
const Header = ( { name} ) => {
    return (
        <h2>{name}</h2>
    );
}

const Part = ( { name, numberOfExercises } ) => {
    return (
        <p>
            {name} {numberOfExercises}
        </p>
    );
}

const Content = ( { contents } ) => {
    let totalCount = contents.map(p => p.exercises).reduce((sum, current) => sum + current, 0);
    return (
        <>
            {
                contents.map(
                    (part) => <Part key={part.id} name={part.name} numberOfExercises={part.exercises}/>
                )
            }
            <p><b>total of {totalCount} exercises</b></p>
        </>
    );
}

const Course = ({ header, parts }) => {
    return (
        <div>
            <Header name={header}/>
            <Content contents={parts}/>
        </div>
    );
}

export default Course;