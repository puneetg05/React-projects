import React from 'react';
import ReactDom from 'react-dom';
import { Route, Switch, Link } from 'react-router-dom';
import './index.css';
import Game from "./components/TicTacToe/game";
import Todo from "./components/TodoList/Todo";
import ListContacts from "./components/Contacts/ListContacts";
import * as ContactsAPI from "./utils/ContactsAPI.js"
import CreateContact from "./components/Contacts/CreateContact"
import WithLoading from "./components/Loader/Loader";

const ListWithLoading = WithLoading(ListContacts);
const CreateContactWithLoading = WithLoading(CreateContact);

const ROUTES = [
    {
        key: 'contactList',
        value: '/contactlist',
        name: 'Contact List'
    }, 
    {
        key: 'todolist',
        value: '/todoList',
        name: 'Todo List'
    },
    {
        key: 'tictactoe',
        value: '/tictactoe',
        name: 'Tic Tac Toe'
    },
    {
        key: 'recipes',
        value: '/recipes',
        name: 'Recipes'
    }
]

export default class App extends React.Component {
    
    state = {
        loading: false,
        screen: 'list', // list or create
        contacts: []
    }
    
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.setState({loading: true});
        ContactsAPI.getAll().then((contacts) => {
            setTimeout(() => {
                this.setState({ loading: false, contacts });
        }, 1000);
        });
    }

    removeContact = (contact) => {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState((state) => ({
                loading: false,
                contacts: state.contacts.filter((c) => c.id !== contact.id),
            }));
            ContactsAPI.remove(contact);
        }, 1000);
    }

    createContact = (contact) => {
        this.setState({loading: true});
        ContactsAPI.create(contact).then(contact => {
            setTimeout(() => {
                this.setState(state => ({
                    loading: false,
                    contacts: state.contacts.concat([contact]),
                }));
            }, 1000);
            console.log(this.state);
        });
    }

    render() {
        return (
            <Switch>
                <Route exact path="/" render = {() => (
                    <ol>
                        {
                            ROUTES.map((route) => 
                            <li> <Link id={route.key} to={route.value}>{route.name}</Link> </li>
                            )
                        }
                    </ol> 
                )} />
                <Route exact path="/tictactoe" component={Game} />
                <Route exact path="/todolist" component={Todo} />
                {/* <Route exact path='/' render = {() => (
                    <ListContacts 
                        onDeleteContact={this.removeContact} 
                        contacts = {this.state.contacts}
                    />
                )} /> */}
                <Route exact path='/contactList' render = {() => (
                    <ListWithLoading isLoading = {this.state.loading} onDeleteContact={this.removeContact}  contacts = {this.state.contacts} />
                )} />
                {/* <Route path="/create" render={({ history }) => (
                    < CreateContact 
                        onCreateContact={(contact) => {
                            this.createContact(contact);
                            history.push('/');
                        }}
                    />
                )}/> */}
                <Route exact path="/create" render={({ history }) => (
                    < CreateContactWithLoading 
                        isLoading = {this.state.loading}
                        onCreateContact = {(contact) => {
                            this.createContact(contact);
                            history.push('/contactList');
                        }}
                    />
                )}/>
            </Switch>
        );
    }
}
