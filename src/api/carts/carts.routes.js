const {Router} = require('express')
const Carts = require('../../ProductManager/CartsManager')

const router = Router();
const carts = new Carts('./carts.json');

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const cart = await carts.getCart(Number(id));
        if (cart.data) {
            res.status(200).json({message: cart.message, cart_products: cart.data})
        }else res.status(400).json({message: cart.message});
    } catch (error) {
        res.status(404).json({message: error.message});
    }

});

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const cart = await carts.createCart(data);
        res.status(200).json({message: cart.message, cart: cart.cart});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

router.post('/:cartID/product/:productID', async (req, res) => {
    try {
        const { cartID, productID } = req.params;
        const data = await carts.addProduct(Number(cartID), Number(productID));
        if (data.productAddedID) {
            res.status(200).json({ message: data.message, product_ID: data.productAddedID, cart_ID: data.cartModified });
        }else res.status(400).json({message: data.message});
    } catch (error) {
        res.status(404).json({message: error.message});
    }
});

module.exports = router; 