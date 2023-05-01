import { useState, useEffect } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import FilterSearch from "./FilterSearch";
import Student from "./Student";

const Classroom = () => {

    // students is the students that we currently want to display to the user
    const [students, setStud] = useState([]);

    // all students is the whole list of students that we get from the API
    const [allStudents, setAllStudents] = useState([]);

    // filterName is the text the user has entered in the "Name" field
    const [filterName, setFilterName] = useState("");

    // filterMajor is the text the user has entered in the "Name" field
    const [filterMajor, setFilterMajor] = useState("");

    // filterInterest is the text the user has entered in the "Name" field
    const [filterInterest, setFilterInterest] = useState("");


    // when the page loads, get the students from the API
    useEffect(() => {
        loadStudents();
    }, [])
    // run this when the page loads because contains no dependenccies


    useEffect(() => {
        let filteredStudents = allStudents;

        // now we have the updated filter information
        // we will use this updated filter information to filter the allStudents state and 
        // set that as the current students
        // allStudents is something we only change when we run the fetch request
        const nameFilter = filterName.trim();
        const majorFilter = filterMajor.trim();
        const interestFilter = filterInterest.trim();
        if (nameFilter) {
            filteredStudents = filteredStudents.filter(stud => {
                const firstName = stud.name.first.toLowerCase();
                const lastName = stud.name.last.toLowerCase();
    
                // get the students' full name
                const fullName = firstName + " " + lastName;
                const lowerCaseName = nameFilter.toLowerCase();
    
                // check whether the students' full name contains the string we entered with a case-insensitive search
                return fullName.includes(lowerCaseName);
        });
        }
        if (majorFilter) {
            // if the major filter is not empty, filter by major
            filteredStudents = filteredStudents.filter(stud => stud.major.toLowerCase().includes(majorFilter.toLowerCase()));
    
            // highlight the part of the major that we matched
        }
        if (interestFilter) {
            // if the interest filter is not empty, filter by interest
            filteredStudents = filteredStudents.filter(stud => 
                stud.interests.some(interest => interest.toLowerCase().includes(interestFilter.toLowerCase()))
            )
        }
        setStud(filteredStudents);
    }, [filterName, filterMajor, filterInterest, allStudents])

    function loadStudents() {
            fetch("https://cs571.org/s23/hw4/api/students", {method: "GET", headers: {"X-CS571-ID": "bid_4c2e0a660c7168a42f85"}})
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setStud(data);
                setAllStudents(data);
            });
}

    function resetSearch() {
        setFilterInterest("");
        setFilterMajor("");
        setFilterName("");
    }

    return <div>
        <Form>
            <FilterSearch id="searchName" name="Name" value={filterName} setValue={setFilterName}/>
            <FilterSearch id="searchMajor" name="Major" value={filterMajor} setValue={setFilterMajor}/>
            <FilterSearch id="searchInterest" name="Interest" value={filterInterest} setValue={setFilterInterest}/>
            <br />
            <Button variant="outline-primary" onClick={resetSearch}>Reset Search</Button>
        </Form>
        <Container fluid>
            <Row>
                {students.map((indivStudent) => 
                <Col xs={12} sm={6} md={4} lg={3} xl={2} key={indivStudent.id}>
                    <Student 
                    name={indivStudent.name} 
                    major={indivStudent.major}
                    numCredits={indivStudent.numCredits}
                    fromWisconsin={indivStudent.fromWisconsin}
                    interests={indivStudent.interests}
                    />
                </Col>
                )}
            </Row>
        </Container>
    </div>

}

export default Classroom;