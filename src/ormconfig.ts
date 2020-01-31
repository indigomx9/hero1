import { ConnectionOptions } from "typeorm";

export const config: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    synchronize: true,
    logging: false,
    // ssl: true,
    entities: [__dirname + "/models/**/{*.ts, *.js}"],
    migrations: ["src/migrations/*.ts"],
    cli: { migrationsDir: "src/migrations" },
};


