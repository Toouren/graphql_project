import { Post } from "../entities/post-entitie";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Comment, CommentModel } from "../entities/comment-entitie";
import { CommentInput } from "./input-types/comment-input-type";

@Resolver(Comment)
export class CommentResolver {
    @Query((_) => Post, { nullable: false })
    async comment(@Arg("id") id: string) {
        return await CommentModel.findById({ _id: id });
    }

    @Query((returns) => [Comment])
    async comments() {
        return await CommentModel.find();
    }

    @Mutation(() => Comment)
    async createComment(
        @Arg("data") { authorId, content }: CommentInput
    ): Promise<Comment> {
        const comment = (
            await CommentModel.create({
                content,
				authorId,
            })
        ).save();

        return comment;
    }

    @Mutation(() => Boolean)
    async deleteComment(@Arg("id") id: string) {
        await CommentModel.deleteOne({ id });

        return true;
    }
}
