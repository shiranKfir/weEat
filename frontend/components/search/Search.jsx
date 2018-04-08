import React from 'react';
import {FormGroup, FormControl} from 'react-bootstrap';
import styles from './Search.scss'

class Search extends React.Component {
    constructor(props){
        super(props);
    }

    handleSearch = (e) => {
        this.props.filterRestaurants(e.target.value, 'title');
    };

    render(){
        return (
            <FormGroup className="restaurant-search" bsSize="large">
                <FormControl type="text"
                             onKeyUp={this.handleSearch}
                             placeholder="Find a restaurant" />
            </FormGroup>
        );
    }
}

export default Search;