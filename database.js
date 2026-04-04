/**
 * Go to mongodb website
 * create a free M0 Cluster and deploy to AWS server
 * Create a user
 * get the connection string
 * */

const { MongoClient } = require('mongodb')

async function runGetStarted() {
    // Replace the uri string with your connection string
    const URI = 'mongodb+srv://adminmongo:admin123@todo-application.uzlprgx.mongodb.net/'
    const client = new MongoClient(URI);

    try {
        await client.connect();
        const database = client.db('sample_mflix');
        const users = database.collection('users');
        await users.createIndex({email:1},{unique: true})

        //Read
        await users.insertOne({
            name: 'Dheeraj Kumar',
            email: 'dheerajkumar@gameofthron.es',
            password: '@#$sasd43334367askjyhg'
        })

        const getUsers = await users.find({}).toArray();
        console.log(getUsers)

    }catch (err) {
        if (err.code === 11000){
            console.log('User with this email already exists')
        }
    } finally {
        await client.close();
    }
}
runGetStarted().catch(console.dir);
