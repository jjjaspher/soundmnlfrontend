import React, {Component} from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import classes from './CalendarSlot.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../../store/actions/bookAction';

class CalendarSlot extends Component {
    state = {
        rate: 500
    }   

    selectSlotHandler = (event, slot) => {   
        if (slot.available !== true) {
            return
        }
        const bookDetails = {
            bookdate: slot.date,
            timeStart: slot.timeStart,
            timeEnd: slot.timeEnd,
            rate: this.state.rate,
            userId: this.props.userId
        }
        this.validateClassSlot(event);
        
        this.validateSelectedSlot(bookDetails)
    }   
    
    validateClassSlot = (event) => {
        const currentClass = event.target.className;       
        if (currentClass.includes(classes.Selected)) {
            event.target.className = currentClass.replace(' ' + classes.Selected, '');
        } else {
            event.target.className = currentClass.concat(' ', classes.Selected)
        }
    }

    validateSelectedSlot = (bookDetails) => {
        const oResult = this.props.selectedSlot.find(book => {
            return book.bookdate === bookDetails.bookdate && book.timeStart === bookDetails.timeStart;
        })
        if (oResult) {
            const updatedSelected = this.props.selectedSlot.filter(sel => {
                return !(sel.bookdate === oResult.bookdate && sel.timeStart === oResult.timeStart)
            })
            
            this.props.onUpdateSelectedSlot(updatedSelected)
            
        } else {
            this.props.onAddSelectedSlot(bookDetails)
        }
        
    }

    validateIsSelected = (isAvailable, slot) => {
        let slotClassName = [classes.CalendarSlot];       
        isAvailable ? slotClassName.push(classes.Available) : slotClassName.push(classes.NotAvailable);
        if (this.props.selectedSlot.length === 0) {
            return slotClassName.join(' ');            
        }
        const bResult = this.props.selectedSlot.find(selectedSlot => {
            return (slot.date === selectedSlot.bookdate && slot.timeStart === selectedSlot.timeStart)                                         
        })
         
        if (bResult && isAvailable === true) {
            slotClassName.push(classes.Selected)
        }
        return slotClassName.join(' ');                              
    }

    

    render() {
        let schedule = (
            Object.keys(this.props.schedule).map(key => {
                const isAvailable = this.props.schedule[key][this.props.slot].available;
                return (
                    <td key={key}
                        className={this.validateIsSelected(isAvailable, this.props.schedule[key][this.props.slot])}
                        onClick={(event) => this.selectSlotHandler(event, this.props.schedule[key][this.props.slot])}>
                    </td>
                )
            })        
        )
        return (
            <Aux>
                {schedule}
            </Aux>
        )
    }

    
}

const mapStateToProps = (state) => {
    return {
        selectedSlot: state.bookReducer.selectedSlot,                    
        userId: state.authReducer.userId                            
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateSelectedSlot: (selectedSlot) => dispatch(actions.updateSelectedSlot(selectedSlot)),
        onAddSelectedSlot: (selectedSlot) => dispatch(actions.addSelectedSlot(selectedSlot)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CalendarSlot);
