const path = require('path')
const hbs = require('hbs')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
console.log(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('' , (req,res)=>{
    res.render('index',{
        title: 'weather App',
        name: 'Matan Cotton'
    })
})
app.get('/weather',(req,res)=>{
    if (!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{longtitude,latitude,location}={})=>{
        if (error) {
            return res.send({error})
        }
        forecast(longtitude,latitude,(error,result)=>{
            if (error) {
                return res.send({error})
            }
            res.send({
                forecast: result,
                location
            })
        })
    })
})

app.get('/products',(req,res)=>{
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'Aboute me',
        name:'Matan Cotton'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'you enterd the help page!!',
        title: 'Help',
        name: 'Matan'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404-page',{
        message: 'Help Article was not found.',
        name: 'Matan Cotton',
        title: 'Help 404'
    })
})

app.get('*',(req,res)=>{
    res.render('404-page',{
        title: '404',
        message: 'Article was not found.',
        name: 'Matan Cotton'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000')
})