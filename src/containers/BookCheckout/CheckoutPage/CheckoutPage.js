import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/bookAction';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../../components/UI/Button/Button';
import {Redirect} from 'react-router-dom';
import {isEmpty} from '../../../store/utility';
import classes from './CheckoutPage.module.scss';
import soundWave from '../../../assets/images/soundwave.gif';
import bandImg from '../../../assets/images/band.png';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import Logo from '../../../components/UI/Logo/Logo';
import Toast from '../../../components/UI/Toast/Toast';
import Spinner from '../../../components/UI/Spinner/Spinner';


class CheckoutPage extends Component {
    state = {
        totalPrice: 0,
        showCancelConfirmation: false,
        showCheckoutConfirmation: false,
        transactionDone: false
    }

    componentDidMount() {
        this.computeTotalPrice();        
    }

    componentDidUpdate(prevProps, prevState) {        
        if (prevProps.checkoutBook !== this.props.checkoutBook) {
            this.computeTotalPrice();
        }        
    }
    
    componentWillUnmount() {
        this.props.onResetState()
    }
  
    deleteBook = (key) => {
        const updatedBook = {...this.props.checkoutBook}        
        delete updatedBook[key];
        this.props.onUpdateCheckoutBook(updatedBook);
        
    }

    computeTotalPrice = () => {
        let totalPrice = 0;
        for(let key in this.props.checkoutBook) {
            totalPrice += this.props.checkoutBook[key].rate
        }
        this.setState({totalPrice: totalPrice})
    }   

    checkout = () => {
        this.props.onBookCheckout(this.props.checkoutBook)
    }

    cancelHandler = () => {
        this.setState({showCancelConfirmation: true})
    }

    cancelCheckout = () => {
        this.props.history.push('/');
    }

    continueCheckout = () => {
        this.setState({showCancelConfirmation: false})
    }

    checkoutHandler = () => {
        this.setState({showCheckoutConfirmation: true})
    }

    backToCheckoutPage = () => {
        this.setState({showCheckoutConfirmation: false})
    }

    transactionDone = () => {
        this.setState({transactionDone: true})
    }


    render() {
        let bookList = null;
        let toast = null;

        if (this.props.checkoutBook) {
            bookList = (
                Object.keys(this.props.checkoutBook).map(key => (
                    <Aux key={key}>
                        <div className={classes.TixContainer}>
                            <div className={classes.LeftTix}>
                                <Logo/>
                                <img className={classes.TixImg} src={soundWave} alt="#"/>
                            </div>
                            <div className={classes.RightTix}>
                                <img className={classes.BandImg} src={bandImg} alt="#"/>
                                <ul className={classes.ScheduleList}>
                                    <li>DATE: <span className={classes.TimeSpan}>{this.props.checkoutBook[key].bookdate}</span></li>
                                    <li>TIME START: <span className={classes.TimeSpan}>{moment(this.props.checkoutBook[key].timeStart, 'HH:mm').format('hh:mm a')}</span></li>
                                    <li>TIME END: <span className={classes.TimeSpan}>{moment(this.props.checkoutBook[key].timeEnd, 'HH:mm').format('hh:mm a')}</span></li>
                                    <li className={classes.RemoveTix} onClick={() => this.deleteBook(key)}>X</li>
                                </ul> 
                            </div>                        
                        </div> 
                                               
                    </Aux>                    
                ))                                
            );                                               
        }

        if (this.state.transactionDone || isEmpty(this.props.checkoutBook) || this.props.isAuthenticated !== true) {   
            bookList =(
                <Redirect to='/'/>
            )
        }

        if (this.state.showCancelConfirmation) {
            toast = (
                <Aux>
                    <Toast backDrop={true} toastType='Toast' onClickBackDrop={this.continueCheckout}>
                        <p className={classes.ToastMessage}>Are you sure you want to cancel?</p>
                        <div className={classes.toastBtnCont}>
                            <Button btnType='ToastButton' btnClass='Success' onClick={this.cancelCheckout}>Yes</Button>
                            <Button btnType='ToastButton' btnClass='Cancel' onClick={this.continueCheckout}>Continue</Button>
                        </div>                        
                    </Toast>                    
                </Aux>
            )
        }

        if (this.state.showCheckoutConfirmation) {
            if (this.props.loading !== true && this.props.bookSuccess !== true) {
                toast = (
                    <Aux>
                        <Toast backDrop={true} toastType='Toast' onClickBackDrop={this.backToCheckoutPage}>
                            <p className={classes.ToastMessage}>Are you sure you want to checkout?</p>
                            <div className={classes.toastBtnCont}>
                                <Button btnType='ToastButton' btnClass='Success' onClick={this.checkout}>Yes</Button>
                                <Button btnType='ToastButton' btnClass='Cancel' onClick={this.backToCheckoutPage}>Cancel</Button>
                            </div>                        
                        </Toast>                    
                    </Aux>
                )
            }
    
            if (this.props.loading === true && this.props.bookSuccess !== true) {
                toast = (
                    <Aux>
                        <Toast backDrop={true} toastType='Toast'>
                            <Spinner/>             
                        </Toast>                    
                    </Aux>
                )
            } 

            if (this.props.loading !== true && this.props.bookSuccess === true) {
                toast = (
                    <Aux>
                        <Toast backDrop={true} toastType='Toast'>
                            <p className={classes.ToastMessage}>Successfully booked!</p>
                            <div className={classes.toastBtnCont}>
                                <Button btnType='ToastButton' btnClass='Success' onClick={this.transactionDone}>OK</Button>
                            </div>      
                        </Toast>                    
                    </Aux>
                )
            } 

            if (this.props.loading !== true && this.props.bookSuccess === false && this.props.error !== null) {
                toast = (
                    <Aux>
                        <Toast backDrop={true} toastType='Toast'>
                            <p className={classes.ToastMessage}>{this.props.error}</p>
                            <div className={classes.toastBtnCont}>
                                <Button btnType='ToastButton' btnClass='Success' onClick={this.transactionDone}>OK</Button>
                            </div>      
                        </Toast>                    
                    </Aux>
                )
            } 

        }
               
        const total = (
            <span>{this.state.totalPrice}</span>
        )

        return (
            <div className={classes.Container}>
                {toast}
                <div className={classes.BgBlend}></div>
                <div className={classes.BookListContainer}>
                    <div className={classes.ListContainer}>
                        {bookList}                                                                
                    </div>
                    <hr/>   
                    <div className={classes.CheckoutBtnCont}>
                        <div className={classes.TotalPriceCont}>
                            <span className={classes.TotalPriceSpan}>Total Price: ₱<span className={classes.Price}>{total}</span></span>
                        </div>                   
                        <div className={classes.CheckoutBtn}>
                            <Button btnClass='Button' btnType='Success' onClick={this.checkoutHandler}>Check Out</Button>
                        </div>                                      
                        <Button btnClass='Button' btnType='Cancel' onClick={this.cancelHandler}>Cancel</Button>
                    </div>                                                                      
                </div> 
                                              
                                              
            </div>
        )
    }
}




const mapStateToProps = (state) => {
    return {
        checkoutBook: state.bookReducer.checkoutBook,                    
        bookSuccess: state.bookReducer.bookSuccess,
        error: state.bookReducer.error,
        isAuthenticated: state.authReducer.token !== null,
        loading: state.bookReducer.loading                    
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateCheckoutBook: (book) => dispatch(actions.updateCheckoutBook(book)),        
        onBookCheckout: (book) => dispatch(actions.bookCheckout(book)),        
        onResetState: () => dispatch(actions.resetState())        
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CheckoutPage));