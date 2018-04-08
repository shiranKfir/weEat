import React from 'react';
import {Row, Col} from "react-bootstrap";
import SelectField from 'material-ui/SelectField';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import StarRating from 'react-star-rating-component';
import Checkbox from 'material-ui/Checkbox';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import styles from './Filters.scss'

class Filters extends React.Component {

    sliderMin = 0;
    sliderMax = 120;
    sliderStep = 1;

    state = {
        filters: {
            cuisine_id : '',
            max_delivery_time: 0,
            rating: 0,
            has_10bis: false
        }
    };

    componentWillReceiveProps(nextProps) {
        this.cuisineItems = nextProps.cuisines.map(val =>
            <MenuItem value={val.id} key={val.id} primaryText={val.name}/>
        );

        this.cuisineItems.unshift(<MenuItem value='' key={-1} primaryText=''/>)
    };

    handleChange = (event) => {
        const {filters} = this.state;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        filters[name] = value;
        this.setState({filters});
        this.props.filterRestaurants(value, name);
    };


    handleSelectChange = (event, index, value) => {
        const {filters} = this.state;
        filters.cuisine_id = value;
        this.setState({filters});
        this.props.filterRestaurants(value, 'cuisine_id');
    };

    handleSlider = (event, value) => {
        const {filters} = this.state;
        filters.max_delivery_time = value;
        this.setState({filters});
        this.props.filterRestaurants(value, 'max_delivery_time');
    };

    onStarClick = (nextValue, prevValue, name) => {
        let value = nextValue == prevValue ? 0 : nextValue;
        const {filters} = this.state;
        filters[name] = value;
        this.setState({filters});
        this.props.filterRestaurants(value, name);
    };

    render(){
        const {filters} = this.state;
        const muiTheme = getMuiTheme({
            slider: {
                selectionColor: 'rgb(233, 30, 99)'
            },
        });
        const showMinutes = filters.max_delivery_time > 0 ? `: ${filters.max_delivery_time} Minutes` : ``;

        return (
            <MuiThemeProvider>
                <Row className="filters">
                    <Col md={3} className="filters-col">
                        <SelectField
                            value={filters.cuisine_id}
                            floatingLabelStyle={{color: 'white', top: 32}}
                            onChange={this.handleSelectChange}
                            fullWidth={true}
                            floatingLabelText="Select Cuisine"
                            labelStyle={{color: 'white'}}
                        >
                            {this.cuisineItems}
                        </SelectField>
                    </Col>

                    <Col md={3} className="filters-col">
                        <div className="slider">
                            <span
                                className="slider-title">
                                {`Max delivery time ${showMinutes}`}</span>
                            <MuiThemeProvider muiTheme={muiTheme}>
                                <Slider
                                    name="max_delivery_time"
                                    min={this.sliderMin}
                                    max={this.sliderMax}
                                    step={this.sliderStep}
                                    value={filters.max_delivery_time}
                                    onChange={this.handleSlider}
                                />
                            </MuiThemeProvider>
                        </div>
                    </Col>
                    <Col md={2} className="filters-col">
                        <div className="min-rating-title">Minimal Rating</div>
                        <StarRating className="star-component"
                                    name="rating"
                                    starCount={5}
                                    value={filters.rating}
                                    starColor="rgb(233, 30, 99)"
                                    onStarClick={this.onStarClick}
                                    emptyStarColor="#e0dcdc"
                        />
                    </Col>
                    <Col md={3} className="filters-col">
                        <Checkbox
                            className="tenBis-filter"
                            label="Accepts 10Bis"
                            checked={filters.has_10bis}
                            onCheck={this.handleChange}
                            labelStyle={{color: 'white'}}
                            iconStyle={{fill: 'rgb(233, 30, 99)'}}
                            name="has_10bis"
                        />
                    </Col>
                </Row>
            </MuiThemeProvider>
        );
    };
}

export default Filters;

