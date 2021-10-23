import React from 'react';
import { getMovies } from '../Services/FakeMovieServices';
import { getGenres } from '../Services/FakeGenreServices';
import MoviesTable from './MoviesTable';
import ListGroup from './Common/ListGroup';
import Pagination from './Common/Pagination';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

export default class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    selectedGenre: null,
    pageSize: 4,
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    const genres = [{ id: '', name: 'All Genres' }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m.id !== movie.id);
    this.setState({ movies });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, selectedGenre, sortColumn, movies: allMovies } = this.state;

    const filtered = selectedGenre && selectedGenre.id ? allMovies.filter((m) => m.genre.id === selectedGenre.id) : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, sortColumn } = this.state;
    if (count === 0) return <p>There are no movie in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <p>Showing {totalCount} movies in the database</p>
          <MoviesTable movies={movies} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />
          <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
