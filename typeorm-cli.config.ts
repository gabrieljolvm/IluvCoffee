import 'dotenv/config';
import { Coffee } from 'src/coffees/entities/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity';
import { CoffeeRefactor1765077116586 } from 'src/migrations/1765077116586-CoffeeRefactor';
import { SchemaSync1765077770335 } from 'src/migrations/1765077770335-SchemaSync';
import { DataSource } from 'typeorm';

/* typeorm-cli.config.ts */
export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1765077116586, SchemaSync1765077770335],
});
