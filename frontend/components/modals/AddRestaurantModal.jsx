import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import {Grid, Row, Col} from 'react-bootstrap';
import styles from './AddRestaurantModal.scss'

// const items = [];
// for (let i = 0; i < 100; i++ ) {
//     items.push(<MenuItem value={i} key={i} primaryText={`Item ${i}`} />);
// }

class AddRestaurantModal extends React.Component {
    constructor(props){
        super(props);
        //console.log("this.props", this.props);

        this.state = {
            open: false,
            formData: {
                title: "",
                cuisine_id: "",
                address: "",
                max_delivery_time: 5,
                has_10_bis: false
            }
        };
    }
    componentDidMount(){
        //console.log("this.props.cuisines", this.props.cuisines);
        // this.cuisineItems = this.props.cuisines.map(val => {
        //     <MenuItem value={val.id} key={val.id} primaryText={val.name} />
        // });
    }
    componentWillReceiveProps(nextProps){
        this.cuisineItems = nextProps.cuisines.map(val =>
            <MenuItem value={val.id} key={val.id} primaryText={val.name} />
        );
    }
    render(){

        const customContentStyle = {
            width: '25%',
            maxWidth: 'none',
        };

        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleSubmit}
            />
        ];

        return (
           <div>
               <FloatingActionButton backgroundColor="#E91E63" onClick={this.openNewRestaurantModal}>
                   <ContentAdd />
               </FloatingActionButton>

               <Dialog
                   title="Add Restaurant"
                   actions={actions}
                   modal={false}
                   open={this.state.open}
                   contentStyle={customContentStyle}
                   onRequestClose={this.handleClose}>
                   <form>
                       <div>
                           <TextField
                               name="title"
                               fullWidth={true}
                               onChange={this.handleChange}
                               floatingLabelText="Restaurant Name"/>
                       </div>
                       <div>
                           <SelectField
                               name="cuisine_id"
                               value={this.state.formData.cuisine_id}
                               onChange={this.handleSelectChange}
                               maxHeight={200}
                               hintText="Cuisine Type"
                               floatingLabelText="Cuisine Type"
                               fullWidth={true}
                           >
                               {this.cuisineItems}
                           </SelectField>
                           <div>
                               <TextField
                                   name="address"
                                   fullWidth={true}
                                   onChange={this.handleChange}
                                   floatingLabelText="Address"/>
                           </div>
                           <div className="slider">
                               <span className="slider-title">{`Maximun delivery time - ${this.state.formData.max_delivery_time} Minutes`}</span>
                               <Slider
                                   name="max_delivery_time"
                                   min={0}
                                   max={60}
                                   step={1}
                                   value={this.state.formData.max_delivery_time}
                                   onChange={this.handleSlider}
                               />
                           </div>
                           <div>
                               <Checkbox
                                   label="Accepts 10Bis"
                                   checked={this.state.formData.has_10_bis}
                                   onCheck={this.handleChange}
                                   labelStyle={{color: "rgba(0, 0, 0, 0.3)"}}
                                   name="has_10_bis"
                               />
                           </div>
                       </div>
                   </form>
               </Dialog>
           </div>
        );
    }

    openNewRestaurantModal = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    handleSlider = (event, value) => {
        const { formData } = this.state;
        formData['max_delivery_time'] = value;
        this.setState({ formData });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log("fdsfdsdg", this.state.formData);
        this.handleClose();
    };

    handleChange = (e) => {
        const { formData } = this.state;
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        formData[name] = value;

        this.setState({ formData });
    };

    handleSelectChange = (event, index, value) => {
        const { formData } = this.state;
        formData['cuisine_id'] = value;
        this.setState({ formData });
    }
}

export default AddRestaurantModal;

