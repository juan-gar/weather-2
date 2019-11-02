const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = 3000

//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup Handlebars engine and view location
app.set('view engine','hbs')
app.set('views',viewsPath)
app.use(express.static(publicDir))
hbs.registerPartials(partialsPath)


app.get('/', (req,res) => {
    res.render('index',{
        title: 'Weather app',
        name: 'juangar'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help page',
        name: 'juangar'
    })
})

app.get('/about', (req,res) => {
    res.render('help',{
        title: 'About',
        name: 'juangar'
    })
})

app.get('/weather',(req,res) => {

    geocode('Barcelona', (error,{latitude,longitude,place} = {}) => {
        if (error){
            return res.send({
                error
            })
        }
        
        //console.log(undefined, response.latitude)
    
        forecast(latitude,longitude,(error,{summary,temperature,rain} = {}) => {
            if(error) {
                return res.send({
                    error
                })
            }
            
            res.send({
                summary,
                temperature,
                rain
            })

            // console.log(`The forecast for ${place} is: ${summary} There's a temperature of ${temperature} and a chance of rain of ${rain}%`)
    
    
        })
    
     })



})

 



 app.listen(port, () => console.log(`Example app listening on port ${port}!`)) 