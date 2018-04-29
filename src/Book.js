import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onBookMove: PropTypes.func.isRequired
    }

    updateBookShelf = (shelf) => {
        this.props.onBookMove(this.props.book, shelf);
    }

    render() {
        const img = this.props.book.imageLinks ? this.props.book.imageLinks.smallThumbnail : null;
        const authorsArray = this.props.book.authors ? this.props.book.authors : [];
        const title = this.props.book.title;
        const coverStyle = {
            width: 128,
            height: 163,
            backgroundImage: 'url(' + img + ')',
        };

        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={coverStyle}></div>
                        <div className="book-shelf-changer">
                            <select value={this.props.book.shelf ? this.props.book.shelf : 'none'} onChange={(e) => this.updateBookShelf(e.target.value)}>
                                <option value="#" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{title}</div>
                    {authorsArray.map(author =>
                        <div className="book-authors" key={author}>{author}</div>
                        )}
                </div>
            </li>
            )
    }
}

export default Book;
