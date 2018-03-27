import React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import {Row, Col} from 'react-bootstrap';
import Search from '../search/Search';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AddRestaurantModal from '../modals/AddRestaurantModal';

class RestaurantsList extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
    }
    render(){
        console.log("aaa", this.props);
        return (
            <MuiThemeProvider>
                <div>
                    <Card>
                        <CardHeader
                            title="Without Avatar"
                            subtitle="Subtitle"
                        />
                        <CardText expandable={false}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        </CardText>
                    </Card>
                    <Card>
                        <CardHeader
                            title="Without Avatar"
                            subtitle="Subtitle"
                        />
                        <CardText expandable={false}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        </CardText>
                    </Card>
                    <Card>
                        <CardHeader
                            title="Without Avatar"
                            subtitle="Subtitle"
                        />
                        <CardText expandable={false}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        </CardText>
                    </Card>
                    <Card>
                        <CardHeader
                            title="Without Avatar"
                            subtitle="Subtitle"
                        />
                        <CardText expandable={false}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                        </CardText>
                    </Card>
                </div>
            </MuiThemeProvider>
        );
    }
}

export default RestaurantsList;

