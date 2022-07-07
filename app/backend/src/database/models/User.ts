import { DataTypes, Model } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  username!: string;
  role!: string;
  email!: string;
  password!: string; 
}

User.init({
  id: {
    type: DataTypes.NUMBER,    
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {  
  underscored: true,
  sequelize: db,
  modelName: 'users',
  freezeTableName: true,
  timestamps: false,
});

export default User;
