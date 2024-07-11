import React from 'react';
import classes from './BurgerToggle.module.scss';


const burgerToggle = (props) => (
    <div className={classes.BurgerToggle} onClick={props.onClick}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default burgerToggle;