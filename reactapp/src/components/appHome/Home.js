import {Container, Row, Col} from "reactstrap";
import ListStudents from "../appListStudents/ListStudents";
import ModalStudent from "../appModalStudent/ModalStudent";

const Home = (props) => {
    let students = props.students;
    let resetState = props.resetState;

    return (
        <Container style={{marginTop: "20px"}}>
            <Row>
                <Col>
                    <ListStudents students={students} resetState={resetState} newStudent={false}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ModalStudent
                    create={true}
                    resetState={resetState}
                    newStudent={true}/>
                </Col>
            </Row>
        </Container>
    )
}

export default Home;
