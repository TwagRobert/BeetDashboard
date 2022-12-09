var express = require('express');
var router = express.Router();



var users = [
  {
  
    email: "it@beet.se",
    password: "12345678"
  }
]


/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.send(users)
});

router.post('/login', function(req,res){
  
  let result = users.find((user)=>user.email == req.body.email);
  if (result){
    if(result.password == req.body.password){
      res.status(200).send({
        message: "successful login"
      })

    }
    else if(result.password != req.body.password){
      res.status(200).send({
        message: "password incorrect"
      })
    }
    else{
      res.status(200).send({
        message: "user not found"
      })
    }
  }


//when u send a request and get it remEMber to use this. (post)
app.use(express.json());
  
})

module.exports = router;
