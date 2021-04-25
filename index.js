const express = require('express')
const mongodb = require('mongodb')

const connectionURL = 'mongodb://localhost:27017'
//dbname
const databaseName = 'taskmanager'

const app = express()
const MongoClient= mongodb.MongoClient

app.use(
    express.urlencoded({
      extended: true
    })
  )

  app.use(express.json())

app.get('', (req,res)=> {
    res.send('Hello, I am your NodeJS server !')
})

app.get('/about', (req,res)=> {
    res.send('<h1>Server: task manager</h1>')
})

app.get('/hello', (req,res)=> {
    res.send('<h1>Hello</h1>')
})

app.get('/author', (req,res)=> {
    res.send({'firstname':'Roland','lastname':'Onofrej'})
})

app.get('/task', (req, res)=>{
    MongoClient.connect(connectionURL, (error, client) => {
        if(error){
            return console.log('Unable to connect to database!')
        }
        console.log('Connection succesfully!')
        let filter={};
        if(req.query.done){
            if(req.query.done=='true')
                filter.done=true;
            else
                filter.done=false;
        }else if(req.query.priority){
           filter.priority=parseInt(req.query.priority);
        }
        console.log(filter)
        const db=client.db(databaseName)

        db.collection('tasks').find(filter).toArray( (err, result)=> {
            if (err) throw err;
            console.log(result);
            res.send(result);
        })    
    }) 
})

app.post('/task/new', (req,res)=>{
    const data = req.body;
    const name=data.name;
    const priority=data.priority;
    let price='undefined';
    if(data.price){
        price=data.price;
    }
    console.log(name, ' ',priority,' ', price);
    const done=false;
    const currentdate = new Date();
    // pridat date, pridat done:false
    // vytvorit document
    // zapis do mongo databazy
})

app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})