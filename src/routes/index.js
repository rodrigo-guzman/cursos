const express = require('express')
const router = express.Router()

const Course = require('../models/course')

router.get('/', async (req,res) =>{
    const courses = await Course.find()
    res.render('index', {
        courses
    })
})

router.get('/crudCourses', async (req,res) =>{
    const courses = await Course.find()
    res.render('crudCourses', {
        courses
    })
})

router.post('/add',async (req,res) => {
    const course = new Course(req.body)
    await course.save()
    res.redirect('/')
})

router.get('/active/:id', async (req,res) =>{
    const { id } = req.params
    const course = await Course.findById(id)
    course.status = !course.status
    await course.save()
    res.redirect('/')
})

router.get('/edit/:id', async (req,res) =>{
    const { id } = req.params
    const course = await Course.findById(id)
    res.render('edit',{
        course
    })
})

router.post('/edit/:id', async (req,res) =>{
    const { id } = req.params
    await Course.update({_id: id}, req.body)
    res.redirect('/')
})

router.get('/delete/:id', async (req,res)=>{
    const { id } = req.params 
    await Course.remove({_id: id})
    res.redirect('/')
})

module.exports = router