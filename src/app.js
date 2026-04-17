const { connectDB } = require('./config/database')
// const {adminAuth, userAuth} = require('./middlewares/adminAuth')
const { User } = require('./models/user')
const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(cookieParser());

// Created a signup API that stores the users in the database
app.post('/signup', async (req, res) => {
    // I am sending a new user to database      
    // const newUser = req.body;
    const { firstName, lastName, email, gender, password, skills } = req.body;

    const hashPassword = await bcrypt.hash(password, 10)

    const newUser = {
        firstName,
        lastName,
        email,
        gender,
        password: hashPassword,
        skills
    }
    const user = new User(newUser);
    try {
        // this save method actually stores the document in the collection of mongoDB database
        await user.save();
        res.send('User added successfully!')
    } catch (err) {
        res.status(400).send(`Fix this error first => ${err}`)
    }
})

// Login API
app.post('/login', async (req, res) => {

    try {
        const { userEmail, userPassword } = req.body;
        res.cookie('userToken', '234;asdflsdew23@34ssertte');

        const findUser = await User.findOne({ email: userEmail });
        const isPasswordMatch = await bcrypt.compare(userPassword, findUser.password);
        if (isPasswordMatch) {
            res.send('Login Successfull')
        } else {
            throw new Error('Invalid password of the user');
        }
    }
    catch (err) {
        res.status(400).send('Invalid user => ' + err)
    }

})

// Created a profile API that authenticates user and fetches the profile page of respected user.
app.get('/profile', async (req, res) => {
    console.log(req.cookies)
})


// Created a Feed API that gets all the users
app.get('/feed', async (req, res) => {
    const getUsers = await User.find({})
    res.send(getUsers)
})


// Created a delete api that deletes it from the database based on the filter (name, id, email)
app.delete('/signup', async (req, res) => {
    const getUserById = req.body.userId;
    try {
        await User.findByIdAndDelete(getUserById)
        res.send(await User.find({}))
    }
    catch (err) {
        res.status(400).send(`found an error = ${err}`)
    }
})

// Update API

app.put('/signup/:id', async (req, res) => {
    const id = req.params.id
    const data = req.body;

    try {
        // restricting the user to update only limited things
        const ALLOWED_UPDATES = ["id", "skills", "gender", "password"];
        const isAllowedUpdates = Object.keys(data).every(k => ALLOWED_UPDATES.includes(k));

        if (!isAllowedUpdates) {
            throw new Error("Updates not allowed")
        }

        await User.findByIdAndUpdate(id, data, { runValidators: true })
        res.send('User info updated successfully!')
    }
    catch (err) {
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
