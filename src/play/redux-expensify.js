import { createStore, combineReducers } from 'redux'
import uuid from 'uuid';
// ADD EXPENSE
const addExpense = (
    { description = '', 
    note = '', 
    createdAt = 0, 
    ammount = 0
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
        id: uuid(),
        description,
        note,
        createdAt,
        ammount
    }
})

const removeExpense = ({id} = {}) => ({
    type: 'REMOVE_EXPENSE',
    id,
});

const editExpense = (id, update) => ({
    type: 'EDIT_EXPENSE',
    id,
    update
});


const expenseReducerDefaultState = [];

const expenseReducer = ( state = expenseReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [
                ...state,
                action.expense
            ]
        case 'REMOVE_EXPENSE':
            return state.filter(({id}) => id !== action.id);
        case 'EDIT_EXPENSE':
            
            return state.map((expense) => {
                if (expense.id === action.id) {
                    const newexpense = {
                        ...expense,
                        ...action.update
                    }
                    return newexpense
                } else {
                    expense
                }
            })
        default:
            return state
    }
};

const setTextFilter = (text = '') => ({
    type: 'SET_TEXT_FILTER',
    text,
})

const sortByAmmount = () => ({
    type: 'SORT_BY_AMMOUNT',
    sortBy: 'ammount',
});

const sortByDate = () => ({
    type: 'SORT_BY_DATE',
    sortBy: 'date',
});

const setStartDate = (date = undefined) => ({
    type: 'SET_START_DATE',
    date,
})

const setEndDate = (date = undefined) => ({
    type: 'SET_END_DATE',
    date,
})

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
}

const filterReducer = (state = filterReducerDefaultState, action) => {
    switch (action.type) {
        case 'SET_TEXT_FILTER':
            return {
                ...state,
                text : action.text
            }
        case 'SORT_BY_AMMOUNT':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SORT_BY_DATE':
            return {
                ...state,
                sortBy: action.sortBy
            }
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.date,
            }
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.date,
            }
        default:
            return state
    }
}

const getvisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {
    return expenses.filter((expense) => {
        const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;

        const endDateMatch = typeof startDate !== 'number' ||  expense.createdAt <= endDate ;

        const textMatch = true //text === undefined ? true :  expense.description.toLowerCase().includes(text.toLowerCase());
        return startDateMatch && endDateMatch && textMatch;
    }).sort((a, b) => {
        if (sortBy === 'date') {
            return a.createdAt < b.createdAt ? 1 : -1;
        } else if (sortBy == 'ammount') {
            return a.ammount < b.ammount ? 1 : -1;
        }
    }) 
}
const store = createStore(
    combineReducers({
        expense: expenseReducer,
        filter: filterReducer
    })
);

store.subscribe(() => {
    const state = store.getState();
    const visibleExpenses = getvisibleExpenses(state.expense, state.filter);
    //console.log(visibleExpenses)
})


const itemOne = store.dispatch(addExpense({description : 'Rent', ammount: 1000, createdAt: -11000}))

const itemTwo = store.dispatch(addExpense({description : 'Coffee', ammount: 10000, createdAt: -1000}))


// store.dispatch(removeExpense({ id: itemOne.expense.id  }))
console.log('STORE',store.getState())
store.dispatch(editExpense( itemTwo.expense.id, {ammount:500}));



// store.dispatch(setTextFilter('e'));
// store.dispatch(setTextFilter());

//store.dispatch(sortByAmmount())
// store.dispatch(sortByDate())

//store.dispatch(setStartDate(-1000));
//store.dispatch(setEndDate(0));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());
const demoState = {
    expense: [{
        id: 'afdsafsdasdf',
        description: 'January Rent',
        notes: 'This is the dummy note for the rent which is optional',
        ammount: 55400,
        createdAt: 0
    }],
    filters: {
        text: 'rent',
        sortBy: 'ammount',
        startDate: undefined,
        endDate: undefined
    }
};

