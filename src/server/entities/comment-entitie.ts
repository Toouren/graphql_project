import { getModelForClass, prop as Property } from "@typegoose/typegoose";
import { Field, ID, ObjectType } from "type-graphql";

import { Post } from "./post-entitie";
import { User } from "./user-entitie";

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
