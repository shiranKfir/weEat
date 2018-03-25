import React from 'react';
import {Grid} from 'react-bootstrap';
import Header from './header/Header';
import Filters from './filters/Filters';
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
        this.setState({data: {cuisines}});
    }
    render(){

        return (
            <div>
                <Grid fluid={true}>
                    <Header data={this.state.data}/>
                    <Filters/>
                </Grid>
            </div>
        );
    }

    async getCuisines() {
        const cuisines = await Api.getData("cuisines");
        return cuisines.data;
    }
}

export default App;