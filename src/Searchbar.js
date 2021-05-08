import React from 'react'
import BookList from './BookList'

export default class Searchbar extends React.Component {
  constructor() {
    super();    

    this.moveBook = this.moveBook.bind(this);
  }

  moveBook = (book, shelf) => this.props.moveBook(book, shelf);

  render() {
    return (   
      <div className="search-books">
          <div className="search-books-bar">
            <button className="close-search" onClick={this.props.closeSearch}>Close</button>
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