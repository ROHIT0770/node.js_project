// const index = fs.readFileSync("index.html", "utf-8");
const fs = require("fs");
const model=require('../model/product')
const mongoose = require('mongoose');

const Product =model.Product;
exports.createProduct = (req, res) => {
  const product = new Product(req.body);

  product.save().then((doc)=>{
    console.log({doc});
    res.status(201).json(doc);
  }).catch((err)=>{
    res.status(400).json(err);
  })

  
};
exports.getAllProducts = async (req, res) => {
  const products=await Product.find({});
  res.json(products);
};
//Create POST /products

exports.getProducts = async(req, res) => {
  const id = req.params.id;
  const product=await Product.findById(id);

  res.json(product);
};

exports.replaceProduct = async(req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndReplace({_id:id},req.body,{new : true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err);
  }
};
exports.updateProduct = async(req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndUpdate({_id:id},req.body,{new : true})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err);
  }
};

exports.deleteProduct = async (req, res) => {
  const id = req.params.id;
  try{
  const doc = await Product.findOneAndDelete({_id:id})
  res.status(201).json(doc);
  }
  catch(err){
    console.log(err)
    res.status(400).json(err);
  }
};
