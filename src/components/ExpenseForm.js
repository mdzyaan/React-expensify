import React from 'react';
import moment from 'moment'
import { SingleDatePicker } from 'react-dates';

// const now = moment();
// console.log(now.format())

  
export default class ExpenseForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: props.expense ? props.expense.description :'',
            notes: props.expense ? props.expense.notes :'',
            ammount: props.expense ? (props.expense.ammount / 100).toString() :'',
            createdAt: props.expense ? moment(props.expense.createdAt) : moment(),
            calenderFocused: false,
            error: ''
        };
    } 
    onDescriptionChange = (e) => {
        const description = e.target.value;
        this.setState(() => ({description}))
    }
    onNotesChange = (e) => {
        const notes = e.target.value;
        this.setState(() => ({ notes}))
    }
    onAmmountChange = (e) => {
        const ammount = e.target.value;
        if (!ammount || ammount.match(/^\d{1,}(\.\d{0,2})?$/)) {
            this.setState(() => ({ ammount }))
        }
    }
    onDateChange = (createdAt) => {
        if (createdAt) {
            this.setState(() => ({ createdAt }));
        }
    }
    onFocusChange = ({ focused }) => {
        this.setState(() => ({ calenderFocused: focused }))
    }
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.description || !this.state.ammount) {
            this.setState(() => ({ error: 'please add both description and ammount'}))
        } else {
            this.setState(() => ({ error: ''}))
            this.props.onSubmit({
                description: this.state.description,
                ammount: parseFloat(this.state.ammount, 10) * 100,
                notes: this.state.notes,
                createdAt: this.state.createdAt.valueOf()
            })
        }
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.onSubmit}>
                    <input type="text" placeholder="Description" value={this.state.description} onChange={this.onDescriptionChange}/>
                    <input type="text" placeholder="Ammount" value={this.state.ammount} onChange={this.onAmmountChange}/>
                    <SingleDatePicker 
                        date={this.state.createdAt}
                        onDateChange={this.onDateChange}
                        focused={this.state.calenderFocused}
                        onFocusChange={this.onFocusChange}
                        numberOfMonths={1}
                        isOutsideRange={() => false}
                    />
                    <textarea placeholder="Add a notes" value={this.state.notes} onChange={this.onNotesChange}></textarea>
                    <button>Add Expense</button>
                </form>
             </div>
        )   
    }
}