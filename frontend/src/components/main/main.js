import React, { Component } from 'react';
import { Card ,Button} from 'react-bootstrap';
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
                        <div className="row">
                        {this.props.products.map((product,key)=>{
                             return <div className="col-lg-3 col-md-3" key={key}>
                             <Card className="p-3" >
                                 <Card.Img variant="top" src="https://www.notebookcheck.net/uploads/tx_nbc2/4_to_3_Teaser_Apple_iPhone_13_Pro.jpg" />
                                 <Card.Body>
                                     <Card.Title>{product.name}</Card.Title>
                                     <Card.Text>{window.web3.utils.fromWei(product.price.toString(),'Ether')} ETH</Card.Text>
                                     <div className="d-grid gap-2">
                                     <button className="btn btn-primary btn-block"
                                        name={product.id} 
                                        value={product.price} 
                                        onClick={(event)=>{this.props.purchaseProduct(event.target.name,event.target.price)}}>Buy</button>
                                     </div>
                                 </Card.Body>
                             </Card>
                         </div>
                        })}
                       
                        </div>
                </div>
              </div>
            </main>
          </div>
        </div>
    );
  }
}

export default Main;
