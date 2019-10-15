const path = require('path')
const express = require('express')
const app = express()
const morgan = require('morgan')
const mongoose = require('mongoose')

//conected to db
mongoose.connect('mongodb://localhost/cursos')
.then(db => console.log('DB Conected'))
.catch(err => console.log(err))

//importing routes
const indexRoutes = require('./routes/index')

//setings
app.set('port',process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

//middleweares
app.use(morgan('dev'))
app.use(express.urlencoded({extended:false}))

//routes
app.use('/', indexRoutes)

//starting the server
app.listen(app.get('port'), () =>{
    console.log(`Server on port ${app.get('port')}`)
})

