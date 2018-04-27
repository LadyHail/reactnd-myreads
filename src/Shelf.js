import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

class Shelf extends React.Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        name: PropTypes.string.isRequired,
        onBookMove: PropTypes.func.isRequired
    }

    render() {
        return (
                <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.name}</h2>
                    <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((item) =>
                            <Book
                                key={item.id}
                                book={item}
                                onBookMove={this.props.onBookMove} />
                            )}
                        </ol>
                    </div>
                </div>
            )
    }
}

export default Shelf;