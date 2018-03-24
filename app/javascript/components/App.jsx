import React from 'react';
import {Grid, Row, Col} from "react-bootstrap";

// import Slider from 'material-ui/Slider';
import styles from './App.module.scss';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider>
    <div>
        <Grid fluid={true} style={{paddingLeft: 0, paddingRight: 0}}>
            <div className="bgimage">
                <div>WeEat</div>
            </div>
            <Row className="filters" style={{marginLeft: 0, marginRight: 0}}>
            </Row>
        </Grid>
    </div>
    </MuiThemeProvider>


);

export default App;