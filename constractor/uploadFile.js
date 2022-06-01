
const db = require('../models/index');
const fs = require('fs');
const path = require('path');

const users = db.users;
const files  = db.uploadfiles;

const uploaddile = async(req,res)=>{
     req.files.forEach(async file => {
   await files.create({
        fileNmae:file.filename,
        fileSize:file.size,
        user_id:req.params.userid,
        fileType:file.mimetype
    });
    res.end("ok");
   });
}
const allfiles = async(req,res)=>{
   const user = await users.findAll({
       include:[{
           model:files,
           as:"filedetails"
       }
       ],
       where:{
        id:req.params.userid
    },
    
        
    })
    res.send(user);
}
// single file 
const singlePost = async (req,res)=>{
    const singlefile = await files.findOne({
        include:[
            {
                model:users,
                as:"user"
            }
        ],
         where: { id: req.params.id }
        
        });
if (singlefile === null) {
  res.status(404).send({msg:"data not found"});
} else {
  res.status(200).send(singlefile);
}
}
// delete file
const deletefile = async(req,res)=>{
    if (!req.params.filename) {
        res.status(404).send({msg:"file not receved"});
    }else{
        console.log('file received');
        console.log(req.params.filename);
        try {
            fs.unlink('./public/data/uploads/'+req.params.filename,(err)=>{
                if (err) throw err;
                console.log("file deleted");
            })
            await files.destroy({
                where: {
                    fileNmae:req.params.filename,
                }
            })
            return res.status(200).send('Successfully! Image has been Deleted');
          } catch (err) {
            // handle the error
            return res.status(400).send(err);
          }
    }
}
module.exports = {
    uploaddile,
    allfiles,
    singlePost,
    deletefile
}