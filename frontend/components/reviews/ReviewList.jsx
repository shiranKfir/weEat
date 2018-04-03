import React from 'react';
import { List } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';

import Review from './Review';

class ReviewList extends React.Component {

    render(){
        this.reviews = this.props.reviews.map(val =>
            <Review key={val.id} review={val}/>
        );
        return (
            <div>
                <List>
                    <Subheader>Reviews</Subheader>
                    {this.reviews}
                </List>
            </div>
        );
    }
}

export default ReviewList;


