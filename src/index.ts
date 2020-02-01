import "dotenv/config";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PlayerResolver } from "./graphql/PlayerResolver";
import { createConnection } from "typeorm";

(async () => {
    const app: express.Application = express();
    try {
        await createConnection({
            url: process.env.DATABASE_URL,
            type: 'postgres',
            entities: [__dirname + "/models/**/{*.ts, *.js}"],
            synchronize: true,
            extra: { ssl: true, },
        });
    } catch (error) {
        console.log("Error connecting to database.", error);
    }

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            validate: false,
            resolvers: [ PlayerResolver ],
        })
    })
    apolloServer.applyMiddleware({ app });
    
    const port = process.env.PORT || 9000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
        console.log(`Press Ctrl + C to exit.`);
    })
})();


