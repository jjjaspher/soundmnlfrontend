import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/bookAction';
import {Redirect} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Toast from '../../components/UI/Toast/Toast';
import { withRouter } from 'react-router-dom';

class BookCheckout extends Component {
    state ={
        isBookSet: false,
        isSelectedEmpty: false,
        timerId: null            
    } 
    
    componentWillUnmount() {
        if (this.state.timerId) {
            clearTimeout(this.state.timerId)
        }
        this.setState({isSelectedEmpty: false})
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isSelectedEmpty !== prevState.isSelectedEmpty) {
            this.closeToast();
        }
    }

    bookHandler = () => {
        if (this.props.selectedSlot.length === 0) {            
            this.setState({isSelectedEmpty: true})
            return
        }
        if (this.props.isAuthenticated !== true) {
            this.props.history.push('/login')
            return
        }    
        this.sortByDate(this.props.selectedSlot)
        
    }
    sortByDate = (data) => {
        const cloneData = [...data] 
        const sortedData = cloneData.sort((aData, bData) => {
            if (Date.parse(aData.bookdate) < Date.parse(bData.bookdate)) {
                return -1;
            }
            if (Date.parse(aData.bookdate) > Date.parse(bData.bookdate)) {
                return 1;
            }
            return 0;
        })

        sortedData.sort((aData, bData) => {
            if (aData.bookdate === bData.bookdate && aData.timeStart < bData.timeStart) {
                return -1;
            }
            if (aData.bookdate === bData.bookdate && aData.timeStart > bData.timeStart) {
                return 1;
            }
            return 0;
        })
        this.props.onUpdateCheckoutBook(sortedData)
        this.setState({isBookSet: true})                        
    }

    closeToast = () => {    
        let timerId = setTimeout(() => {
            this.setState({isSelectedEmpty: false})
        }, 2000);  
        this.setState({timerId: timerId})
    }

    render() {
        let toast = null;
        if (this.state.isSelectedEmpty) {            
            toast = (
                <Aux>
                    <Toast toastType='FlashToast'>
                        <div>
                            <span>Please select date</span>                            
                        </div>
                    </Toast>
                </Aux>
            );            
        }
        let redirect = null;        
        if (this.state.isBookSet) {            
            redirect = (                
                <Redirect to='/checkout'/>
            )
        }
        return (
            <div>
                {toast}
                {redirect}
                <Button btnClass='Button' btnType='Success' onClick={this.bookHandler}>BOOK</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedSlot: state.bookReducer.selectedSlot,
        isAuthenticated: state.authReducer.token !== null                    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCheckoutBook: (checkoutBook) => dispatch(actions.updateCheckoutBook(checkoutBook))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookCheckout));