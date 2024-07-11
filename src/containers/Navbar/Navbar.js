import React, {Component} from 'react';
import classes from './Navbar.module.scss';
import NavItem from './NavItem';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Logo from '../../components/UI/Logo/Logo';
import BurgerToggle from '../../components/BurgerToggle/BurgerToggle';
import SideDrawer from '../../components/SideDrawer/SideDrawer';

class Navbar extends Component {
    state = {
        navBarClass: 'NavBarDefault',
        showLogo: false,
        showSideDrawer: false
    }

    componentDidMount() {
        this.watchScroll()
        window.addEventListener('scroll', this.watchScroll.bind(this))
    }

    watchScroll = () => {
        const scrollTop = document.documentElement.scrollTop;
        const width = window.innerWidth;
        if (width < 500) {return}
        if (scrollTop > 80) {
            this.setState({navBarClass: 'NavBarShow', showLogo: true})            
        } else {
            this.setState({navBarClass: 'NavBarDefault', showLogo: false})
        }
    }

    burgerToggle = () => {
        this.setState({showSideDrawer: !this.state.showSideDrawer})
    }

    render() {
        let navLinks = (
            <Aux> 
                <NavItem link='/' exact>HOME</NavItem>                
                <NavItem link='/login'>LOGIN</NavItem>
                <NavItem link='/register'>SIGN UP</NavItem>
            </Aux>
        );
        if (this.props.isAuthenticated) {
            navLinks = (
                <Aux>
                    <NavItem link='/' exact>Home</NavItem>                                                                   
                    <NavItem link='/mybook'>MyBook</NavItem>
                    <NavItem link='/logout'>Logout</NavItem>
                </Aux>
            )
        }
        let logo = null;

        if (this.state.showLogo) {
            logo = <Logo/>
        }
        return (
            <div className={classes.NavBarContainer}>                
                <nav className={classes[this.state.navBarClass]}>
                    <div className={classes.LogoCont}>
                        {logo}
                    </div>
                    <ul className={classes.NavBarUL}>
                            {navLinks}                        
                    </ul>
                    <BurgerToggle/>
                                                                                          
                </nav>
                <nav className={[classes.NavBarShow, classes.NavBarMobile].join(' ')}>
                    <div className={classes.LogoCont}>
                        <Logo/>
                    </div>
                    <BurgerToggle onClick={this.burgerToggle}/>
                    <SideDrawer 
                        open={this.state.showSideDrawer} 
                        isAuthenticated={this.props.isAuthenticated}
                        onClickBackDrop={this.burgerToggle}/>                                                                                                                                 
                </nav>
            </div>
        )
    }
}


const mapStatetoProps = state => {
    return {        
        isAuthenticated: state.authReducer.token !== null
    };
}

export default connect(mapStatetoProps)(Navbar);