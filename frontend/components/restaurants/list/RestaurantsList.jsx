import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RestaurantCard from '../card/RestaurantCard';

class RestaurantsList extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.restaurants = nextProps.data.map(val =>
            <RestaurantCard key={val.id}
                            restaurant={val}/>
        );
    }

    render(){

        return (
            <MuiThemeProvider>
                <div>
                    {this.restaurants}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default RestaurantsList;

