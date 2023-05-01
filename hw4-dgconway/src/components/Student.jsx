import Interest from "./Interest";

const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        <p>Major: {props.major}</p>
        <p>Number of Credits: {props.numCredits}</p>
        <p>From Wisconsin? {props.fromWisconsin ? "Yes" : "No"}</p>
        <div>Interests:</div>
        <ul>
        {props.interests.map((interest) => {
            return (
                <Interest key={interest} interestName={interest} />
            )
        })}
        </ul>
    </div>
}

export default Student;