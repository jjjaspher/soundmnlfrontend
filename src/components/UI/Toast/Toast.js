import React, {Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import classes from './Toast.module.scss';
import Aux from '../../../hoc/Auxiliary/Auxiliary';


class Toast extends Component {

    render() {

        return (
            <Aux>
                <Backdrop show={this.props.backDrop} clicked={this.props.onClickBackDrop}/>
                <div className={classes[this.props.toastType]}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}


export default Toast;
