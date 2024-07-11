import React, {Component} from 'react';
import classes from './BookContent.module.scss';
import moment from 'moment';
import {connect} from 'react-redux';
import Calendar from '../../components/Calendar/Calendar';
import * as actions from '../../store/actions/bookAction';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Spinner from '../../components/UI/Spinner/Spinner';



class BookContent extends Component {

    state = {
        schedule: {
            slot1: {
                time: '10:00am - 11:00am',
                timeStart: '10:00',
                timeEnd: '11:00',
                slotNumber: 1,
                available: true,
                date: null
            },
            slot2: {
                time: '11:00am - 12:00pm',
                timeStart: '11:00',
                timeEnd: '12:00',
                slotNumber: 2,
                available: true,
                date: null
            },
            slot3: {
                time: '12:00pm - 01:00pm',
                timeStart: '12:00',
                timeEnd: '13:00',
                slotNumber: 3,
                available: true,
                date: null
            },
            slot4: {
                time: '01:00pm - 02:00pm',
                timeStart: '13:00',
                timeEnd: '14:00',
                slotNumber: 4,
                available: true,
                date: null
            },
            slot5: {
                time: '02:00pm - 03:00pm',
                timeStart: '14:00',
                timeEnd: '15:00',
                slotNumber: 5,
                available: true,
                date: null
            },
            slot6: {
                time: '03:00pm - 04:00pm',
                timeStart: '15:00',
                timeEnd: '16:00',
                slotNumber: 6,
                available: true,
                date: null
            },
            slot7: {
                time: '04:00pm - 05:00pm',
                timeStart: '16:00',
                timeEnd: '17:00',
                slotNumber: 7,
                available: true,
                date: null
            },
            slot8: {
                time: '05:00pm - 06:00pm',
                timeStart: '17:00',
                timeEnd: '18:00',
                slotNumber: 8,
                available: true,
                date: null
            },
            slot9: {
                time: '06:00pm - 07:00pm',
                timeStart: '18:00',
                timeEnd: '19:00',
                slotNumber: 9,
                available: true,
                date: null
            }
        }
    }
   
    componentDidMount () {    
        this.updateSelectedSlotUserId();              
        this.getScheduleHandler();
        this.getWindowWidth()
        window.addEventListener("resize", this.getWindowWidth.bind(this));             
    }

    componentDidUpdate(prevProps) {        
        if (this.props.weekSchedule !== prevProps.weekSchedule) {
            this.buildWeekScheduleHandler();
        }                
    }

    getWindowWidth = async () => {   
        const width = document.body.clientWidth;        
        if (width < 600 && this.props.initialDays !== 3)  {
            await this.props.onResetState()
            await this.props.onResetPageCount()
            await this.props.onUpdateNumberOfDays(3)
            await this.props.onUpdateInitialDays(3)
            await this.getScheduleHandler();            
        }
        if (width > 600 && this.props.initialDays !== 7) {
            await this.props.onResetState()
            await this.props.onResetPageCount()
            await this.props.onUpdateNumberOfDays(7)
            await this.props.onUpdateInitialDays(7)  
            await this.getScheduleHandler(); 
        }             
    }

    getScheduleHandler = async () => {
        const weekDates = await this.getWeekDates();
        const weekLength = weekDates.length - 1;
        this.props.onUpdateWeekDates(weekDates);
        this.props.onGetBookRange(weekDates[0], weekDates[weekLength]);
    }

    getWeekDates = () => {
        const offsetDay = this.props.pageCount * this.props.initialDays;
        const dateNow = new Date();
        const startDay = dateNow.getDay() + offsetDay;
        const endDay = dateNow.getDay() + this.props.numberOfDays; 
        let weekDates = [];
        for(let i = startDay; i < endDay; i++) {
            const date = moment().day(i);
            const formattedDate = moment(date).format('YYYY-MM-DD');
            weekDates.push(formattedDate);
        }
        return weekDates;       
    }

