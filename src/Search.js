import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class Search extends React.Component {
    static propTypes = {
        onBookMove: PropTypes.func.isRequired,
        books: PropTypes.array.isRequired
    }

    state = {
        query: '',
        foundBooks: []
    }

    updateQuery = (query) => {
        if (query) {
            this.setState({ query: query })
            BooksAPI.search(query).then(result => {
                this.setState({ foundBooks: result });
                if (!result.error) {
                    this.state.foundBooks.map(book => (this.props.books.filter((b) => b.id === book.id).map(b => book.shelf = b.shelf)));
                }
                this.setState({ foundBooks: this.state.foundBooks });
            })
        } else {
            this.setState({ query: '', foundBooks: [] });
        }
    }

    render() {
        const { query, foundBooks } = this.state;
        

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/'>Close</Link>
                    <div className="search-books-input-wrapper">
                        { }
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {!foundBooks.error ?
                            foundBooks.map(item =>
                            <Book
                                key={item.id}
                                book={item}
                                onBookMove={this.props.onBookMove} />
                            ) : ( 
                                <li>Book not found.</li>
                                )}
                    </ol>
                </div>
            </div>
            )
    }
}

export default Search
