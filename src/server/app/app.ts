import express from "express";

import { graphqlHTTP } from "express-graphql";
import { connect } from "mongoose";
import { buildSchema } from "type-graphql";

import { authChecker } from "../checkers/auth-checker";

import { CommentResolver } from "../resolvers/comment-resolver";
import { PostResolver } from "../resolvers/post-resolver";
import { UserResolver } from "../resolvers/user-resolver";

const main = async () => {
    /** Создание Express сервера */
    const app = express();

    /** Создание GraphQL схемы */
    const schema = await buildSchema({
        resolvers: [PostResolver, UserResolver, CommentResolver],
        emitSchemaFile: true,
        validate: false,
        authChecker,
    });

    /** Установка порта для сервера */
    app.set("port", 8080);

    /** Мидлвара для обработки GraphQL запросов */
    app.use(
        "/api",
        graphqlHTTP((req) => {
			return {
				schema,
				context: { req }
			}
        })
    );

    /** Установка соединения с сервером БД */
    const mongoose = await connect("mongodb://localhost:27017/test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    mongoose.connection;

    app.listen(app.get("port"), () => {
        console.log(`Сервер запущен на http://localhost:${app.get("port")}}`);
    });
};

main().catch((error) => {
    console.log(error, "error");
});