    buildWeekScheduleHandler = () => {
        const weekDates = this.props.weekDates; 
        let schedule = []
        let daySchedule = null;       
        for (let key in weekDates) {
            daySchedule = this.buildSlotHandler(weekDates[key])
            schedule.push(daySchedule)                                                                  
        }
        this.props.onrenderWeekSched(schedule);
    }

    buildSlotHandler = (date) => {
        let slot = {...this.state.schedule}
        for (let key in slot)  {
            let avalability = this.checkAvailability(date, slot[key].timeStart) ? false : true;           
            slot = {
                ...slot, 
                [key] : {
                    ...slot[key], ...{
                        date: date,
                        available: avalability 
                    }                    
                }                
            }                                            
        }
        return slot;                             
    }

    checkAvailability = (date, time) => {    
        const weekSchedule = {...this.props.weekSchedule}; 
        const dateToday = moment(new Date()).format('YYYY-MM-DD');
        const currentTime = moment(new Date()).format('HH:mm');
        if (dateToday === date && currentTime > time) {            
            return true;
        }           
        for (let key in weekSchedule) { 
                   
            if (weekSchedule[key].bookdate === date && weekSchedule[key].time_start === time) {
                return true; 
            }                   
        }
    } 
    
    nextWeek = async () => {
        const NumberOfDays = this.props.numberOfDays + this.props.initialDays;
        await this.props.onIncrementPageCount(this.props.pageCount);        
        await this.props.onUpdateNumberOfDays(NumberOfDays);
        await this.getScheduleHandler();        
    }

    prevWeek = async () => {
        if (this.props.pageCount === 0) {
            return;
        }
        const NumberOfDays = this.props.numberOfDays - this.props.initialDays;
        await this.props.onDecrementPageCount(this.props.pageCount);        
        await this.props.onUpdateNumberOfDays(NumberOfDays);
        await this.getScheduleHandler();
    }
    
    updateSelectedSlotUserId = () => {
        if (this.props.isAuthenticated && this.props.selectedSlot) {
            const selectedSlot = [...this.props.selectedSlot];
            for(let key in selectedSlot) {
                selectedSlot[key].userId = this.props.userId
            }
            this.props.onUpdateSelectedSlot(selectedSlot)            
        }        
    }


    render () {  
        let calendar = <Spinner/>;
        if (this.props.renderWeekSched !== null) {        
            calendar = (
                <Calendar  
                        onClickPrev={this.prevWeek} 
                        onClickNext={this.nextWeek} 
                        schedule={this.props.renderWeekSched} />
            )
        }             
        return (
            <Aux>
                <div className={classes.ContentContainer}>
                    {calendar}                                                
                </div>
            </Aux>            
        );
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.bookReducer.loading,
        token: state.authReducer.token,
        weekSchedule: state.bookReducer.weekSchedule,
        weekDates: state.bookReducer.weekDates,
        renderWeekSched: state.bookReducer.renderWeekSched,
        numberOfDays: state.bookReducer.numberOfDays,
        initialDays: state.bookReducer.initialDays,
        pageCount: state.bookReducer.pageCount,
        selectedSlot: state.bookReducer.selectedSlot,
        isAuthenticated: state.authReducer.token !== null,                     
        userId: state.authReducer.userId                   
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateWeekDates: (weekDates) => dispatch(actions.updateWeekDates(weekDates)),
        onGetBookRange: (startDate, endDate) => dispatch(actions.getBookByRange(startDate, endDate)),
        onrenderWeekSched: (weekSched) => dispatch(actions.renderWeekSched(weekSched)),
        onIncrementPageCount: (pageCount) => dispatch(actions.incrementPageCount(pageCount)),
        onDecrementPageCount: (pageCount) => dispatch(actions.decrementPageCount(pageCount)),
        onResetPageCount: () => dispatch(actions.resetPageCount()),
        onUpdateNumberOfDays: (numDays) => dispatch(actions.updateNumberOfDays(numDays)),
        onUpdateInitialDays: (numDays) => dispatch(actions.updateInitialDays(numDays)),
        onUpdateSelectedSlot: (selectedSlot) => dispatch(actions.updateSelectedSlot(selectedSlot)),
        onResetState: () => dispatch(actions.resetState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookContent);