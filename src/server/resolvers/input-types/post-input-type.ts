import { ObjectId } from "mongodb";
import { Field, ID, InputType } from "type-graphql";

import { Post } from "../../entities/post-entitie";

@InputType()
export class PostInput implements Partial<Post> {
    @Field()
	content: string;
	
	@Field()
    title: string;
}
