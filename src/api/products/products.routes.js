const { Router } = require('express')
const { ProductManager } = require('../../ProductManager/ProductManager')


const router = Router();
const productManager = new ProductManager('./products.json')

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const products = limit ? await productManager.getProducts(limit) : await productManager.getProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.get('/:idProduct', async (req, res) => {
    try {
        const { idProduct } = req.params;
        const product = await productManager.getProductById(Number(idProduct));
        if (product) res.status(200).json(product);
        else res.status(400).json({ message: `No existe un producto con ID ${idProduct}.` });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newProduct = await productManager.addProduct(data);
        if (newProduct.status) res.status(200).json({message: `Producto agregado con exito!`, product: newProduct.product})
        else res.status(400).json({ message: newProduct.message });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.put('/:idProduct', async (req, res) => {
    try {
        const { idProduct } = req.params;
        const data = req.body;
        const productUpdated = await productManager.updateProduct(Number(idProduct), data);
        if (productUpdated.status) res.status(200).json({message:'Producto modificado con exito!', productUpdated: productUpdated.product})
        else res.status(400).json({ message: productUpdated.message});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:idProduct', async (req, res) => {
    try {
        const {idProduct} = req.params;
        const deletedProduct = await productManager.deleteProductById(Number(idProduct));
        if (deletedProduct) res.status(200).json({message: 'Producto eliminado con exito!', deletedProduct: deletedProduct})
        else res.status(400).json({ message: 'Err. No existe: No existe un producto con este ID.' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;