import React from 'react';
import { Link } from 'react-router-dom';
import BookList from './BookList';

export default class Searchbar extends React.Component {
  constructor() {
    super();    

    this.moveBook = this.moveBook.bind(this);
  }

  moveBook = (book, shelf) => shelf !== 'none' && this.props.moveBook(book, shelf);

  render() {
    return (   
      <div className="search-books">
          <div className="search-books-bar">
            <Link to="/" onClick={this.props.closeSearch}><button className="close-search">Close</button></Link>
            <div className="search-books-input-wrapper">               
              <input onChange={this.props.search} type="text" placeholder="Search by title or author"/>
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {this.props.searchResults !== null && <BookList moveBook={this.moveBook} shelf="Search Results" books={this.props.searchResults} /> }
            </ol>
          </div>
      </div>
    )
  }
}

