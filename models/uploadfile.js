

module.exports = (sequelize,DataTypes)=>{
    const files = sequelize.define('fileDetails',{
        fileNmae:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fileSize:{
            type:DataTypes.DOUBLE,
            allowNull:false
        },
        user_id:{
            type:DataTypes.STRING,
            allowNull:false
        },
        fileType:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
    return files;
}