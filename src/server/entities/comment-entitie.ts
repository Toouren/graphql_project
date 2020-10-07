import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";
import { User } from "./user-entitie";
import { Post } from "./post-entitie";

@ObjectType({ description: "COMMENT model" })
export class Comment {
    @Field(() => ID)
    id: string;

    @Field(_type => String)
    @Property({ required: true, type: String })
    content: string;

    @Field(_type => User)
    @Property({ required: true, type: User })
	author: User;
	
	@Field(_type => Post)
    @Property({ type: Post })
	post: Post;
}

export const CommentModel = getModelForClass(Comment);
