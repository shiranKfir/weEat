import React from 'react';
import {Row, Col} from 'react-bootstrap';
import Search from '../search/Search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AddRestaurantModal from '../modals/AddRestaurantModal';
import styles from './Header.scss'

class Header extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        return (
            <MuiThemeProvider>
                <Row className="bgimage">
                    <div className="container">
                        <h1 className="text-center">WeEat</h1>
                        <Row>
                            <Col md={3}>
                            </Col>
                            <Col md={6}>
                                <Search/>
                            </Col>
                            <Col md={3}>
                               <AddRestaurantModal cuisines={this.props.data.cuisines}/>
                            </Col>
                        </Row>
                    </div>
                </Row>
            </MuiThemeProvider>
        );
    }
}

export default Header;

