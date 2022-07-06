import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './Match';

class Team extends Model {
  id!: number;
  teamName!: string;  
}

Team.init({
  id: {
    type: DataTypes.NUMBER,    
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  teamName: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {  
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  timestamps: false,
});

// Team.belongsTo(Match, { foreignKey: 'awayTeam', as: 'match_away'});
// Team.belongsTo(Match, { foreignKey: 'homeTeam', as: 'match_home'});

export default Team;
