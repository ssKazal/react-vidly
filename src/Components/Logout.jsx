import React from 'react';

class Logout extends React.Component {
  componentDidMount() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    window.location = '/';
  }

  render() {
    return null;
  }
}

export default Logout;
