import React from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import styles from './Review.scss';

const iconButtonElement = (
    <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
    >
        <MoreVertIcon color="grey" />
    </IconButton>
);

const rightIconMenu = (
    <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Edit</MenuItem>
        <MenuItem>Delete</MenuItem>
    </IconMenu>
);

const iconStyles = {
    marginRight: 5,
    position: "relative",
    top: 8
};

class Review extends React.Component {

    render(){
        const {review} = this.props;
        const stars = Array.from([...Array(review.rating)], (val, key) =>
            <ActionGrade key={key} style={iconStyles} color='#607D8B'/>);
        return (
            <ListItem className='review-item'
                      rightIconButton={rightIconMenu}
                      primaryText={
                          <span>
                              <span className='reviewer-name'>{review.reviewer_name}</span>
                              <span className='stars'>{stars}</span>
                          </span>}
                      secondaryText={
                          <p>
                              {review.comment}
                          </p>
                      }
                      secondaryTextLines={2}
            />
        );
    }
}

export default Review;


