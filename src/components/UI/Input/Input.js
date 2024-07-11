import React from 'react';
import classes from './Input.module.scss';


const input = (props) => {
    const hasValue = props.value.length !== 0;
    const hasError = props.errMessage.length !== 0;
    let InputClass = classes.Input
    let LabelPos = hasValue ? classes.LabelContTop : classes.LabelContBot;    
    if ((props.focus === true && hasValue !== true) || (props.focus !== true && hasError === true)) {
        LabelPos = classes.LabelContTop;
    }
    if (hasError === true) {
        InputClass = [classes.Input, classes.AddInputPadding].join(' ');
    } 
    
   
    return (
        <div className={classes.InputCont}>
            <div className={LabelPos}>
                <label className={classes.LabelInput}>{props.label}</label>
                <label className={classes.ErrorLabel}>{props.errMessage}</label>                  
            </div>
                
            <input
                className={InputClass}                
                type={props.type}
                value={props.value}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur ={props.onBlur}/>
        </div>
    )
}

export default input;