const express=require('express');
const hbs=require('hbs');
const fs=require('fs');



var app=express();

hbs.registerPartials(__dirname+'/views/partials')

app.set('View engine','hbs');



app.use((req,res,next)=>{

var now= new Date().toString();
log=`${now}: ${req.method} ${req.url}`;
console.log(log);
fs.appendFile('server-log',log+'\n');
next();
});

// app.use((req,res)=>{
//   res.render('maintenance.hbs');
//
// });
app.use(express.static(__dirname+'/public'));
hbs.registerHelper('getCurrentYear',()=>{
  return  new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();
});
app.get('/',(req,res)=>{
  //res.send('<h1>Hello Express!</h1>');
res.render('home.hbs',{

  PageTitle:'Home Page',
  WelcomeToPage:'Welcome to my frist web page'


});

});

app.get('/about',(req,res)=>{
  //res.send('<h1>Hello Express!</h1>');
 res.render('about.hbs',{
   PageTitle:'About Page'

 });

});


app.get('/bad',(req,res)=>{
  res.send({
    errorMessage:'Unable to Handle to request'
  });
});

app.listen(3000,()=>{

console.log('Server is up on port 3000');

});
