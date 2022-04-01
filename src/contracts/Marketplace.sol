// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Marketplace {
    string public name; 

    // to maintain product count
    uint public productCount = 0;
    // mapping 
    mapping(uint => Product) public products;

    struct Product{
        uint id;
        string name;
        uint price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
         uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
         uint id,
        string name,
        uint price,
        address payable owner,
        bool purchased
    );

    // Define Constructor 
    constructor() {
        name = "The Blockchain Studies Marketplace";
    }

    function createProduct(string memory _name,uint _price) public{
        // Make sure the parameters ae correct
        require(bytes(_name).length > 0);
        require(_price > 0);
        // Increment Product Count
        productCount++;
        // Create th product 
        products[productCount]= Product(productCount,_name,_price,payable(msg.sender),false);
        // Triggger the event
        emit ProductCreated(productCount,_name,_price,payable(msg.sender),false);
    }

    function purchaseProduct(uint _id) public payable {
        // Fetch Product 
        Product memory _product = products[_id];

         // Fetch Owner 
        address payable _seller = _product.owner;

        // Make sure the product has valid id 
        require(_product.id > 0 && _product.id <= productCount);

        // Require that there is enough ether in transaction 
        require(msg.value >= _product.price);

        require(!_product.purchased);

        require(_seller != payable(msg.sender));    

        // Transfer ownership to the buyer 
        _product.owner = payable(msg.sender);
        _product.purchased = true;
        products[_id] = _product;

        // Pay the seller by sending them ether
        payable(_seller).transfer(msg.value);

        // Trigger Event 
        emit ProductPurchased(productCount,_product.name,_product.price,payable(msg.sender),true);

    } 
}


