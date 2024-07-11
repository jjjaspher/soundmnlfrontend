import React, {Component} from 'react';
import LandingPage from '../../components/LandingPage/LandingPage';
import BookContent from '../BookContent/BookContent';


class Home extends Component {
    render() {
        return (
            <div>
                <LandingPage/>
                <BookContent/>
            </div>
        )
    }
}

export default Home;