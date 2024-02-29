import express from 'express'
require('dotenv').config();
import { MongoClient } from 'mongodb'
import { cartItems as cartItemsRaw, products as productsRaw } from './temp_data'

let cartItems = cartItemsRaw;
let products = productsRaw;

function populateCartIds(ids) {
  return ids.map(id => products.find(product => product.id === id))
}

const client = new MongoClient(process.env.MONGODB_URI)

const app = express();
app.use(express.json())

app.get('/hello', async (req, res) => {
  await client.connect();
  const db = client.db('fsv-db');
  const products = await db.collection('products').find({}).toArray();
  res.send(products);
})

app.get('/products', (req, res) => {
  res.json(products)
})

app.get('/cart', (req, res) => {
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart)
})


app.get('/products/:productId', (req, res) => {
  const productId = req.params.productId
  const product = products.find(product => product.id === productId)
  res.json(product)
})

app.post('/cart', (req, res) => {
  const productId = req.body.id;
  cartItems.push(productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart)
})

app.delete('/cart/:productId', (req, res) => {
  const productId = req.params.productId;
  cartItems = cartItems.filter(id => id !== productId);
  const populatedCart = populateCartIds(cartItems);
  res.json(populatedCart);
})

app.listen(8000, () => {
  console.log('server is listenting on port 8000');
})