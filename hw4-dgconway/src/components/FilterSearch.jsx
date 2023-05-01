import { Fragment } from "react";
import { Form } from "react-bootstrap";

const FilterSearch = (props) => {
    return <Fragment>
        <Form.Label htmlFor={props.name}>{props.name}</Form.Label>
        <Form.Control
            id={props.name}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
        />
    </Fragment>
}

export default FilterSearch;