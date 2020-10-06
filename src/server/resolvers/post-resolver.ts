import { Post, PostModel } from "../entities/post-entitie";
import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { PostInput } from "./input-types/post-input-type";
import { CommentInput } from "./input-types/comment-input-type";
import { CommentModel } from "../entities/comment-entitie";

@Resolver(Post)
export class PostResolver {
    @Query((_) => Post, { nullable: false })
    async post(@Arg("id") id: string) {
        return await PostModel.findById({ _id: id });
    }

    @Query((returns) => [Post])
    async posts() {
        return await PostModel.find();
	}

    @Mutation(() => Post)
    async createPost(
        @Arg("data") { authorId, content }: PostInput
    ): Promise<Post> {
        const post = (
            await PostModel.create({
                content,
				authorId,
            })
        ).save();

        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg("id") id: string) {
        await PostModel.deleteOne({ id });

        return true;
    }
}
