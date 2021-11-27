import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './Components/Movies';
import './App.css';
import NavBar from './Components/Common/NavBar';
import Home from './Components/Home';
import Products from './Components/Products';
import ProductDetails from './Components/ProductDetails';
import Posts from './Components/Posts';
import NotFound from './Components/NotFound';
import Dashboard from './Components/Admin/Dashboard';
import MovieForm from './Components/MovieForm';
import LoginForm from './Components/LoginForm';
import RegistrationForm from './Components/RegistrationForm';
import Logout from './Components/Logout';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      <ToastContainer />
      <div>
        <NavBar />
      </div>
      <main className="container" style={{ paddingTop: 20 }}>
        <Switch>
          <Route path="/movies/new" component={MovieForm} />
          <Route path="/registration" component={RegistrationForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/posts/:year?/:month?" component={Posts} />
          <Route path="/products/:id" component={ProductDetails} />
          <Route path="/products" component={Products} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/movies" render={(props) => <Movies sortBy="newst" {...props} />} />
          <Redirect from="/cinemas" to="/movies" />
          <Route path="/not-found" component={NotFound} />
          <Route path="/" exact component={Home} />
          <Redirect to="/not-found" />
        </Switch>
      </main>
    </div>
  );
}

export default App;
