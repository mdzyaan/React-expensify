import {createStore } from 'redux'


const incrementBy = ({incrementBy = 1} = {}) => ({
    type: 'INCREMENT',
    incrementBy
})
const decrementBy = ({decrementBy = 1} = {}) => ({
    type: 'DECREMENT',
    decrementBy
})

const reset = () => ({
    type: 'RESET',
});

const set = ({count}) => ({
    type: 'SET',
    count
});
const countReducer = (state = { count : 0}, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return {
                count: state.count + action.incrementBy
            };
        case 'DECREMENT':
            return {
                count: state.count - action.decrementBy
            };
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
}
const store = createStore(countReducer);
store.subscribe(() => {
    console.log(store.getState())
})
store.dispatch(incrementBy())

store.dispatch(incrementBy({incrementBy: 50}))

store.dispatch(reset())

store.dispatch(set({count: 200}))

store.dispatch(decrementBy({decrementBy:100}))