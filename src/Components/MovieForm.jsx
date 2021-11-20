import React from 'react';
import Joi from 'joi';
import Form from './Common/Form';
import { getGenres } from '../Services/GenreService';
import { getMovie, saveMovie } from '../Services/MovieService';

class MovieForm extends Form {
  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    errors: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '' },
    genres: [],
  };

  schemaMap = {
    id: Joi.string(),
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().required().integer().min(0).max(100).label('Number in Stock'),
    dailyRentalRate: Joi.number().required().min(0).max(10).label('Daily Rental Rate'),
  };

  schema = Joi.object(this.schemaMap);

  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
    console.log(genres);
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (!movieId) return;

      const { data: movie } = await getMovie(movieId);
      console.log(movie);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace('/not-found');
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      id: movie.id,
      title: movie.title,
      genreId: movie.genre.id,
      numberInStock: movie.number_in_stock,
      dailyRentalRate: movie.daily_rental_rate,
    };
  }

  doSubmit = async () => {
    // Call the server
    await saveMovie(this.state.data);
    this.props.history.push('/movies');

    console.log('Submitted');
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Ganre', this.state.genres)}
          {this.renderInput('numberInStock', 'Number in Stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate')}
          {this.renderButton('Save')}
        </form>
      </div>
    );
  }
}

export default MovieForm;
