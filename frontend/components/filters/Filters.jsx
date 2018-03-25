import React from 'react';
import {Row, Col} from "react-bootstrap";
import styles from './Filters.scss'

class Filters extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        return (
            <Row className="filters">
            </Row>
        );
    }
}

export default Filters;

