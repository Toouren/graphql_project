import { InputType, Field, ID } from "type-graphql";
import { Comment } from "../../entities/comment-entitie";
import { ObjectId } from "mongodb";

@InputType()
export class CommentInput implements Partial<Comment> {
    @Field()
    content: string;

    @Field(() => ID)
    authorId: ObjectId;
}
