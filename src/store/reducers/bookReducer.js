import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const initialState = {
    weekSchedule: null,
    weekDates: null,
    renderWeekSched: null,
    loading: false,
    numberOfDays: 7,
    initialDays: 7,
    pageCount: 0,
    selectedSlot: [],
    checkoutBook: null,
    error: null,
    bookSuccess: false,
    myBook: []
}

const updateWeekSched = (state, action) => {
    return updateObject(state, {
        weekSchedule: action.weekSchedule
    })
}

const renderWeekSched = (state, action) => {
    return updateObject(state, {
        renderWeekSched: action.renderWeekSched        
    })
}

const updateNumberOfDays = (state, action) => {
    return updateObject(state, {
        numberOfDays: action.numberOfDays
    })
}

const updateInitialDays = (state, action) => {
    return updateObject(state, {
        initialDays: action.initialDays
    })
}

const updateWeekDates = (state, action) => {
    return updateObject(state, {
        weekDates: action.weekDates
    })
}

const incrementPageCount = (state, action) => {
    return updateObject(state, {
        pageCount: action.pageCount + 1
    })
}

const decrementPageCount = (state, action) => {
    return updateObject(state, {
        pageCount: action.pageCount - 1
    })
}

const resetPageCount = (state, action) => {
    return updateObject(state, {
        pageCount: action.pageCount
    })
}

const fetchBookStart = (state, action) => {
    return updateObject(state, {
        loading: true
    })
}

const fetchBookSuccess = (state, action) => {
    return updateObject(state, {
        weekSchedule: action.weekSchedule,
        loading: false
    })
}

const updateSelectedSlot = (state, action) => {
    return updateObject(state, {
        selectedSlot: action.selectedSlot
    })
}

export const addSelectedSlot = (state, action) => {
    return updateObject(state, {
        selectedSlot: state.selectedSlot.concat(action.slot)
    })    
}

const updateCheckoutBook = (state, action) => {
    return updateObject(state, {
        checkoutBook: action.checkoutBook
    })
}

const bookStart = (state, action) => {
    return updateObject(state, {
        loading: true,
        error: null
    })
}

const bookSuccess = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        bookSuccess: true
    })
}

const bookFailed = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: action.error
    })
}

const resetState = (state, action) => {
    return updateObject(state, {
        loading: false,
        error: null,
        bookSuccess: false,
        selectedSlot: [],
        checkoutBook: null,
    })
}

const updateMyBook = (state, action) => {
    return updateObject(state, {
        myBook: action.myBook
    })
}

const fetchMyBookDone = (state, action) => {
    return updateObject(state, {
        loading: false
    })
}





const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_WEEK_SCHED: return updateWeekSched(state, action);        
        case actionTypes.RENDER_WEEK_SCHED: return renderWeekSched(state, action);        
        case actionTypes.UPDATE_NUM_DAYS: return updateNumberOfDays(state, action);        
        case actionTypes.UPDATE_INIT_DAYS: return updateInitialDays(state, action);        
        case actionTypes.UPDATE_WEEK_DATES: return updateWeekDates(state, action);        
        case actionTypes.INCREMENT_PAGE_COUNT: return incrementPageCount(state, action);        
        case actionTypes.DECREMENT_PAGE_COUNT: return decrementPageCount(state, action);        
        case actionTypes.RESET_PAGE_COUNT: return resetPageCount(state, action);        
        case actionTypes.FETCH_BOOK_START: return fetchBookStart(state, action);        
        case actionTypes.FETCH_BOOK_SUCCESS: return fetchBookSuccess(state, action);        
        case actionTypes.UPDATE_SELECTED_SLOT: return updateSelectedSlot(state, action);        
        case actionTypes.ADD_SELECTED_SLOT: return addSelectedSlot(state, action);        
        case actionTypes.UPDATE_CHECKOUT_BOOK: return updateCheckoutBook(state, action);        
        case actionTypes.BOOK_START: return bookStart(state, action);        
        case actionTypes.BOOK_SUCCESS: return bookSuccess(state, action);        
        case actionTypes.BOOK_FAILED: return bookFailed(state, action);        
        case actionTypes.RESET_STATE: return resetState(state, action);        
        case actionTypes.UPDATE_MY_BOOK: return updateMyBook(state, action);        
        case actionTypes.FETCH_BOOK_DONE: return fetchMyBookDone(state, action);        
        default: return state;
    }
}


export default reducer;