import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {TextValidator, ValidatorForm} from 'react-material-ui-form-validator';
import Api from '../../../api/Api';
import Snackbar from 'material-ui/Snackbar';
import RateReview from 'material-ui/svg-icons/maps/rate-review';
import StarRating from 'react-star-rating-component';
import styles from './AddReviewModal.scss'

class AddReviewModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openModal: false,
            openSnackBar: false,
            message: '',
            formData: {
                reviewer_name: '',
                comment: '',
                rating: 0
            }
        };
    }

    onStarClick = (nextValue, prevValue, name) => {
        this.state.formData['rating'] = nextValue;
        this.setState({formData: this.state.formData});
    };

    render() {
        const {formData, openModal, openSnackBar, message} = this.state;
        const customContentStyle = {
            width: '25%',
            maxWidth: 'none',
        };

        return (
            <div>
                <FlatButton
                    label=""
                    style={{color: "#BDBDBD"}}
                    onClick={this.openNewRestaurantModal}
                    icon={<RateReview />}
                />

                <Dialog
                    title="Add New Review"
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
                                floatingLabelText="Name"
                                onChange={this.handleChange}
                                fullWidth={true}
                                name="reviewer_name"
                                validators={['required']}
                                errorMessages={['this field is required']}
                                value={formData.reviewer_name}
                            />
                        </div>
                        <div>
                            <TextField
                                fullWidth={true}
                                multiLine={true}
                                onChange={this.handleChange}
                                value={formData.address}
                                name="comment"
                                floatingLabelText="Comment"/>
                        </div>
                        <div className="rating">
                            <span>Rating</span>
                            <StarRating className="star-component"
                                name="rating"
                                starCount={3}
                                value={formData.rating}
                                starColor={"rgb(255, 235, 59)"}
                                onStarClick={this.onStarClick}
                                emptyStarColor="rgba(0, 0, 0, .54)"
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

    handleSubmit = (event) => {
        event.preventDefault();
        this.state.formData.restaurant_id = this.props.data.id;
        Api.postData('reviews', this.state.formData).then(res => {
            this.setState({
                message: "New Review was added successfully.",
                openSnackBar: true,
            });
            this.props.onSubmitModal(res.data.restaurant);
            this.handleClose();
            this.reset();
        }).catch(error => {
            this.setState({
                message: "Error! Review was not created.",
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

    handleRequestClose = () => {
        this.setState({
            openSnackBar: false,
        });
    };

    reset = () => {
        this.setState({
            formData: {
                reviewer_name: '',
                comment: '',
                rating: 0
            },
        });
        this.refs.form.resetValidations();
    };
}

export default AddReviewModal;

