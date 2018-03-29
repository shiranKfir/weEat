import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import {Row, Col} from 'react-bootstrap';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {yellow500} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import Expand from 'material-ui/svg-icons/navigation/expand-more';
import Reduce from 'material-ui/svg-icons/navigation/expand-less';
import ReviewList from '../../reviews/ReviewList';
import AddReviewModal from '../../modals/review/AddReviewModal';
import styles from './RestaurantCard.scss'

class RestaurantsCard extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            expanded: false,
            rating: this.props.restaurant.rating
        };
    }

    handleExpand = () => {
        this.setState(oldState => {
            return {
                expanded: !oldState.expanded,
            };
        });
    };

    updateRestaurant = (restaurant) => {
        this.setState({rating: restaurant.rating});
    };

    render(){
        const iconStyles = {
            marginRight: 5,
            position: "relative",
            top: 8
        };

        const {restaurant} = this.props;
        const {expanded} = this.state;
        return (
            <MuiThemeProvider>
                <Card expanded={expanded}>
                    <CardText expandable={false}>
                        <Row>
                            <Col md={2}><div className="cuisine_font icon">{restaurant.cuisine.icon}</div></Col>
                            <Col md={8}>
                                <div className="restaurant-details">
                                    <div className="title">{restaurant.title}</div>
                                    <div>{restaurant.address}</div>
                                    <div className="other">
                                    <span>
                                        {`~ ${restaurant.max_delivery_time} Minutes`}
                                    </span>
                                        { restaurant.has_10bis &&
                                        <span className="tenBis">
                                            <img src="/images/10bis.png" />
                                        </span> }
                                        <span className="rating">
                                        {[...Array(this.state.rating)].map((val, key) =>
                                            <ActionGrade key={key} style={iconStyles} color={yellow500}/>
                                        )}
                                    </span>
                                    </div>
                                </div>
                            </Col>
                            <Col md={2}>
                                <FlatButton
                                    label=""
                                    icon={expanded ? <Expand /> : <Reduce/>}
                                    onClick={this.handleExpand}
                                    style={{color: "#BDBDBD"}}
                                />
                                <AddReviewModal data={restaurant} onSubmitModal={this.updateRestaurant}/>
                            </Col>
                        </Row>
                    </CardText>
                    <CardText expandable={true} actAsExpander={true}>
                        <ReviewList/>
                    </CardText>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default RestaurantsCard;


