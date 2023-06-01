import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js"; // Import the User model

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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    });
    Note.belongsTo(User, { foreignKey: 'userId' });

export default Note

