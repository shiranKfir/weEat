import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RestaurantCard from '../card/RestaurantCard';
import styles from './RestaurantsList.scss';

class RestaurantsList extends React.Component {
    constructor(props){
        super(props);
    }

    onClickRestaurant = (restaurant) => {
        this.props.onClickRestaurant(restaurant);
    };

    componentWillReceiveProps(nextProps) {
        this.restaurants = nextProps.data.map(val =>
            <RestaurantCard key={val.id}
                            onClick={this.onClickRestaurant}
                            restaurant={val}/>
        );
        this.message = <h3 className="message">No Restaurants Found</h3>
    }

    render(){

        return (
            <MuiThemeProvider>
                <div className="restaurants-list">
                    {this.restaurants && this.restaurants.length ? this.restaurants : this.message}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default RestaurantsList;

