import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col} from 'react-bootstrap';
import Search from '../search/Search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AddRestaurantModal from '../modals/AddRestaurantModal';

class RestaurantsList extends React.Component {
    constructor(props){
        super(props);
    }

    componentWillReceiveProps(nextProps) {
        this.restaurants = nextProps.data.map(val =>
            <Card key={val.id}>
                <CardHeader
                    title={val.title}
                    subtitle={val.address}
                />
                <CardText expandable={false}>
                    // add more info here
                </CardText>
            </Card>
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

