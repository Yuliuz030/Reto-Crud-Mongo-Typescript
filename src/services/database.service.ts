import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import { InterfaceComment } from "../models/comments";

export const collection: { comments?: mongoDB.Collection<InterfaceComment> } = {};

export async function connectToDatabase() {
    dotenv.config();

    const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

    await client.connect();

    const db = client.db(process.env.DB_NAME);
    
    await applySchemaValidation(db);

    const commentsCollection = db.collection<InterfaceComment>(process.env.COMMENTS_COLLECTION_NAME);

    collection.comments = commentsCollection;

    console.log(
        `Successfully connected to database: ${db.databaseName} and collection: ${commentsCollection.collectionName}`,
    );
}

async function applySchemaValidation(db: mongoDB.Db) {
    const jsonSchema = {
        $jsonSchema: {
            bsonType: "object",
            required: ["postId", "name", "email", "body"],
            additionalProperties: false,
            properties: {
                _id: {},
                postId: {
                    bsonType: "number",
                    description: "'postId' is required and is a number",
                },
                name: {
                    bsonType: "string",
                    description: "'name' is required and is a string",
                },
                email: {
                    bsonType: "string",
                    description: "'email' is required and is a string",
                },
                body: {
                    bsonType: "string",
                    description: "'body' is required and is a string",
                },
            },
        },
    };

    await db.command({
        collMod: process.env.COMMENTS_COLLECTION_NAME,
        validator: jsonSchema
    }).catch(async (error: mongoDB.MongoServerError) => {
        if (error.codeName === 'NamespaceNotFound') {
            await db.createCollection(process.env.COMMENTS_COLLECTION_NAME, { validator: jsonSchema });
        }
    });
}