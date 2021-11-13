import React from 'react';

class ProductDetails extends React.Component {
  handleSave = () => {
    this.props.history.replace('/products');
  };

  render() {
    return (
      <div>
        <h1>Product Details - {this.props.match.params.id}</h1>
        <button onClick={() => this.handleSave()}>Save</button>
      </div>
    );
  }
}

export default ProductDetails;
