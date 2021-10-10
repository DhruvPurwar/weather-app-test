const path = require('path'); //inbuilt module
const express = require('express');
const hbs= require('hbs');
const weathercode= require('./utils/weathercode');
const geocode= require('./utils/geocode');

//nodemon app.js --watch ../ -e js,hbs

const app=express();

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath= path.join(__dirname, '../templates/views');
const partialsPath= path.join(__dirname,'../templates/partials');


// app.set('views', path.join(__dirname, '../templates'))
// Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath)



const options = {
    extensions: ['htm', 'html']  // used for expressstatic to automatic use .html extension for about,help files when they were in public folder.
}

// Setup static directory to serve.
app.use(express.static(publicDirectoryPath, options)) // will serve all static files , so no need of home,about & help route.
// just save file with same name as route name

// app.get('', (req,res)=>{
//     res.send('Hello express')
//     // res.sendFile(path.join(__dirname, '../public/index.html'))
// })

// The above home page was done using static, now we do it using rendering.
app.get('', (req,res)=>{
        res.render('index' ,{
            title: 'Weather',
            name: 'Dhruv'
        });
})


// app.get('/help', (req,res)=>{
//    res.send([{
//        name: 'Dhruv'
//    },{
//        name: 'Amber'
//    }])
// })


app.get('/help', (req,res)=>{
    res.render('help',{
        helpText: 'vey good boi. ask for help anyitme especiilay at nightyyy',
        title: 'Help',
        name: 'Dhruv'
    });
})

// app.get('/about', (req,res)=>{
//     res.send('<h2>About page</h2>')
// })

app.get('/about', (req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Dhruv Purwar'
    });
})

// app.get('/weather', (req,res)=>{
//     res.send({
//         forecast: 'Sunny',
//         Loaction: 'Chadigarh'
//     })
// }) 



// app.get('/weather',(req,res)=>{
//     if(!req.query.address){
//         return res.send('Please provide address.')   
//     }

    

//     console.log(req.query.address);
//     res.send({
//         address:req.query.address,
//         temperature:''
//     })
// })


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send('Please provide address.')   
    }
  
    const url= 'http://api.weatherstack.com/current?access_key=6bebf88a031842107de96ff0f9d648f2&query=Moscow&units=m';
    

    console.log(req.query.address);

    geocode(req.query.address ,(error, {latitude,longitude,location}= {}) => {

        if(error){
            return res.send({
                error:error
            })
        }
    
        // if(!process.argv[2]){
        //     return console.log('Give location')
        // }
        
        
        weathercode(latitude, longitude, (error, forecastData) => {
    
            if(error){
                 return res.send({
                     error:error
                 })
            }
            
            // console.log( location);
            // console.log( forecastData)

            res.send({
                address:req.query.address,
                data: forecastData,
                location:location
            })
          })
    })

    
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send('Please provide search term.')   //products?search=games
//     }

//     console.log(req.query.search);
//     res.send({
//         products:[]
//     })
// })

app.get( '/help/*', (req,res)=>{
    res.render('404',{
        name:'Dhruv',
        title:'404',
        error:' Help article not found'
    })
})

app.get( '*', (req,res)=>{
    res.render('404',{
        name:'Dhruv',
        title:'404',
        error:'Article not found'
    })
})

app.listen(3000,()=>{
    console.log('The server is running on port 3000')
})