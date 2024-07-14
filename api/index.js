import express from 'express';
import cors from 'cors';
import transaction from './transaction.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();
const port = 4000;
app.use(cors())
app.get('/api/test', (req, res) => {
  res.json('test ok');
});
dotenv.config();
app.use(express.json())

app.post('/api/transaction', async (req,res)=>{
 await mongoose.connect(process.env.MONGO_URL)
  const {name,date,description,price} =req.body;
  const Transaction  = await transaction.create({name,date,description,price })
  res.json(Transaction)
})

app.get('/api/transactions', async (req,res)=> {
  await mongoose.connect(process.env.MONGO_URL)
  const transactions = await transaction.find();
  res.json(transactions);
})
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api/test`);
});
