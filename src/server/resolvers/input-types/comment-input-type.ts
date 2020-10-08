import { ObjectId } from "mongodb";
import { Field, ID, InputType } from "type-graphql";

import { Comment } from "../../entities/comment-entitie";

@InputType()
export class CommentInput implements Partial<Comment> {
    @Field()
    content: string;

    @Field(() => ID)
    postId: ObjectId;
}
