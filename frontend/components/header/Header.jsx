import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Search from '../search/Search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AddRestaurantModal from '../modals/restaurant/AddRestaurantModal';
import styles from './Header.scss'

class Header extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <MuiThemeProvider>
                <div className="bgimage">
                    <div className="container">
                        <h1 className="text-center">WeEat</h1>
                        <Row>
                            <Col md={3}>
                            </Col>
                            <Col md={6}>
                                <Search searchRestaurants={this.props.searchRestaurants}/>
                            </Col>
                            <Col md={3}>
                               <AddRestaurantModal
                                   data={this.props.data.cuisines}
                                   onSubmitModal={this.props.onSubmitModal}/>
                            </Col>
                        </Row>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Header;

