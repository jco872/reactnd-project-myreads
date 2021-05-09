import React from 'react';
import BookList from './BookList';
import {Link} from 'react-router-dom';

export default (props) => (
    <div className="list-books">
        <div className="list-books-title">
        <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
        <div>
            <BookList moveBook={props.moveBook} shelf="Currently Reading" books={props.bookshelf.currentlyReading} />
            <BookList moveBook={props.moveBook} shelf="Want to Read" books={props.bookshelf.wantToRead} />
            <BookList moveBook={props.moveBook} shelf="Read" books={props.bookshelf.read} />
        </div>
        </div>
        <div className="open-search">
        <Link to='/search'>                
            <button>Add a book</button>
        </Link>
        </div>
    </div>
);
