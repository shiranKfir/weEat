import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import styles from './Search.scss'

class Search extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        return (
            <FormGroup className="restaurant-search" bsSize="large">
                <FormControl type="text" placeholder="Find a restaurant" />
            </FormGroup>
        );
    }
}

export default Search;