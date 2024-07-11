import React, {Component} from 'react';
import classes from './Calendar.module.scss';
import {connect} from 'react-redux';
// import { useTable } from 'react-table';
import CalendarSlot from './CalendarSlot/CalendarSlot';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import moment from 'moment';
import {GrPrevious, GrNext} from "react-icons/gr";
import BookCheckout from '../../containers/BookCheckout/BookCheckout';


class Calendar extends Component {

    render() {
        let schedule = null;
        if (this.props.schedule) {
            schedule = (
                <table>
                    <thead>
                        <tr>
                            <th>
                                <span>SCHEDULE</span>
                                <div>
                                    <button 
                                        className={classes.PrevBtn} 
                                        onClick={this.props.onClickPrev}><GrPrevious size={20}/></button>
                                    <button 
                                        className={classes.NextBtn}
                                        onClick={this.props.onClickNext}><GrNext size={20}/></button>
                                </div>                                
                            </th>
                            {Object.keys(this.props.weekDates).map(key => (
                                <th className={classes.DateRow} key={key}>{moment(this.props.weekDates[key]).format('ddd')}<br/>{moment(this.props.weekDates[key]).format('MMM-DD')}</th>
                            ))}                            
                        </tr>                        
                    </thead>
                    <tbody>
                        {Object.keys(this.props.schedule[0]).map(key => {
                            return <Aux key={key}>
                                        <tr >
                                            <td className={classes.TimeColumn}>{this.props.schedule[0][key].time}</td>
                                            <CalendarSlot schedule={this.props.schedule} slot={key}/>                                                                                                        
                                        </tr>
                                    </Aux>                                                                                      
                        })}
                    </tbody>
                </table>
            )
        }
        return (
            <Aux>
                 <div className={classes.CalendarContainer}>                      
                    {schedule}
                    <div className={classes.BookCheckoutBtn}>
                        <BookCheckout />
                    </div>                         
                </div> 
                
            </Aux>                             
        )
    }
}

const mapStateToProps = (state) => {
    return {
        weekDates: state.bookReducer.weekDates                    
    }
}


export default connect(mapStateToProps)(Calendar);