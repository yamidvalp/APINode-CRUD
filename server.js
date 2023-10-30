const express = require("express");
const mongoose = require("mongoose")
const Product = require("./models/productmodels")
require("dotenv").config()
const app = express();
const URL_CONNECT = process.env.URL_CONNECT;
const PORT = process.env.PORT;
app.use(express.json())

app.listen(PORT, () => {
    console.log("server node");
})

//GET, POST, PUT, DELETE
app.get("/", (req,  res) => {
    res.send("Hello From Home New")
})

//PUT actualizar un producto
app.put("/product/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, require.body)
        if (product) {
            return res.status(404).json({message: "Cannnot find this ID: ${id}"})
        }
        const productUpdate = await Product.findById(id)
        res.status(200).json(productUpdate)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE borrar un producto por ID
app.delete("/product/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if (product) {
            return res.status(404).json({message: "Cannnot find this ID: ${id}"})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET recuperar producto por ID
app.get("/product/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET Recuperar todos los productos
app.get("/products", async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//POST agregar un producto
app.post("/product", async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


mongoose.connect(URL_CONNECT)
.then(() => {
    console.log("connect with mongo");
})
.catch(error => {
    console.log(error);
})