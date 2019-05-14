import React from 'react';
import List from "./List";


export default class Todo extends React.Component {

    constructor(props) {
        super(props); 
        this.state = {
            term: '',
            items: [],
        }
    }

    onChange = (event) => {
        this.setState({
            term: event.target.value,
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.setState({
            term: '',
            items: [...this.state.items, this.state.term],            
        });
    }
    
    deleteItem = (index,event) => {
        console.log(event);
        console.log(index);
        this.setState({
            items: event.filter((item, i) => index!== i)
        })
    }

    render() {
       return (
            <div>
                <h1> Todo list </h1>
                <form>
                    <input value={this.state.term} onChange={this.onChange} />
                    <button onClick={this.onSubmit}>Submit</button>
                </form>
                <List items={this.state.items} onClick={(index) => {this.deleteItem(index,this.state.items)}}/>
            </div>
        )
    }
}