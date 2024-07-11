import React, {Component} from 'react';
import Navbar from '../../containers/Navbar/Navbar';
import Footer from '../../containers/Footer/Footer';

class Layout extends Component {

    render() {
        let footer =  <Footer/>;
        const location = window.location.href;
        if (location.includes('/login') || location.includes('/register')) {
            footer = null
        }
        return (
            <div>
                <Navbar/>
                <div>{this.props.children}</div>
                {footer}
            </div>
        )
    }
}

export default Layout;