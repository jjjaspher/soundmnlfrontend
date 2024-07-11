import * as actionTypes from './actionTypes';
import axios from 'axios';
import moment from 'moment';


// const serverURL = 'http://localhost:3030/api/book';
const serverURL = 'https://soundmnlbackend.onrender.com/api/book';


export const updateWeekSchedule = (weekSchedule) => {
    return {
        type: actionTypes.UPDATE_WEEK_SCHED,
        weekSchedule: weekSchedule
    };
};

export const renderWeekSched = (renderWeekSchedule) => {
    return {
        type: actionTypes.RENDER_WEEK_SCHED,
        renderWeekSched: renderWeekSchedule
    };
};

export const updateNumberOfDays = (numberOfDays) => {
    return {
        type: actionTypes.UPDATE_NUM_DAYS,
        numberOfDays: numberOfDays
    };
};

export const updateInitialDays = (initialDays) => {
    return {
        type: actionTypes.UPDATE_INIT_DAYS,
        initialDays: initialDays
    };
};

export const updateWeekDates = (weekDates) => {
    return {
        type: actionTypes.UPDATE_WEEK_DATES,
        weekDates: weekDates
    };
};

export const incrementPageCount = (pageCount) => {
    return {
        type: actionTypes.INCREMENT_PAGE_COUNT,
        pageCount: pageCount         
    };
}

export const decrementPageCount = (pageCount) => {
    return {
        type: actionTypes.DECREMENT_PAGE_COUNT,
        pageCount: pageCount        
    };
};

export const resetPageCount = () => {
    return {
        type: actionTypes.RESET_PAGE_COUNT,
        pageCount: 0        
    };
}

export const fetchBookStart = () => {
    return {
        type: actionTypes.FETCH_BOOK_START
    }
}

export const fetchBookSuccess = (weekSchedule) => {
    return {
        type: actionTypes.FETCH_BOOK_SUCCESS,
        weekSchedule: weekSchedule
    }
}


export const updateSelectedSlot = (selectedSlot) => {
    return {
        type: actionTypes.UPDATE_SELECTED_SLOT,
        selectedSlot: selectedSlot
    }
}

export const addSelectedSlot = (slot) => {
    return {
        type: actionTypes.ADD_SELECTED_SLOT,
        slot: slot
    }
}

export const updateCheckoutBook = (checkoutBook) => {
    return {
        type: actionTypes.UPDATE_CHECKOUT_BOOK,
        checkoutBook: checkoutBook
    }
}

export const bookStart = () => {
    return {
        type: actionTypes.BOOK_START
    }
}

export const bookSucces = () => {
    return {
        type: actionTypes.BOOK_SUCCESS
    }
}

export const bookFailed = (error) => {
    return {
        type: actionTypes.BOOK_FAILED,
        error: error
    }
}

export const resetState = () => {
    return {
        type: actionTypes.RESET_STATE        
    }
}

export const updateMyBook = (myBook) => {
    return {
        type: actionTypes.UPDATE_MY_BOOK,
        myBook: myBook
    }
}

export const fetchMybookDone = () => {
    return {
        type: actionTypes.FETCH_BOOK_DONE
    }
}

export const bookCheckout = (params) => {
    return dispatch => {
        dispatch(bookStart())
        axios.post(serverURL + '/book', params)
        .then(oResponse => {
            dispatch(bookSucces())
        })
        .catch(err => {
            const error = 'Something went wrong...'
            dispatch(bookFailed(error))
            console.log(err)
        })
    }
}

export const getBookByRange = (startDay, endDay) => {
    return dispatch => {
        dispatch(fetchBookStart());        
        const startdate = moment(startDay).format('MM-DD-YYYY');
        const enddate = moment(endDay).format('MM-DD-YYYY');
                                             
        axios.get(serverURL + '/range?date_start=' + startdate + '&date_end=' + enddate)
        .then(oResponse => {
            //dispatch success
            dispatch(fetchBookSuccess(oResponse.data))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getBookByUser = (userId, token) => {
    return dispatch => {
        dispatch(fetchBookStart());
        const headers = {
            Authorization : `Bearer ${token}`
        }
        axios.get(serverURL + '/book/' + userId, {headers: headers})
        .then(oResponse => {            
            dispatch(updateMyBook(oResponse.data))
            dispatch(fetchMybookDone())
        })
        .catch(err => {
            console.log(err)
        })
    }
}
