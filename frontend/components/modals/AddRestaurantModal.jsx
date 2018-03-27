import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import Slider from 'material-ui/Slider';
import Checkbox from 'material-ui/Checkbox';
import {TextValidator, SelectValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Api from '../../api/Api';
import Snackbar from 'material-ui/Snackbar';
import styles from './AddRestaurantModal.scss'

class AddRestaurantModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            openSnackBar: false,
            message: '',
            formData: {
                title: '',
                cuisine_id: '',
                address: '',
                max_delivery_time: 5,
                has_10bis: false
            }
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        this.cuisineItems = nextProps.cuisines.map(val =>
            <MenuItem value={val.id} key={val.id} primaryText={val.name}/>
        );
    }

    render() {
        const {formData, openModal, openSnackBar, message} = this.state;
        const customContentStyle = {
            width: '25%',
            maxWidth: 'none',
        };

        return (
            <div>
                <FloatingActionButton backgroundColor="#E91E63" onClick={this.openNewRestaurantModal}>
                    <ContentAdd/>
                </FloatingActionButton>

                <Dialog
                    title="Add Restaurant"
                    modal={false}
                    open={openModal}
                    contentStyle={customContentStyle}
                    onRequestClose={this.handleClose}>
                    <ValidatorForm
                        ref="form"
                        onSubmit={this.handleSubmit}
                        onError={errors => console.log(errors)}
                    >
                        <div>
                            <TextValidator
                                floatingLabelText="Restaurant Name"
                                onChange={this.handleChange}
                                fullWidth={true}
                                name="title"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                value={formData.title}
                            />
                        </div>
                        <div>
                            <SelectValidator
                                name="cuisine_id"
                                value={formData.cuisine_id}
                                onChange={this.handleSelectChange}
                                maxHeight={200}
                                hintText="Cuisine Type"
                                floatingLabelText="Cuisine Type"
                                fullWidth={true}
                                validators={['required']}
                                errorMessages={['this field is required']}
                            >
                                {this.cuisineItems}
                            </SelectValidator>
                        </div>
                        <div>
                            <TextValidator
                                name="address"
                                fullWidth={true}
                                onChange={this.handleChange}
                                value={formData.address}
                                validators={['required']}
                                errorMessages={['this field is required']}
                                floatingLabelText="Address"/>
                        </div>
                        <div className="slider">
                            <span
                                className="slider-title">{`Maximun delivery time - ${formData.max_delivery_time} Minutes`}</span>
                            <Slider
                                name="max_delivery_time"
                                min={0}
                                max={60}
                                step={1}
                                value={formData.max_delivery_time}
                                onChange={this.handleSlider}
                            />
                        </div>
                        <div>
                            <Checkbox
                                label="Accepts 10Bis"
                                checked={formData.has_10bis}
                                onCheck={this.handleChange}
                                labelStyle={{color: "rgba(0, 0, 0, 0.3)"}}
                                name="has_10bis"
                            />
                        </div>
                        <div className="actions-buttons">
                            <FlatButton
                                label="Cancel"
                                primary={true}
                                onClick={this.handleClose}
                            />
                            <FlatButton
                                label="Submit"
                                primary={true}
                                keyboardFocused={false}
                                type="submit"
                            />
                        </div>
                    </ValidatorForm>
                </Dialog>

                <Snackbar
                    open={openSnackBar}
                    message={message}
                    autoHideDuration={2000}
                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }

    openNewRestaurantModal = () => {
        this.setState({openModal: true});
    };

    handleClose = () => {
        this.setState({openModal: false});
    };

    handleSlider = (event, value) => {
        const {formData} = this.state;
        formData['max_delivery_time'] = value;
        this.setState({formData});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        Api.postData('restaurants', this.state.formData).then(res => {
            this.setState({
                message: "Restaurant was added successfully.",
                openSnackBar: true,
            });
            this.handleClose();
            this.reset();
        }).catch(error => {
            this.setState({
                message: "Error! Restaurant was not created.",
                openSnackBar: true,
            });
        });
    };

    handleChange = (e) => {
        const {formData} = this.state;
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        formData[name] = value;

        this.setState({formData});
    };

    handleSelectChange = (event, index, value) => {
        const {formData} = this.state;
        formData['cuisine_id'] = value;
        this.setState({formData});
    };

    handleRequestClose = () => {
        this.setState({
            openSnackBar: false,
        });
    };

    reset = () => {
        this.setState({
            formData: {
                title: '',
                cuisine_id: '',
                address: '',
                max_delivery_time: 5,
                has_10bis: false
            },
        });
        this.refs.form.resetValidations();
    };
}

export default AddRestaurantModal;

