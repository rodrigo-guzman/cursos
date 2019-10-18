require('dotenv').config()

const express = require('express')
const router = express.Router()

////////////RUTEO//////////////////////////

const Course = require('../models/course')

router.get('/', async (req,res) =>{
    const jsonObtenido = await getDolarBCRA();
    const courses = await Course.find()
    res.json(courses);
})

router.get('/crudCourses', async (req,res) =>{
    const courses = await Course.find()
    res.json(courses);
})

router.post('/add',async (req,res) => {
    const course = new Course(req.body)
    await course.save()
    res.json({status: 'Course created'});
})

router.get('/active/:id', async (req,res) =>{
    const { id } = req.params
    const course = await Course.findById(id)
    course.status = !course.status
    await course.save()
    res.json({status: 'Course actived'});
})

router.get('/edit/:id', async (req,res) =>{
    const { id } = req.params
    const course = await Course.findById(id)
    res.json(course);
})

router.post('/edit/:id', async (req,res) =>{
    const { id } = req.params
    await Course.update({_id: id}, req.body)
    res.json({status: 'Course updated'});
})

router.get('/delete/:id', async (req,res)=>{
    const { id } = req.params 
    await Course.remove({_id: id})
    res.json({status: 'Course deleted'});
})

module.exports = router

//////////////////////////////CONSUMO DOLAR/////////////////////////////////////

//consumo servicio dolar
const fetch = require('node-fetch');
const apiKey = 'BEARER eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MDI0MjYzNDMsInR5cGUiOiJleHRlcm5hbCIsInVzZXIiOiJyb2RyaWdvZ2FzdG9uZ3V6bWFuQGdtYWlsLmNvbSJ9.YJwr1nI9001SW6Yb2p2svbA6EyjJQlK955IggpiIyQCrUenhj3pywmvOSap6gt4P3OCw2mULXEfWNoJYWf7VPA';
let consult = 'usd_of_minorista'
let dayNow = '2019-10-11'

//consumo servicio
async function getDolarBCRA() 
{   
    const API_DOLAR_BCRA  = 'https://api.estadisticasbcra.com/'+consult //process.env.ENDPOINT
    const HEADERS_DOLAR_BCRA = {
        method: "GET",
        headers: {
           "Authorization": apiKey//process.env.API_KEY
        }
    }

    let response = await fetch(API_DOLAR_BCRA,HEADERS_DOLAR_BCRA)
    let json = await response.json();


    if(response.status!==200)
        {
            console.log('La cotización no fue exitosa')
        }
    else
        {
            let filteredProducts = getFilteredByKey(json, "d", dayNow); //process.env.DAY
            console.log(filteredProducts);
            return filteredProducts;
        }
};

//filtro el objeto de la fecha que reciba por parámetro
function getFilteredByKey(array, key, value) {
    return array.filter(function(e) {
      return e[key] == value;
    });
  }

//fin consumo json dolar