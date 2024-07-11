import React from 'react';
import Backdrop from '../UI/Backdrop/Backdrop';
import NavItem from '../../containers/Navbar/NavItem';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import classes from './SideDrawer.module.scss';
import {RiArrowGoBackLine} from 'react-icons/ri'
import {AiFillHome} from 'react-icons/ai';
import {FaKey, FaTicketAlt} from 'react-icons/fa';
import {BsFillPersonLinesFill} from 'react-icons/bs';
import {BiLogOut} from 'react-icons/bi';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawerContainer, classes.Close].join(' ');

    if (props.open === true) {
        attachedClasses = [classes.SideDrawerContainer, classes.Open].join(' ');
    }

    let navLinks = (
        <Aux> 
            <NavItem link='/' exact><AiFillHome size={20}/> HOME</NavItem>                
            <NavItem link='/login'><FaKey size={20}/> LOGIN</NavItem>
            <NavItem link='/register'><BsFillPersonLinesFill size={20}/> SIGN UP</NavItem>
            <li className={classes.CloseBtn}><RiArrowGoBackLine size={20}/> CLOSE</li>
            
        </Aux>
    );
    if (props.isAuthenticated) {
        navLinks = (
            <Aux>
                <NavItem link='/' exact><AiFillHome size={20}/> Home</NavItem>                                                                   
                <NavItem link='/mybook'><FaTicketAlt size={20}/> MyBook</NavItem>
                <NavItem link='/logout'><BiLogOut size={20}/> Logout</NavItem>
                <li className={classes.CloseBtn}><RiArrowGoBackLine size={20}/> CLOSE</li>
            </Aux>
        )
    }
    return (
        <div>
            <Backdrop show={props.open} clicked={props.onClickBackDrop}/>
            <div className={attachedClasses}>                
                <ul onClick={props.onClickBackDrop} >
                    {navLinks}
                </ul>
            </div>
            
        </div>
    )
}


export default sideDrawer;