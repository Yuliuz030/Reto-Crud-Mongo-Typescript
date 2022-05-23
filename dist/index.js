"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_service_1 = require("./services/database.service");
const comments_route_1 = require("./routes/comments.route");
const auth_router_1 = require("./routes/auth.router");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Reto CRUD MONGO, EXPRESS, DOCKER, SWAGGER, JOI Y FIREBASE ADMIN',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3060',
            }
        ],
    },
    apis: ['./dist/docs/*.js']
};
const app = (0, express_1.default)();
dotenv_1.default.config();
app.set("port", process.env.PORT);
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use((0, morgan_1.default)("dev"));
    app.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
    app.use("/comments", comments_route_1.commentRouter);
    app.use("/auth", auth_router_1.authRouter);
    app.listen(app.get("port"), () => {
        console.log(`Server started at http://localhost:${app.get("port")}`);
    });
})
    .catch((error) => {
    console.error("Database connection failed", error);
    process.exit();
});
//# sourceMappingURL=index.js.map