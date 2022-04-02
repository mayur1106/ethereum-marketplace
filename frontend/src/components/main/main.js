import React, { Component } from 'react';
class Main extends Component {
  render() {
    return (
        <div className='container mt-5 p-2'>
          <div className='row'>
            <main role="main" className="col-lg-12 d-flex">
              <div id= "content">
                <h1>Add Product</h1>
                <div className="row">
                <form onSubmit={(event) => {
                    event.preventDefault()
                    const name = this.productName.value
                    const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
                    this.props.createProduct(name, price)
                    }}>
                    <div className="form-group m-2">
                        <input
                        id="productName"
                        type="text"
                        ref={(input) => { this.productName = input }}
                        className="form-control"
                        placeholder="Product Name"
                        required />
                    </div>
                    <div className="form-group m-2">
                        <input
                        id="productPrice"
                        type="text"
                        ref={(input) => { this.productPrice = input }}
                        className="form-control"
                        placeholder="Product Price"
                        required />
                    </div>
                    <button type="submit" className="btn btn-primary m-2">Add Product</button>
                    </form>
                </div>
                
                <div className="row-fluid mt-5">
                    <h2>Buy Product</h2>
                    <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Owner</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody id="productList">
                            {this.props.products.map((product,key)=>{
                                return (
                                    <tr key = {key}>
                                        <th scope="row">{product.id.toString()}</th>
                                        <td>{product.name}</td>
                                        <td>{window.web3.utils.fromWei(product.price.toString(),'Ether')}</td>
                                        <td>{product.owner}</td>
                                        <td><button 
                                        name={product.id} 
                                        value={product.price} 
                                        onClick={(event)=>{this.props.purchaseProduct(event.target.name,event.target.price)}}>Buy</button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
              </div>
            </main>
          </div>
        </div>
    );
  }
}

export default Main;
