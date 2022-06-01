

module.exports = (sequelize,DataTypes) =>{
    const user = sequelize.define('users', {
        // attributes
        firstName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        lastName: {
          type: DataTypes.STRING
          
        },
        userNmae:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        phNo:{
            type:DataTypes.STRING,
            allowNull:false
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
      }, {
        // options
      });
      return user;
}
 


