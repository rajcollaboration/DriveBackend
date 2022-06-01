const {Sequelize,DataTypes} = require('sequelize');
const users = require('./users');
const sequelize = new Sequelize('googledrive','root',"",{
    host:'localhost',
    dialect:'mysql',
    pool:{max:10,min:0,idle:10000}
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  const db = {};
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;


  db.users = require('./users')(sequelize,DataTypes);
  db.uploadfiles = require('./uploadfile')(sequelize,DataTypes);
 
  db.users.hasMany(db.uploadfiles,{foreignKey:"user_id",as:"filedetails"});
  db.uploadfiles.belongsTo(db.users,{foreignKey:"user_id",as:"users"});

  db.users.hasOne(db.uploadfiles,{foreignKey:"user_id",as:"singlefile"});
  db.uploadfiles.belongsTo(db.users,{foreignKey:"user_id",as:"user"});

  db.sequelize.sync().then(()=>{
    console.log("table created");
});
  module.exports = db;

 

