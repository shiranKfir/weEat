import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col} from 'react-bootstrap';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import styles from './RestaurantCard.scss'

class RestaurantsCard extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const iconStyles = {
            marginRight: 5,
            position: "relative",
            top: 8
        };

        const {restaurant} = this.props;
        return (
            <Card>
                <CardText expandable={false}>
                    <Row>
                        <Col md={2}><div className="cuisine_font icon">{restaurant.cuisine.icon}</div></Col>
                        <Col md={7}>
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
                                        {[...Array(restaurant.rating)].map((val, key) =>
                                            <ActionGrade key={key} style={iconStyles} color={yellow500}/>
                                        )}
                                    </span>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </CardText>
            </Card>
        );
    }
}

export default RestaurantsCard;

