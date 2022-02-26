const {Client} = require('pg');
const express = require("express");
const bodyParser = require("body-parser");
const { create, evaluateDependencies } = require('mathjs');
const client= new Client({
  host:"localhost",
  port:5432,
  user:"postgres",
  password:"Gudi@12345",
  database:"dbcalculator"
}

)

client.connect();
const app = express()
// custom implementations of all functions you want to support

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const mod = (a, b) => a % b;
 
const math = create(evaluateDependencies)
// import your own functions
math.import({ add, subtract, multiply, divide, mod }, { override: true })

app.use(bodyParser.urlencoded({extended: true}));

/*app.get("/" , (req , res)=>{
  res.sendFile(__dirname+"/index.html")
})*/
app.set("view engine","ejs");
app.get("/" , (req , res)=>{
  res.render("index");
});
app.get('',(req,res)=>{
  res.sendFile(__dirname + "/index.html")
})
app.get("/users/fetch" , (req , res)=>{
client.query('select * from calculator',(err,result)=>{
    if(!err){
      res.render("fetch",{'item':result.rows});
    }else{
        console.log(err.message);
    }//client.end;
}

)
});
//client.connect();
client.query('select * from calculator',(err,res)=>{
    if(!err){
console.log(res.rows);
    }else{
        console.log(err.message);
    }client.end;
}

)
app.post("/",(req, res) =>{
var num = req.body.num1;
var result=math.evaluate(num).toString();
res.send(result);
 client.query("insert into calculator(num1,result,time) values('" + num + "', '" + result + "',current_timestamp)");
(err,result) =>{
   if(!err){
    console.log(">Inserted!");
   }
else{
  console.log(err);
}
}
})
app.listen(4007, (res) =>{
    console.log('Server is on port 4007')
})