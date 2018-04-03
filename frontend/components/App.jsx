import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './header/Header';
import Filters from './filters/Filters';
import RestaurantsList from './restaurants/list/RestaurantsList'
import Api from '../api/Api';
import Map from './map/Map';

class App extends React.Component {

    state = {
        data : {},
        filteredRestaurant: [],
        center: null,
        selected: {},
        filters: {
            title: '',
            cuisine_id: '',
            max_delivery_time: 0,
            rating: '',
            has_10bis: ''
        }
    };

    async componentDidMount(){
        const cuisines = await this.getCuisines();
        const restaurants = await this.getRestaurants();
        const center = {lat: restaurants[0].lat, lng: restaurants[0].lng};
        this.setState({data: {cuisines, restaurants}, filteredRestaurant: restaurants, center, selected: restaurants[0]});
    }

    async getCuisines() {
        const cuisines = await Api.getData("cuisines");
        return cuisines.data;
    }

    async getRestaurants() {
        const restaurants = await Api.getData("restaurants");
        return restaurants.data;
    }

    addRestaurantToList = (newRestaurant) => {
        const {data} = this.state;
        this.state.data.restaurants.push(newRestaurant);
        this.setState({data});
    };

    setCenterMap = (restaurant) => {
        const center = {lat: restaurant.lat, lng: restaurant.lng};
        this._mapComponent.panTo(center);
        //this.setState({center});
    };

    handleMapLoad = (map) => {
        this._mapComponent = map;
        //this._mapComponent
    };

    searchRestaurants = (query, name) => {
        const {data, filters} = this.state;
        let showRestaurant = true;
        filters[name] = query;
        this.setState({filters});

        let filteredRestaurant = data.restaurants.filter( restaurant => {
            for (const key in filters) {
                if (key == 'max_delivery_time'){
                    showRestaurant = filters[key] > 0 ? restaurant[key] <= filters[key] : true;
                }
                else if(key == 'rating'){
                    showRestaurant = filters[key] > 0 ? filters[key] <= restaurant[key] : true;
                }
                else {
                    showRestaurant = restaurant[key].toString().toLowerCase().includes(filters[key]);
                }

                if (!showRestaurant)
                    break;
            };
            return showRestaurant;
        });
        const center =  filteredRestaurant.length  ?
            {lat: filteredRestaurant[0].lat, lng: filteredRestaurant[0].lng} : null;
        const selected = filteredRestaurant.length ? filteredRestaurant[0] : {};
        this.setState({filteredRestaurant, center, selected});
    };

    render(){
        const {filteredRestaurant, data, center, selected} = this.state;
        return (
            <div>
                <Grid fluid={true}>
                    <Header data={data}
                            searchRestaurants={this.searchRestaurants}
                            onSubmitModal={this.addRestaurantToList}/>
                    <Filters cuisines={data.cuisines} searchRestaurants={this.searchRestaurants}/>
                    <Row>
                        <Col className="custome-col" md={4} style={{height: 'calc(100vh - 400px)', overflow: 'auto'}}>
                            <RestaurantsList data={filteredRestaurant} onClickRestaurant={this.setCenterMap}/>
                        </Col>
                        <Col ref="map" className="custome-col" md={8}>
                            {center && <Map restaurants={filteredRestaurant}
                                            isMarkerShown
                                            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                                            loadingElement={<div style={{ height: `100%` }} />}
                                            containerElement={<div style={{ height: 'calc(100vh - 400px)' }} />}
                                            mapElement={<div style={{ height: `100%` }} />}
                                            selected={selected}
                                            animation={2}
                                            onMapLoad={this.handleMapLoad}
                                            center={center}/>}
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default App;