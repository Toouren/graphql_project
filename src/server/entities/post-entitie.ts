import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass, Ref } from "@typegoose/typegoose";

import { User } from "./user-entitie";
import { Comment } from "./comment-entitie";

@ObjectType({ description: "POST model" })
export class Post {
    @Field(() => ID)
    id: string;

    @Field(_type => String)
    @Property({ required: true, type: String })
    content: string;

    @Field(_type => String)
    @Property({ ref: User, required: true })
	authorId: Ref<User>;
	
	@Field(_type => [String])
    @Property({ ref: Comment, default: [] })
    commentsId?: [Ref<Comment>];
}

export const PostModel = getModelForClass(Post);
