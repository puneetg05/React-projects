import React from 'react';
import './../../index.css';
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';
import { Link } from "react-router-dom";

export default class ListContacts extends React.Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired,
    }

    state = {
        query: ''
    }

    updateQuery = (query) => {
        this.setState({
            query: query.trim(),
        });
    }

    clearQuery = () => {
        this.setState({
            query: '',
        })
    }

    render() {
        const {contacts, onDeleteContact} = this.props;
        const {query} = this.state;

        let showingContact;
        if(query) {
            const match = new RegExp(escapeRegExp(query), 'i');
            showingContact = contacts.filter(contact => match.test(contact.name));
        } else {
            showingContact = contacts;
        }

        showingContact.sort(sortBy('name'));

        return (
            <div>
                <h1>Contacts List</h1>
                <div className='list-contacts-top'>
                    <input 
                        className='search-contacts'
                        type='text'
                        placeholder='Search contacts'
                        value={this.state.query}
                        onChange={(event) => this.updateQuery(event.target.value)} />
                    <Link
                      to="/create"
                      className="add-contact">Add Contact</Link>
                </div>
                { showingContact.length !== contacts.length && (
                <div className='showing-contacts'>
                    <span>Now Showing {showingContact.length} of {contacts.length} total</span> <button onClick={this.clearQuery}>Show All</button>    
                </div>
                )}
                <ol className='contact-list'>
                    {showingContact.map((contact) => (
                    <li key={contact.id} className='contact-list-item'>
                        <div className='contact-avatar' style={{
                            backgroundImage: `url(${contact.avatarURL})`
                        }} /> 
                        <div className='contact-details'>
                            <p> {contact.name} </p>
                            <p> {contact.email} </p>
                        </div>
                        <button onClick={() => onDeleteContact(contact)} className='contact-remove'>
                            Remove
                        </button>
                    </li>
                    ))}
                </ol>
            </div>
        );
    }
 
}
