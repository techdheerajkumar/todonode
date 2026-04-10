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
    console.log(getUsers)
    res.send(getUsers)
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
