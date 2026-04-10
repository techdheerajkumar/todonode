const { connectDB } = require('./config/database')
// const {adminAuth, userAuth} = require('./middlewares/adminAuth')
const { User } = require('./models/user')
const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json());


// Created a signup API that stores the users in the database
app.post('/signup', async (req, res) => {
    // I am sending a new user to database      
    const newUser = req.body;
    console.log(newUser)
    const user = new User(newUser);
    try {
        // this save method actually stores the document in the collection of mongoDB database
        await user.save();
        res.send('User added successfully!')
    } catch (err) {
        res.status(400).send(`Fix this error first => ${err}`)
    }
})


// Created a Feed API that gets all the users
app.get('/feed', async (req, res)=>{
    const getUsers = await User.find({})
    res.send(getUsers)
})


// Created a delete api that deletes it from the database based on the filter (name, id, email)
app.delete('/signup', async (req, res)=>{
    const getUserById = req.body.userId;
    console.log(getUserById)
    try{
        await User.findByIdAndDelete(getUserById)
        res.send(await User.find({}))
    }
    catch (err) {
        res.status(400).send(`found an error = ${err}`)
    }
})

// Update API

app.put('/signup', async (req, res) =>{
    const id = req.body.id;
    const data = req.body;
    try{
        await User.findByIdAndUpdate(id, data)
        res.send('User info updated successfully!')
    }
    catch(err){
        res.send(`found an error => ${err}`)
    }
})


connectDB().then(() => {
    console.log('Database connected successfully!')
}).then(() => {
    app.listen(PORT, () => {
        console.log('Server is running')
    });
}).catch((err) => {
    console.error(console.log(`Database cannot be connect =>  ${err}`))
})
