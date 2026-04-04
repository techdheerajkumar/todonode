const express = require('express');
const app = express();

const PORT = 3000;


app.get('/user', (req, res)=>{
    res.send({
        firstName: 'Dheeraj',
        lastName: 'Kumar'
    })
})

app.post('/user', (req, res) =>{
 res.send('Its a post request')
})

app.put('/user', (req, res)=>{
    res.send('Its a put request')
})

app.delete('/user', (req, res)=>{
    res.send('Its a delete request')
})

app.use('/test',(req, res)=>{ 
    res.send('<h1>Hello from the server</h1>')
})
app.listen(PORT, ()=>{
    console.log('Server is running')
});