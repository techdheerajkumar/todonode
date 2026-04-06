const {adminAuth, userAuth} = require('./middlewares/adminAuth')
const express = require('express');
const app = express();

const PORT = 3000;
app.use('/admin', adminAuth)

app.get('/admin/getAllData', (req, res, next) => {
    res.send([{
        firstName: 'Dheeraj',
        lastName: 'Kumar'
    }, {
        firstName: 'Neha',
        lastName: 'neha'
    }])
})


app.use('/user', userAuth, (req, res) =>{
    // console.log(req.params)
 res.send('Welcome user')
})
// app.use('/user/:userId/:name/:age', (req, res) =>{
//     console.log(req.params)
//  res.send('Its a post request')
// })

// app.put('/user', (req, res)=>{
//     res.send('Its a put request')
// })

// app.delete('/user', (req, res)=>{
//     res.send('Its a delete request')
// })

// app.use('/test',(req, res)=>{ 
//     res.send('<h1>Hello from the server</h1>')
// })
app.listen(PORT, () => {
    console.log('Server is running')
});