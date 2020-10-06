import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user-entitie";

@ObjectType({ description: "COMMENT model" })
export class Comment {
    @Field(() => ID)
    id: string;

    @Field(_type => String)
    @Property({ required: true, type: String })
    content: string;

    @Field(_type => String)
    @Property({ ref: User, required: true })
    authorId: Ref<User>;
}

export const CommentModel = getModelForClass(Comment);
