console.log("hello")
// expanse tracker features and end points
//  adding a new expanse or income :/add-expanse  ->post
//  displaying existing expenses :/get-expanse  ->get
//  editing existing entires :/edit-expense  ->patch/put 
//  deleting expenses :/delete-expense   ->delete

//  budget reporting 
//  create new user 
//  validating user


// defining schema
// category ,amount,Date

const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const {expense} = require('./schema')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())



async function connectToDb(){
try{
    await mongoose.connect('mongodb+srv://manju:manju1310@manju.nlsyjda.mongodb.net/ExpenseTracker?retryWrites=true&w=majority&appName=Manju')
    console.log("DB connection established")
    const port =process.env.PORT || 8000
app.listen(port,function(){
    console.log(`listening on port ${port}`)
})
}
catch(error){
    console.log("error")
    console.log('couldn\'t establish connection')
}
}
connectToDb()

app.post('/add-expense',async function(request,response){
    // console.log(request.body)
    // response.json({
    //     "status" : "created"
    // })
    try{
        await expense.create({
            "amount" : request.body.amount,
            "category": request.body.category,
            "date": request.body.date
        })
        response.status(201).json({
                 "status" : "success",
                 "message" : "new entry created"
            })
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "entry not created",
            "error" : "error"
       })

    }
})


app.get('/get-expenses',async function(request,response){
    try{
        const expensesData = await expense.find()
   response.status(200).json(expensesData)
    }catch(error){
        response.status(500).json({
            "status" : "failure",
            "message" : "could not fetch entries",
            "error" : "error"
       })

    }
})


app.delete('/delete-expense/:id', async function(request, response) {
    try {
        const expenseData = await expense.findById(request.params.id)
        if(expenseData) {
            await expense.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status" : "success",
                "message" : "deleted entry"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})

app.patch('/edit-expense/:id', async function(request, response) {
    try {
        const expenseEntry = await expense.findById(request.params.id)
        if(expenseEntry) {
            await expenseEntry.updateOne({
                "amount" : request.body.amount,
                "category" : request.body.category,
                "date" : request.body.date
            })
            response.status(200).json({
                "status" : "success",
                "message" : "updated entry"
            })
        } else {
            response.status(404).json({
                "status" : "failure",
                "message" : "could not find entry"
            })
        }
    } catch(error) {
        response.status(500).json({
            "status" : "failure",
            "message" : "could not delete entry",
            "error" : error
        })
    }
})