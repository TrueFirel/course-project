console.log("HELLO WORLD");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoClient = require("mongodb")
const mongoUrl = "mongodb://localhost:27017/users";


let jsonParser = bodyParser.json();

const app = express();
app.use(morgan('combine'));
app.use(bodyParser.json());
app.use(cors());

app.post('/register', jsonParser, (req, res) => {

    if(!req.body) return res.status(400).send;


    let login = req.body.login;
    let email = req.body.email;
    let password = req.body.password;


    mongoClient.connect(mongoUrl, (err, db) => {

        if(err) res.status(400).send({error:"Ошибка запроса"});

        new Promise((resolve, reject)=>{db.collection("Accounts").find({login: login}).toArray((err, result) => {

            db.close();
            if (err) reject({error: "Ошибка запроса"})
            else if (result.length !== 0) reject({login_error: "Пользователь с таким логином уже существует"})
            else resolve();

        })}).then((resolve)=>{

            new Promise((resolve, reject)=>{
                mongoClient.connect(mongoUrl, (err, db)=> {
                    db.collection("Accounts").find({email: email}).toArray((err, result) => {
                        if (err) {
                            reject({error: "Ошибка запроса"});
                        }
                        else if (result.length !== 0) reject({email_error: "Пользователь с таким email уже существует"})
                        else resolve();
                    })
                })

                db.close();

            }).then((resolve)=>{

                mongoClient.connect(mongoUrl, (err, db)=>{
                    db.collection("Accounts").insertOne({login: login, password: password, email: email, permission: "u"}, (err, status)=>{
                        if(err) res.status(400).send(err);
                        else res.status(200).send({login: login, permission:'u'});
                    })
                });
                db.close();
            }, (reject)=>{
                res.status(400).send(reject);
            })
        }, (reject)=>{
            res.status(400).send(reject);
        })
    })
})

app.post('/login', jsonParser, (req, res) => {
    if(!req.body) res.status(400).send({msg:'Данные оказались пустыми'})

    let login = req.body.login;
    let password = req.body.password;

    new Promise((resolve, reject)=>{
        mongoClient.connect(mongoUrl, (err, db)=>{
            db.collection("Accounts").findOne({login: login, password: password}, function(err, doc){
                if(err) {
                    reject({error:'Ошибка запроса'})
                }
                if(doc === null) reject({error: "Ошибка авторизации"});
                else resolve(doc);
            })
            db.close();
        })
    }).then((resolve)=>{
        res.status(200).send({login: resolve.login, permission: resolve.permission});
    }, (reject)=>{
        res.status(400).send(reject);
    })

})



app.listen(8081);


