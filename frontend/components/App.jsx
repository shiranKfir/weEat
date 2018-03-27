import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import Header from './header/Header';
import Filters from './filters/Filters';
import RestaurantsList from './restaurants/RestaurantsList'
import Api from '../api/Api';

// const App = () => (
//     <div>
//         <Grid fluid={true}>
//             <Header/>
//             <Filters/>
//         </Grid>
//     </div>
// );
//
// export default App;

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
    render(){

        return (
            <div>
                <Grid fluid={true}>
                    <Header data={this.state.data}/>
                    <Filters/>
                    <Row style={{padding: 50}}>
                        <Col md={4} style={{height: "430px", overflow: "auto"}}>
                            <RestaurantsList data={this.state.data.restaurants}/>
                        </Col>
                        <Col md={8} style={{height: "100%"}}>
                            <h1>sfghsfghsfg</h1>
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