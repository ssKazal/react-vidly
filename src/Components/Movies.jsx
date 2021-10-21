import React from 'react';
import { getMovies } from '../Services/FakeMovieServices';
import { getGenres } from '../Services/FakeGenreServices';
import Like from './Common/Like';
import ListGroup from './Common/ListGroup';
import Pagination from './Common/Pagination';
import { paginate } from '../utils/paginate';

export default class Movies extends React.Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    selectedGenre: null,
    pageSize: 4,
  };

  componentDidMount() {
    const genres = [{ name: 'All Genres' }, ...getGenres()];
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

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, selectedGenre, movies: allMovies } = this.state;
    if (count === 0) {
      return <p>There are no movie in the database.</p>;
    }
    const filtered = selectedGenre && selectedGenre.id ? allMovies.filter((m) => m.genre.id === selectedGenre.id) : allMovies;
    const movies = paginate(filtered, currentPage, pageSize);
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup items={this.state.genres} selectedItem={this.state.selectedGenre} onItemSelect={this.handleGenreSelect} />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentanRate}</td>
                  <td>
                    <Like liked={movie.liked} onLikeToggle={() => this.handleLike(movie)} />
                  </td>
                  <td>
                    <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(movie)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination itemsCount={filtered.length} pageSize={pageSize} currentPage={currentPage} onPageChange={this.handlePageChange} />
        </div>
      </div>
    );
  }
}
