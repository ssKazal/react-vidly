import React from 'react';

export default class Like extends React.Component {
  render() {
    let classes = 'fa-heart fa';
    if (!this.props.liked) {
      classes += 'r';
    } else {
      classes += 's';
    }
    return <i className={classes} style={{ cursor: 'pointer' }} onClick={this.props.onLikeToggle}></i>;
  }
}
