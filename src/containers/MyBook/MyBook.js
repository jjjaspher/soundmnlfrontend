import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import * as actions from '../../store/actions/bookAction';
import {isEmpty} from '../../store/utility';
import {connect} from 'react-redux';
import bandImg from '../../assets/images/band.png';
import soundWave from '../../assets/images/soundwave.gif';
import classes from './MyBook.module.scss';
import moment from 'moment';
import Logo from '../../components/UI/Logo/Logo';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class MyBook extends Component {
    componentDidMount() {
        if (this.props.userId !== null) {
            this.props.onFetchMyBook(this.props.userId, this.props.token)            
        }        
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.userId !== this.props.userId && this.props.userId !== null) {
            this.props.onFetchMyBook(this.props.userId, this.props.token)
        }
        if (prevProps.myBook !== this.props.myBook) {
            this.renderMybook();
        }
        
    }

    renderMybook = () => {
        this.props.myBook.sort((aBook, bBook) => {
            if (Date.parse(aBook.bookdate) > Date.parse(bBook.bookdate)) {
                return -1
            }
            if (Date.parse(aBook.bookdate) < Date.parse(bBook.bookdate)) {
                return 1
            }
            return 0
        })
    }

    validateTix = (date) => {
        const today = new Date();
        if (Date.parse(date) > today) {
            return 'NewTix';
        }
        return 'OldTix';
    }

    render() {
        let booklist = <Spinner/>;
        if (this.props.loading !== true) {
            if (isEmpty(this.props.myBook) !== true) {
                booklist = (
                    Object.keys(this.props.myBook).map(key => (
                        <Aux key={key}>
                            <div className={classes.TixContainer}>
                                <div className={[classes.LeftTix, classes[this.validateTix(this.props.myBook[key].bookdate)]].join(' ')}>
                                    <div className={classes.LogoContainer}><Logo/></div>                                   
                                    <img className={classes.TixImg} src={soundWave} alt="#"/>
                                </div>
                                <div className={[classes.RightTix, classes[this.validateTix(this.props.myBook[key].bookdate)]].join(' ')}>
                                    <img className={classes.BandImg} src={bandImg} alt="#"/>
                                    <ul className={classes.ScheduleList}>
                                        <li>DATE: <span className={classes.TimeSpan}>{this.props.myBook[key].bookdate}</span></li>
                                        <li>TIME START: <span className={classes.TimeSpan}>{moment(this.props.myBook[key].time_start, 'HH:mm').format('hh:mm a')}</span></li>
                                        <li>TIME END: <span className={classes.TimeSpan}>{moment(this.props.myBook[key].time_end, 'HH:mm').format('hh:mm a')}</span></li>                                    
                                        <li>REF CODE: <span className={classes.TimeSpan}>{this.props.myBook[key].ref_code}</span></li>                                    
                                    </ul> 
                                </div>                        
                            </div>                                                
                        </Aux>                    
                    ))  
                );
            } else {
                booklist = (
                    <Aux>
                        <div className={classes.NoRecordCont}>
                            <h1>NO RECORD FOUND</h1>
                        </div>                
                    </Aux>
                );
            } 
        }     
        let authorized = null;
        if (this.props.isAuthenticated !== true) {   
            authorized = (
                <Redirect to='/'/>
            )
        }
        
       
        return (
            <div className={classes.MainContainer}>
                {authorized}
                <div className={classes.MyBookContainer}>
                    {booklist}
                </div>                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.authReducer.userId,
        token: state.authReducer.token,
        loading: state.bookReducer.loading,
        myBook: state.bookReducer.myBook,
        isAuthenticated: state.authReducer.token !== null,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        onFetchMyBook: (userId, token) => dispatch(actions.getBookByUser(userId, token))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyBook);