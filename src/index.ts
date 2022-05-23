import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database.service";
import { commentRouter } from "./routes/comments.route";
import { authRouter } from "./routes/auth.router";
import path from "path";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Reto CRUD MONGO, EXPRESS, DOCKER, SWAGGER, JOI Y FIREBASE ADMIN',
            version: '1.0.0'
        },
        servers: [
            {
                url:'http://localhost:3060',
            }
        ],
    },
    apis: ['./dist/docs/*.js']
}

const app = express();
dotenv.config();

app.set("port", process.env.PORT);

const swaggerDocs= swaggerJSDoc(swaggerOptions)

connectToDatabase()
    .then(() => {
        app.use(morgan("dev"));
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
        app.use("/comments", commentRouter);
        app.use("/auth", authRouter);
        app.listen(app.get("port"), () => {
            console.log(`Server started at http://localhost:${app.get("port")}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });