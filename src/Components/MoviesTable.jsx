import React from 'react';
import { Link } from 'react-router-dom';
import Like from './Common/Like';
import Table from './Common/Table';

class MoviesTable extends React.Component {
  columns = [
    { path: 'title', label: 'Title', content: (movie) => <Link to={`/movies/${movie.id}`}>{movie.title}</Link> },
    { path: 'genre.name', label: 'Genre' },
    { path: 'number_in_stock', label: 'Stock' },
    { path: 'daily_rental_rate', label: 'Rate' },
    { key: 'like', content: (movie) => <Like liked={movie.liked} onLikeToggle={() => this.props.onLike(movie)} /> },
    {
      key: 'delete',
      content: (movie) => (
        <button className="btn btn-danger btn-sm" onClick={() => this.props.onDelete(movie)}>
          Delete
        </button>
      ),
    },
  ];
  render() {
    const { movies, onSort, sortColumn } = this.props;

    return <Table columns={this.columns} data={movies} sortColumn={sortColumn} onSort={onSort} />;
  }
}

export default MoviesTable;
