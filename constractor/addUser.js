
const db = require('../models/index');
var jwt = require('jsonwebtoken');
const Users = db.users;
let addUser = async(req,res)=>{
    let isexist;
    await Users.findAll({
        where:{
            userNmae:req.body.userNmae
        }
    }).then(users => {
        isexist = users;
      });
    if (isexist.length < 1) {
        // creating token
        const token =await jwt.sign({
            data: 'foobar'
          }, 'secret', { expiresIn: '1' });
        
        await Users.create({firstName:req.body.firstName,lastName:req.body.lastName,userNmae:req.body.userNmae,email:req.body.email,phNo:req.body.phNo,password:req.body.password});
        res.status(201).send({msg:"user created",token:token});
    }else{
        res.status(404).send({msg:"user Already exist"});
    }
}

let login = async (req,res)=>{
    let userExist ;
     await Users.findAll({
        where:{
           userNmae:req.body.userNmae,
            password:req.body.password
        }
    }).then(user=>{
        userExist = user;
        console.log(user);
    });
    const token =await jwt.sign({
        data: 'foobar'
      }, 'secret', { expiresIn: '1' });
    if (userExist.length == 1) {
        res.status(201).send({msg:"logedin successfully",token:token})
    }else{
        res.status(404).send({msg:"please enter a valid details"});
    }
}

module.exports = {
    addUser,
    login
}
