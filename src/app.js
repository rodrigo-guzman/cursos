require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')



//conected to db
mongoose.connect(process.env.DB_URL)
.then(db => console.log('DB Conected'))
.catch(err => console.log(err))

//setings
app.set('port',process.env.PORT || 3000)

//middleweares
app.use(cors({origin: process.env.FRONT_URL}));
app.use(express.json());

//routes
app.use('/', require('./routes/index'))

//starting the server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`)
})

