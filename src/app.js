const { connectDB } = require('./config/database')
// const {adminAuth, userAuth} = require('./middlewares/adminAuth')
const { User } = require('./models/user')
const express = require('express');
const app = express();

const PORT = 3000;
app.use(express.json())
app.post('/signup', async (req, res) => {
    // console.log(req.body)
    // const userObj = {
    //     firstName: 'Virat',
    //     lastName: 'Kohli',
    //     email: 'virat@in.com',
    //     password: 'password@123'
    // }

    const user = new User(req.body);
    try {
        await user.save();
        res.send('User added successfully!')
    } catch (err) {
        res.status(400).send(`Fix this error first => ${err}`)
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
