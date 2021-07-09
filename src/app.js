const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geoCode = require('./utils/geoCode')
const foreCast = require('./utils/foreCast')

const port = process.env.PORT || 3000
const app = express()
// Define path for express config 
const publicDirPath = path.join(__dirname , '../public')
const viewsPath = path.join(__dirname , '../Templates/views')
const paritalPath = path.join(__dirname , '../Templates/partials')

// Setup handlers engine and views location 
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(paritalPath)
// setup static directories to serve 
app.use(express.static(publicDirPath))

// 
app.get('',(req , res) =>{ 
    res.render('index' , {
        title : 'Weather app' , 
        name : 'Sameh Othman'
    })
})

app.get('/about' , (req , res) =>{
    res.render('about' , {
        title : 'About me',
        name : 'Sameh Othman'
    })
})

app.get('/help' , (req , res) =>{
    res.render('help' , {
        title : 'Help' , 
        name : "Sameh Othman"
    })
})

app.get('/weather' , (req , res) =>{
    console.log(req.query.address)
    if (!req.query.address){
        return res.send({
            error : "You must provide an address!"
        })
    }
    geoCode.getGeoCode(req.query.address , (error , geoData = {})=>{
        if (error)
            return res.send({
                error : "Unable to get the geocode of this location!"
            })
            console.log(geoData)
        foreCast.getForeCast(geoData , (error , foreCastData= {}) =>{
            if (error)
            return res.send({
                error : "Unable to get the forecast of this location!"
            })
            res.send(foreCastData)
        })
    })
})

app.get('/help/*' , (req , res) =>{
    res.render('help404' , {
        errorMessage : 'Help article not found',
        name : 'Sameh Othman'
    })
})
app.get('*' , (req , res) => {
    res.render('404' , {
        errorMessage : "Page not found !",
        name : 'Sameh Othman'
    })
})

app.listen(port , ()=>{
    console.log('this server is running on port ' + port)
})