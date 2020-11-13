const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const  cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString : 'process.env.DATABASE_URL',//127.0.0.1   user : 'postgres',password : 'test',database : 'faceapp'
		ssl: true,                                 
	}
});

// db.select('*').from('users').then(data=>{
// 	console.log(data);
// })

const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

//app.get('/', (req, res)=>{res.send(database.users);})

app.get('/', (req, res)=>{res.send("It Is Working");})

app.post('/signin', (req, res,)=>{signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res)=> {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res)=>{profile.handleProfile(req, res, db)})

app.put('/image', (req, res) =>{image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) =>{image.handleApiCall(req, res)})


app.listen(process.env.PORT || 3001, ()=>{
	console.log(`app is running on port ${process.env.PORT}`);
})

