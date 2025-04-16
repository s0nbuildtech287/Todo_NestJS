import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Todo } from './entities/todo.entity';
import { User } from './entities/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql', // Sử dụng MySQL
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Todo], // Danh sách các entity
  migrations: ['src/migrations/*.ts'], // Đường dẫn đến các migration
  synchronize: false, // Thay đổi tùy theo nhu cầu
});
