const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const reverse_geocode = require('./utils/reverse_geocode')

const app = express();
const port = process.env.PORT || 3000;

//Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname,'../template/views');
const partialsPath = path.join(__dirname,'../template/partials');

//setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title : "Weather",
        name :"Keshav Mundra"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : "About Me",
        name : "Keshav Mundra"
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
        title : "Help",
        name : "Keshav Mundra",
        message : "Help yourself"
    })
})

app.get('/weather', (req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error : "please proivde a address to search for !!!"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })
    })
})

//reverse geo coding
app.get('/geo_loc', (req,res)=>{

    if(!req.query.latitude && !req.query.longitude)
    {
        return res.send({
            error : "Unable to fetch your location !!!"
        })
    }

    reverse_geocode(req.query.latitude,req.query.longitude,(error,{location}="") =>{
        if(error)
        {
            return res.send({
                error
            })
        }
        forecast(req.query.latitude,req.query.longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            return res.send({
                forecast : forecastData,
                location : location
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : "404",
        name : "Keshav Mundra",
        errorMessage :"Help article not found"
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : "404",
        name : "Keshav Mundra",
        errorMessage : "Page not found"
    })
})

app.listen(port,()=>{
    console.log(
        "server is up on port "+port+" "
    )
})
