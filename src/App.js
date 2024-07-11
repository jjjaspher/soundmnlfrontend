import './App.css';
import React, {Component} from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import Login from './containers/Login/Login';
import Register from './containers/Register/Register';
import Home from './containers/Home/Home';
import Layout from './hoc/Layout/Layout';
import Logout from './containers/Logout/Logout';
import Checkout from './containers/BookCheckout/CheckoutPage/CheckoutPage';
import MyBook from './containers/MyBook/MyBook';
import * as actions from './store/actions/authAction';
import {connect} from 'react-redux';

class App extends Component {
  state = {};

  componentDidMount() {
    this.props.onAuthCheckState()
  }

  render() {
    let routes = (
      <Switch>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/logout' component={Logout}/>
          <Route path='/checkout' component={Checkout}/>
          <Route path='/myBook' component={MyBook}/>
          <Route path='/' exact component={Home}/>
      </Switch>
    )

    return (
      <div>
          <Layout>
            {routes}
          </Layout>          
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuthCheckState: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
