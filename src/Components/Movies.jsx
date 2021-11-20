import React from 'react';
import { getMovies, deleteMovie } from '../Services/MovieService';
import { getGenres } from '../Services/GenreService';
import MoviesTable from './MoviesTable';
import ListGroup from './Common/ListGroup';
import Pagination from './Common/Pagination';
import { paginate } from '../utils/paginate';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBox from './Common/SearchBox';
import { toast } from 'react-toastify';

export default class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    selectedGenre: null,
    pageSize: 4,
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ id: '', name: 'All Genres' }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
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
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleDelete = async (movie) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m.id !== movie.id);
    this.setState({ movies });
    try {
      await deleteMovie(movie.id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        toast.error('Already deleted');
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, selectedGenre, searchQuery, sortColumn, movies: allMovies } = this.state;
    let filtered = allMovies;
    if (searchQuery) filtered = allMovies.filter((m) => m.title.toLowerCase().startsWith(searchQuery.toLowerCase()));
    else if (selectedGenre && selectedGenre.id) filtered = allMovies.filter((m) => m.genre.id === selectedGenre.id);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, searchQuery, sortColumn } = this.state;
    if (count === 0) return <p>There are no movie in the database.</p>;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <Link to="/movies/new" className="btn btn-primary" id="new-movie">
            New Movie
          </Link>
          <p>Showing {totalCount} movies in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <MoviesTable movies={movies} sortColumn={sortColumn} onLike={this.handleLike} onDelete={this.handleDelete} onSort={this.handleSort} />
          <Pagination itemsCount={totalCount} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
