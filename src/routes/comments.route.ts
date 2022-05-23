import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collection } from "../services/database.service";
import validator from "../utilities/validator";
import { decodeToken } from "../firebase/manage.token";
import { createValidator } from "express-joi-validation";

//Schema Joi
import commentSchema from "../schemas-joi/comment.schema.joi";

export const commentRouter = express.Router();

//Middleare
commentRouter.use(express.json());

commentRouter.get("/",decodeToken, async (_req: Request, res: Response) => {
    try {
        const comments = await collection.comments.find({}).toArray();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

commentRouter.get("/:id", async (req: Request, res: Response) => { 
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const comment = await collection.comments.findOne(query);

        if (comment) {
            res.status(200).json(comment);
        }else{
            res.status(500).json({ message: "Comment not found"});
        }
    } catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
});

commentRouter.post("/", validator.body(commentSchema), async (req: Request, res: Response) => {
    try {
        const newComment = req.body;
        const result = await collection.comments.insertOne(newComment);

        result
            ? res.status(201).json(`Successfully created a new Comment with id ${result.insertedId}`)
            : res.status(500).json({ message: "Failed to create a new Comment." });
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});

commentRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id;
        const updatedComment = req.body;
        const query = { _id: new ObjectId(id) };
        const result = await collection.comments.updateOne(query, { $set: updatedComment });

        result
            ? res.status(200).json(`Successfully updated comment with id ${id}`)
            : res.status(304).json({ message: `comment with id: ${id} not updated` });
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

commentRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new ObjectId(id) };
        const result = await collection.comments.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed comment with id ${id}`);
        } else if (!result) {
            res.status(400).json({ message: `Failed to remove comment with id ${id}` });
        } else if (!result.deletedCount) {
            res.status(404).json({ message: `Comment with id ${id} does not exist` });
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});
