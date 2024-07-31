const express = require('express');
const ProductModel = require('../schema/product.schema');

const productRouter = express.Router();
productRouter.get('/get-products', async (req,res)=>{
    const data = await ProductModel.find();
    res.status(200).json({ msg: "product-data", data });
});
productRouter.post('/add-product', async (req,res)=>{
    const productData =  new ProductModel(req.body);
    await productData.save();
    res.status(201).json({ msg: "product added successfully" });
});
productRouter.patch('/update-product/:id', async (req,res)=>{
    const id = req.params.id;
    await ProductModel.findByIdAndUpdate(id, req.body);
    res.status(205).json({ msg: "Product updated successfully" });
});
productRouter.delete('/delete-product/:id', async (req,res)=>{
    const id = req.params.id;
    await ProductModel.findByIdAndDelete(id);
    res.status(204).json({ msg: "Product deleted successfully" });
})
module.exports = productRouter;