const express = require('express');
const mongoose=require("mongoose");
const Article = require("./models/Article")

const app = express();
mongoose.connect("mongodb+srv://ammarwabs:maro123123@firstcluster.cnx7s.mongodb.net/?retryWrites=true&w=majority&appName=firstCluster")
.then(()=>{console.log("conect sucess")})
.catch((error)=>{console.log("there is error",error)})


app.use(express.json());

app.listen(7000, () => {
    console.log("I am listening to this port");
});

app.get('/hello', (req, res) => {
    res.send("I am listening to this port");
});

app.get('/test', (req, res) => {
    res.send("I am listening to this port");
});

app.get('/nums/:number1/:number2', (req, res) => {
    const num1 = Number(req.params.number1);
    const num2 = Number(req.params.number2);
    const total = num1 + num2;
    res.send(`The sum of ${num1} and ${num2} is ${total}`);
});

app.post('/hell', (req, res) => {
    console.log(req.body);
    res.send(`Hello ${req.body.name} my age ${req.query}`);
});

app.get('/number', (req, res) => {
    let numbers = [];
    for (let i = 0; i <= 50; i++) {
        numbers.push(i);
    }
    // res.send(`I am listening to ${numbers.join(' - ')} this port`);
    res.render("first.ejs",{
        name:"Ammar",
        numbers:numbers,
    });
});
app.post("/articles",async(req,res)=>{
const newArticle= new Article();
const artTitle= req.body.articleTitle;
const artBody= req.body.articleBody;

newArticle.title=artTitle;
newArticle.body=artBody;
newArticle.numberLike=0;
await newArticle.save();
res.json(newArticle)
});

app.get("/articles",async(req,res)=>{
    const article = await Article.find();
    console.log("the article is",article)
    res.json(article);
});
app.delete("/articles/:articleID",async(req,res)=>{
    const id =req.params.articleID;
try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
    
} catch (error) {
    console.log("there is error",id);
    return res.send("error");
}
});

app.get("/showArticles",async(req,res)=>{
    const article =await Article.find();
    res.render("show.ejs",{
        articleShow:article
    })
})
