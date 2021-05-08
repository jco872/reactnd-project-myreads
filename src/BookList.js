import React from 'react'
import SelectBox from './SelectBox';

export default function BookList(props) {
    let books = null;

    if (props.books !== undefined) {
        books = props.books.map(book => {
            let authors = null;
            let backgroundImage = null;

            if (book.imageLinks) {
                backgroundImage = book.imageLinks.thumbnail;
            }

            if (book.authors !== undefined) {
                authors = book.authors.map(author => <div key={author} className="book-authors">{author}</div> );
            }

            return (
                <li key={book.id}>
                    <div className="book">
                        <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${backgroundImage})` }}></div>
                            <div className="book-shelf-changer">
                                <SelectBox shelf={book.shelf} book={book} moveBook={props.moveBook} />
                            </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">
                            {authors}
                        </div>
                    </div>
                </li>
            );
        });
    }

    return (
        <div className="bookshelf">
        <h2 className="bookshelf-title">{props.shelf}</h2>
        <div className="bookshelf-books">
        <ol className="books-grid">            
            {books}
        </ol>
        </div>
    </div>
    )
}