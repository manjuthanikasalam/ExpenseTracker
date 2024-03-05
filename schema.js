const mongoose = require('mongoose')
 const expensetrackerschema = new mongoose.Schema({
    amount : {
        type : Number
    },
    category :{
        type: String
    },
    date :{
        type : String
    }
    
 })

 const expense = mongoose.model('expensedetails',expensetrackerschema)

 module.exports = {expense}