import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './header/Header';
import Filters from './filters/Filters';
import RestaurantsList from './restaurants/list/RestaurantsList'
import Api from '../api/Api';
import Map from './map/Map';

class App extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data : {}
        }
    }
    async componentDidMount(){
        const cuisines = await this.getCuisines();
        const restaurants = await this.getRestaurants();
        this.setState({data: {cuisines, restaurants}});
    }
    addRestaurantToList = (newRestaurant) => {
        const {data} = this.state;
        this.state.data.restaurants.push(newRestaurant);
        this.setState({data});
    };
    render(){
        return (
            <div>
                <Grid fluid={true}>
                    <Header data={this.state.data} onSubmitModal={this.addRestaurantToList}/>
                    <Filters/>
                    <Row>
                        <Col className="custome-col" md={4} style={{height: window.innerHeight - 400, overflow: "auto"}}>
                            <RestaurantsList data={this.state.data.restaurants}/>
                        </Col>
                        <Col className="custome-col" md={8}>
                            <Map
                                isMarkerShown
                                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: window.innerHeight - 400 }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }

    async getCuisines() {
        const cuisines = await Api.getData("cuisines");
        return cuisines.data;
    }

    async getRestaurants() {
        const restaurants = await Api.getData("restaurants");
        return restaurants.data;
    }
}

export default App;