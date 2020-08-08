const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./geocode')
const forecast = require('./forecast')
const request = require('request')
const port = process.env.PORT || 3000

const app = express()


const publiDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publiDirectoryPath))
app.get('',(req, res) => {
    res.render('index',{
        title: 'weather app'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help page',
        mission:'asking for help'
    })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'about'  
    })
})
// parameters are request and response
// the below line wont work after adding the path.join and the .static function 
// app.get('', (req, res)=>{
//     res.send('<h1>weather app</h1>')
// })

// app.get('/help', (req, res)=>{
//     res.send([{
//         name: 'kamlesh',
//         type: 'sira'
//     }])
// })




app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"you need to provide address"
        })
    }
   geocode(req.query.address,(error,data)=>{
       if(error){
           res.send({
               error:"no such place exist"
           })
        }
        else{
            forecast(data.latitude,data.longitude,(error,forecastData)=>{
                if(error){
                    res.send({
                        error:"no other details"
                    })
                }
                else{
                    res.send({
                        location:data.location,
                        data1:forecastData,
                        data2:data
                                                
                    })
                }
            })
        }   
   })
})




app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error: "you must provide a search"
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 message',
        name:'andrew',
        errorMessage:'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'jibril',
        errorMessage:'page not found'
    })
})
// this app.get() is used to send or provide the page requested 
// by the user like for url app.com/help or app.com/about so here
// the help and about are the pages that is requested by the user.

// setting the server and providing the port number 
app.listen(port, ()=>{
    console.log('server set up correctly @ '+port)
})
