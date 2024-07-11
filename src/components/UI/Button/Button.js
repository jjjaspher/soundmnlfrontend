import React from 'react';
import classes from './Button.module.scss'
const button = (props) => {
    return (
        <div>
            <button 
            className={[classes[props.btnClass], classes[props.btnType]].join(' ')}
            onClick={props.onClick}>{props.children}</button>
        </div>
    )
}

export default button;