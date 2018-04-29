import React from 'react';
import Shelf from './Shelf';
import Search from './Search';
import './App.css';
import * as BooksAPI from './BooksAPI';
import { Route, Link } from 'react-router-dom';

class BooksApp extends React.Component {
  state = {
      books: []
    }

    componentDidMount() {
        BooksAPI.getAll()
            .then((books) => {
                this.setState({ books })
        })
    }

    updateShelf = (book, shelf) => {
        BooksAPI.update(book, shelf)
            .then(() => {
                book.shelf = shelf;
                this.setState(state => ({
                    books: state.books
                        .filter(b => b.id !== book.id)
                        .concat([book])
                }))
            })
    }

    getShelfBooks = (shelf) => {
        return this.state.books.filter(b => b.shelf === shelf)
    }

    render() {
        const shelves = [
            { type: 'currentlyReading', name: 'Currently Reading' },
            { type: 'wantToRead', name: 'Want to Read' },
            { type: 'read', name: 'Read' }
        ]

        return (
        <div className="app">
                <Route path='/search' render={(history) => (
                    <Search
                        onBookMove={this.updateShelf}
                        books={this.state.books}
                    />
                )}
                />
                <Route exact path='/' render={() => ( 
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                {shelves.map(shelf =>
                                    <Shelf
                                        name={shelf.name}
                                        onBookMove={this.updateShelf}
                                        books={this.getShelfBooks(shelf.type)}
                                        key={shelf.type}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to='/search'>Add a book</Link>
                        </div>
                    </div>
                    )}
                    />         
      </div>
    )
  }
}

export default BooksApp
