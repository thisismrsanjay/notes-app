const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser =require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const passport =require('passport');
const session = require('express-session');
const path =require('path');

//Loading Routes
const notes =require('./routes/notes');
const users =require('./routes/users');

//Passport Config
require('./config/passport')(passport);
//DB config
const db =require('./config/database');

//Map global promise -get rid of warning 
mongoose.Promise =global.Promise;
//connect to mongoose
mongoose.connect(db.mongoURI,{ useCreateIndex: true,useNewUrlParser: true });
var dbs = mongoose.connection;
dbs.on('error', console.error.bind(console, 'connection error:'));
dbs.once('open', function() {
 console.log('database connected'); 
});


//Body-Parser middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//static folder
app.use(express.static(path.join(__dirname,'public')));

//method-override middleware
app.use(methodOverride('_method'));

app.set('view engine','ejs');

//express-session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

//flash middleware
app.use(flash());

//Global variables
app.use(function(req, res, next){
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user =req.user|| null;
    next();
});

app.get('/',(req,res)=>{
    const title = 'Welcome';
    res.render('index',{
        title:title
    });
})
app.get('/about',(req,res)=>{
    res.render('about');
})

//using routes
//middleware anything that goes to /notes will go to notes object
app.use('/notes',notes);
app.use('/users',users);


const port =process.env.PORT  || 3000 ;
app.listen(port,()=>{
    console.log(`Server Started on ${port}`);
})