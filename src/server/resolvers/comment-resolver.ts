import { Post, PostModel } from "../entities/post-entitie";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { Comment, CommentModel } from "../entities/comment-entitie";
import { CommentInput } from "./input-types/comment-input-type";
import { UserModel } from "../entities/user-entitie";

@Resolver(Comment)
export class CommentResolver {
    @Query(() => Post, { nullable: false })
    async comment(@Arg("id") id: string) {
        return await CommentModel.findById(id);
    }

    @Query(() => [Comment])
    async comments() {
        return await CommentModel.find();
    }

    @Mutation(() => Comment)
    async createComment(
        @Arg("data") { authorId, content, postId }: CommentInput
    ): Promise<Comment> {
		const author = await UserModel.findById(authorId);
		const post = await PostModel.findById(postId);
		if (author && post) {
			const comment = await CommentModel.create({
				content,
				author,
				post,
			});
			await comment.save();
	
			return comment;
		} else {
			throw new Error("Author or post not found");
		}
    }

    @Mutation(() => Boolean)
    async deleteComment(@Arg("id") id: string) {
        await CommentModel.deleteOne({ id });

        return true;
    }
}
