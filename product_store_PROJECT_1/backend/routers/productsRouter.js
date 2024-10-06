import express from "express";
import { validateProduct } from "../utils/validator.js";
import Product from "../models/productModel.js";
import getProduct from '../middleware/getProduct.js'

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (err) {
    console.log("Error while fetching products", err);
    return res
      .status(500)
      .json({ message: "internal server error", details: err });
  }
});

router.post("/", validateProduct, async (req, res) => {
  try {
    await Product.create(req.body);
    return res.status(201).json({ message: "created product" });
  } catch (err) {
    console.log("Error while creating product", err);
    return res
      .status(500)
      .json({ message: "internal server error", details: err });
  }
});

router.delete('/:id', getProduct, async(req, res) => {
    try {
        await Product.deleteOne({_id: req.params.id});
        return res.status(200).json({
            message:'Deleted successfully'
        })
    } catch (err) {
        return res.status(500).json({
            message:"Error deleting the product."
        })        
    }
})

export default router;
