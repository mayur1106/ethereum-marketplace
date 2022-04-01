const Marketplace = artifacts.require("Marketplace");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Marketplace',([deployer,seller,buyer])=>{
    let marketplace
    before(async()=>{
        marketplace = await Marketplace.deployed()
    })

    describe('deployment',async ()=>{
        it('deploys sucessfully',async()=>{
            const address = await marketplace.address;
            assert.notEqual(address,0x0)
            assert.notEqual(address,'')
            assert.notEqual(address,'null')
            assert.notEqual(address,'undefined')
        })
        it('has a name',async()=>{
            const name = await marketplace.name()
            assert.equal(name,'The Blockchain Studies Marketplace')
        })
    })

    describe('Products',async ()=>{
       let result, productCount;
       before(async()=>{
           result = await marketplace.createProduct('Iphone x',web3.utils.toWei('1','Ether'),{from:seller})
           productCount = await marketplace.productCount()
       })
        it('creates products',async()=>{
            // Success
            assert.equal(productCount,1)
            const event = result.logs[0].args; 
            assert.equal(event.id.toNumber(),productCount.toNumber())
            assert.equal(event.name,'Iphone x')
            assert.equal(event.price,web3.utils.toWei('1','Ether'))
            assert.equal(event.purchased, false)

            // Failure: Product must have name 
            await marketplace.createProduct('',web3.utils.toWei('1','Ether'),{from:seller}).should.be.rejected;
            await marketplace.createProduct('Iphone x',0,{from:seller}).should.be.rejected;

        })

        it('List products',async()=>{
            const product = await marketplace.products(productCount);
            assert.equal(product.id.toNumber(),productCount.toNumber())
            assert.equal(product.name,'Iphone x')
            assert.equal(product.price,web3.utils.toWei('1','Ether'))
            assert.equal(product.purchased, false)
        })

        it('Sell products',async()=>{
            // Make purchase
            const result = await marketplace.purchaseProduct(productCount,{from:buyer,value:web3.utils.toWei('1','Ether')});

            // Check logs 
            const event = result.logs[0].args; 
            assert.equal(event.id.toNumber(),productCount.toNumber())
            assert.equal(event.name,'Iphone x')
            assert.equal(event.price,web3.utils.toWei('1','Ether'))
            assert.equal(event.owner,buyer)
            assert.equal(event.purchased, true)

            // Check if seller recieved funds

        })
    })
})