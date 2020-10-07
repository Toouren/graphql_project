import { ObjectType, Field, ID } from "type-graphql";
import { prop as Property, getModelForClass, Ref, mongoose } from "@typegoose/typegoose";

import { User } from "./user-entitie";

@ObjectType({ description: "POST model" })
export class Post {
    @Field(() => ID)
    id: string;

    @Field(_type => String)
    @Property({ required: true, type: String })
    content: String;

    @Field(_type => User)
    @Property({ required: true })
	author: User;
}

export const PostModel = getModelForClass(Post);
