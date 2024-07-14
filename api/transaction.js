import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  name: String,
  date: Date,
  description: String,
  price: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;