import React from 'react';
import {Card, CardText} from 'material-ui/Card';
import {Row, Col} from 'react-bootstrap';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Expand from 'material-ui/svg-icons/navigation/expand-more';
import Reduce from 'material-ui/svg-icons/navigation/expand-less';
import ReviewList from '../../reviews/ReviewList';
import AddReviewModal from '../../modals/review/AddReviewModal';
import styles from './RestaurantCard.scss'

class RestaurantsCard extends React.Component {

    state = {
        expanded: false,
        rating: this.props.restaurant.rating,
        cardColor: "white"
    };

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

    onClickRestaurant = () => {
      this.props.onClick(this.props.restaurant);
    };

    onMouseOver = () => {
        this.setState({cardColor: "#ECEFF1"});
    };

    onMouseOut = () => {
        this.setState({cardColor: "white"});
    };

    render(){
        const iconStyles = {
            marginRight: 5,
            position: "relative",
            top: 8
        };

        const {restaurant} = this.props;
        const {expanded, cardColor} = this.state;

        return (
            <MuiThemeProvider>
                <Card expanded={expanded}
                      style={{backgroundColor: cardColor}}
                      onClick={this.onClickRestaurant}
                      onMouseOver={this.onMouseOver}
                      onMouseOut={this.onMouseOut}
                      className="restaurant-card">
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
                                        {
                                            Array.from([...Array(this.state.rating)], (val, key) =>
                                                <ActionGrade key={key} style={iconStyles} color={'#E91E63'}/>)
                                        }

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
                        <ReviewList reviews={restaurant.reviews}/>
                    </CardText>
                </Card>
            </MuiThemeProvider>
        );
    }
}

export default RestaurantsCard;


