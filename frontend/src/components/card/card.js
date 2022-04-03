import React, { Component } from 'react';
import { Button,Card } from 'react-bootstrap';
class CardComponant extends Component {
  render() {
return (
            <div className="col-lg-3 col-md-3">
                <Card className="p-3" >
                    <Card.Img variant="top" src="https://www.notebookcheck.net/uploads/tx_nbc2/4_to_3_Teaser_Apple_iPhone_13_Pro.jpg" />
                    <Card.Body>
                        <Card.Title>{this.props.product.name}</Card.Title>
                       
                        <Card.Text>{window.web3.utils.fromWei(product.price.toString(),'Ether')}</Card.Text>
                        <div className="d-grid gap-2">
                        <Button variant="primary" size="lg" name={this.props.product.id} 
                                        value={this.props.product.price} 
                                        onClick={(event)=>{this.props.product.purchaseProduct(event.target.name,event.target.price)}}>Buy</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>
)
  }
}

export default CardComponant