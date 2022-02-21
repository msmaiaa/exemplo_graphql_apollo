import "reflect-metadata";
import cors from "cors";
import express from "express";
import morgan from "morgan";

//prisma >
import { createConnection } from "typeorm";

import { AppContext } from "./types";
import { ApolloServer, gql } from "apollo-server-express";
import { CONST } from "./constants";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { ProductResolver } from "./resolvers/ProductResolver";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

const start = async () => {
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, ProductResolver],
    }),
    context: ({ req, res }: AppContext) => ({ req, res }),
  });

  apolloServer
    .start()
    .then(() => apolloServer.applyMiddleware({ app, cors: false }));

  app.listen(CONST.PORT, () =>
    console.log(`Servidor rodando: http://localhost:${CONST.PORT}/graphql`)
  );

  createConnection()
    .then(() => console.log("db rodando"))
    .catch((e) => console.error("erro ao conectar ao postgres:", e));
};

start();
