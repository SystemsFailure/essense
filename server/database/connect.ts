import { Sequelize } from 'sequelize';

const sequelize: Sequelize = new Sequelize('essence', 'postgres', '31415', {
  host: 'localhost',
  dialect: 'postgres',
  timezone: '+03:00',
});

export default sequelize;