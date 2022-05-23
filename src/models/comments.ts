import { ObjectId } from "mongodb";

export interface InterfaceComment {
    postId: number;
    id?: ObjectId;
    name: string;
    email: string;
    body: string;
}