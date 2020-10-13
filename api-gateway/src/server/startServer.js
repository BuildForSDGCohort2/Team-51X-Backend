import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import resolvers from "#root/graphql/resolvers";
import typeDefs from "#root/graphql/schemas";
import accessEnv from "#root/helpers/accessEnv";

import formatGraphQLErrors from "./formatGraphQLErrors"; 

const PORT = accessEnv("PORT", 7001);

const apolloServer = new ApolloServer({
    context: a => a,
    formatError: formatGraphQLErrors,
    resolvers,
    typeDefs
});

const app = express();
app.use(cookieParser());
app.use(
    cors({
        origin: (origin, cb) => cb(null, true),
        credentials: true
    })
);

apolloServer.applyMiddleware({ app, cors: false, path: "/api" });

app.listen(PORT, "0.0.0.0", () => {
    console.log(`API gateway listen on ${PORT}`);
});