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
    let permission = req.body.permission;


    mongoClient.connect(mongoUrl, (err, db) => {

        if(err) res.status(400).send({error:"Ошибка запроса"});

        new Promise((resolve, reject)=>{db.collection("Accounts").find({login: login}).toArray((err, result) => {

            db.close();
            if (err) reject({error: "Ошибка запроса"})
            else if (result.length !== 0) reject({login_error: "Пользователь с таким логином уже существует"})
            else resolve(result);

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
                    console.log(permission);
                    db.collection("Accounts").insertOne({login: login, password: password, email: email, permission: permission}, (err, status)=>{
                        if(err) res.status(400).send(err);
                        else {
                            db.collection("Accounts").find().toArray((err,result)=>{
                                if(err) res.status(400).send({error:"Ошибка выборки"});
                                res.status(200).send({login: login, permission:'u', u_arr: result});
                            })
                        }
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
});

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
        res.status(200).send({login: resolve.login, permission: resolve.permission, password: resolve.password});
    }, (reject)=>{
        res.status(400).send(reject);
    })

});

app.delete('/deleteAcc', jsonParser, (req, res) => {

    new Promise((resolve, reject)=>{
        if(!req.body) resolve({error:"Ошибка запроса"});

        let login = req.body.login;
        let password = req.body.password;

        mongoClient.connect(mongoUrl, (err, db)=>{
            if(err) reject({error:"Ошибка запроса"});

            db.collection("Accounts").findOneAndDelete({login: login, password: password}, (err, result)=>{

                console.log(result);
                if(result.value === null) reject({error: "Такого аккаунта не существует"});
                else resolve({result:"Пользователь успешно удалён"});
            })
            db.close();
        })
    }).then((resolve)=>{
        res.status(200).send(resolve);
    },(reject)=>{
        res.status(400).send(reject);
    })


});

app.post('/getUserArray', jsonParser, (req, res) => {

    if(!req.body) res.status(400).send({msg:'Данные оказались пустыми'});


        let login = req.body.login;
        let password = req.body.password;
        let permission = req.body.permission;

        new Promise((resolve, reject)=>{
          mongoClient.connect(mongoUrl, (err, db)=>{
              if(err) reject({error:"Ошибка запроса"});
              else new Promise((resolve, reject)=>{
                  db.collection("Accounts").findOne({login:login, password: password, permission: permission}, (err, doc) => {
                      if(err) reject({error:"Ошибка запроса"});
                      else if(doc === null) reject({error:"Ошибка доступа"})
                      else resolve();
                  })
                  db.close();
              }).then((resolve) => {
                  new Promise((resolve, reject)=>{
                      mongoClient.connect(mongoUrl, (err, db)=>{
                          if(err) reject({error:"Ошибка запроса"});
                          else db.collection("Accounts").find({permission: 'u'}).toArray((err, result)=>{
                              if(err) reject({error:"Ошибка запроса"});
                              else resolve(result);
                          })
                        db.close();
                      })
                  }).then((resolve)=>{
                      res.status(200).send(resolve);
                  },(reject)=>{
                      res.status(400).send(reject);
                  })
              }, (reject) => {
                  res.status(400).send(reject);
              })
          })
        }).then(((resolve)=>{
            res.status(200).send(resolve);
        }, (reject)=>{
            res.status(400).send(reject);

        }))
});

app.post('/update', jsonParser, (req, res)=>{
    if(!req.body) res.status(400).send({msg:'Данные оказались пустыми'});

    else{
        let whichUpdate = req.body.whichAccount;
        let toUpdate = req.body.onAccount;


        new Promise((resolve, reject)=>{

            mongoClient.connect(mongoUrl, (err, db)=>{

                if(err) reject({error: "Ошибка доступа к базе данных"})

                else {

                    new Promise((resolve, reject)=>{


                        db.collection("Accounts").findOne({login: toUpdate.login}, (err, doc)=>{
                            if(err) reject({error: "Ошибка выборки"});
                            else if(doc !== null) reject({loginError: "Такой пользователь уже существует"});
                            else resolve();
                        });

                    }).then((resolve)=>{

                        new Promise((resolve, reject)=>{
                            db.collection("Accounts").findOneAndUpdate({login:whichUpdate.login, password: whichUpdate.password, permission:whichUpdate.permission, email: whichUpdate.email}, {$set:{login:toUpdate.login, password: toUpdate.password, permission:toUpdate.permission, email: toUpdate.email}}, (err, result)=>{
                                console.log(result)
                                if(err) reject({error: "Ошибка обновления данных"})
                                else {
                                    db.close();
                                    resolve()
                                }

                            });
                        }).then((resolve)=>{

                            new Promise((resolve, reject)=>{

                                mongoClient.connect(mongoUrl, (err, db)=>{
                                    if(err) reject({error:"Ошибка запроса"});
                                    else db.collection("Accounts").find({permission: 'u'}).toArray((err, result)=>{
                                        if(err) reject({error:"Ошибка запроса"});
                                        else resolve(result);
                                    });
                                    db.close();
                                })
                            }).then((resolve)=>{
                                res.status(200).send(resolve);
                            },(reject)=>{
                                res.status(400).send(reject);
                            })
                        }, (reject)=>{
                            res.status(400).send(reject);
                        })
                    },(reject)=>{
                        res.status(400).send(reject);
                    });
                }
            });
        }).catch((reject)=>{
            res.status(400).send(reject);
        })




    }


})

app.listen(8081);


