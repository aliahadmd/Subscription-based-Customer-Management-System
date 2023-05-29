import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Note=sequelize.define('Note',{
    logo:{
        type:DataTypes.STRING
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    kmPerMonth:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    truckType:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})

export default Note

