// import dependancy module
var express=require('express');
var session=require('express-session');
var parseurl=require('parseurl');
var  path=require('path');
var bodyParser=require('body-parser');

const app=express();
//configure Http pipeline

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Session Memory Configuration
var sessionOptions={
    secret:'secret',
    resave:true,
    saveUninitialized:true
};
app.use(session(sessionOptions));

//Configure Interceptor for Session Management
app.use(function(req,res,next){
    if(!req.session.views){
        req.session.views={};
    }
    var pathname=parseurl(req).pathname;
    req.session.views[pathname]=(req.session.views[pathname]||0)+1;
    next();
});

var staticFolder=express.static(path.join(__dirname,'public'));
app.use(staticFolder);

app.get("/", (req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.listen(8000);
console.log("Server is running on port 8000");


