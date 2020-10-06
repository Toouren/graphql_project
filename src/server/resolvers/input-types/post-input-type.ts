import { InputType, Field, ID } from "type-graphql";
import { Post } from "../../entities/post-entitie";
import { ObjectId } from "mongodb";

@InputType()
export class PostInput implements Partial<Post> {
    @Field()
    content: string;

    @Field(() => ID)
    authorId: ObjectId;
}
