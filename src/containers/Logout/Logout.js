import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {logout} from '../../store/actions/authAction';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/bookAction'
class Logout extends Component {

    componentDidMount () {
        this.props.onLogout();
        this.props.onResetState();
    }

    render () {    
        return (
            <Redirect to='/'/>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout()),
        onResetState: () => dispatch(actions.resetState())
    
    }
}

export default connect(null, mapDispatchToProps)(Logout);