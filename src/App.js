import React from 'react';
import {Route} from 'react-router-dom';
import Dashboard from './Dashboard';
import Searchbar from './Searchbar';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  constructor() {
    super();

    this.state = {
      bookshelf: {},
      searchResults: []
    };

    this.moveBook = this.moveBook.bind(this);
    this.search = this.search.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  componentDidMount() {
    let bookshelf = [];
    
    BooksAPI.getAll().then(books => {
      let filter = books => shelf => books.filter(b => {
        return b.shelf === shelf;
      });

      const filterBy = filter(books);

      bookshelf.currentlyReading = filterBy("currentlyReading");
      bookshelf.wantToRead = filterBy("wantToRead");
      bookshelf.read = filterBy("read");
 
      this.setState({
        bookshelf
      })
    })
  }

  search(e) {
    let query = e.target.value;

    if (query) {
      BooksAPI.search(query).then(res => {

        if (res.length > 0) {
          const allBooks = [...this.state.bookshelf.currentlyReading, 
            ...this.state.bookshelf.wantToRead,
            ...this.state.bookshelf.read];

          for(const newBook of res) {        
            let matchedBook = allBooks.find(book => book.id === newBook.id);

            if (matchedBook)
              newBook.shelf = matchedBook.shelf;
          }

          this.setState({
            searchResults: res 
          })
        }
      })
    } else {
      this.setState({
        searchResults: null 
      })
    }
  }

  closeSearch() {
    this.setState({ 
      showSearchPage: false,
      searchResults: null 
    });
  }  

  moveBook(book, newShelf) {        
    BooksAPI.update(book, newShelf).then(resp => {        
      let bookshelf = [];    
      const allBooks = [...this.state.bookshelf.currentlyReading, 
                        ...this.state.bookshelf.wantToRead,
                        ...this.state.bookshelf.read];
      
      let movedBook = allBooks.find(movedBook => movedBook.id === book.id);

      if (movedBook) {
        movedBook.shelf = newShelf;
        let findBook = bookID => allBooks.find(book => book.id === bookID);
      
        bookshelf.currentlyReading = resp.currentlyReading.map(bookID => findBook(bookID));
        bookshelf.wantToRead = resp.wantToRead.map(bookID => findBook(bookID));
        bookshelf.read = resp.read.map(bookID => findBook(bookID));

        this.setState({
          bookshelf
        })  
      } else {
          book.shelf = newShelf;
          bookshelf = {...this.state.bookshelf};

          bookshelf[newShelf].push(book)
        
          this.setState({
            bookshelf
          })
      }        
    });    
  }

  render() {
    return (      
      <div className="app">
        <Route exact path='/' render={() => (
          <Dashboard moveBook={this.moveBook} bookshelf={this.state.bookshelf} />
        )}/>

        <Route path='/search' render={() => (
          <Searchbar search={this.search} searchResults={this.state.searchResults} closeSearch={this.closeSearch}
                     moveBook={this.moveBook} />
          
        )}/>
      </div>
    )
  }
}

export default BooksApp